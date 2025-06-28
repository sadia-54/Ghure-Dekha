// auth.js
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  collection, 
  where, 
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { app } from "./firebaseconfig";

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Input validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateName = (name) => {
  return name && name.trim().length >= 4 && name.trim().length <= 20;
};

// Check if username is available
const isUsernameAvailable = async (username) => {
  try {
    const usernameQuery = query(
      collection(db, "users"), 
      where("username", "==", username.toLowerCase())
    );
    const querySnapshot = await getDocs(usernameQuery);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username availability:", error);
    throw error;
  }
};

// Check if email is available
const isEmailAvailable = async (email) => {
  try {
    const emailQuery = query(
      collection(db, "users"), 
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(emailQuery);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email availability:", error);
    throw error;
  }
};

// Get user by username
const getUserByUsername = async (username) => {
  try {
    const usernameQuery = query(
      collection(db, "users"), 
      where("username", "==", username.toLowerCase())
    );
    const querySnapshot = await getDocs(usernameQuery);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error getting user by username:", error);
    throw error;
  }
};

// Custom error messages for better UX
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please use a different email.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this username. Please check your username or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled. Please contact support.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your username and password.';
    case 'auth/user-token-expired':
      return 'Your session has expired. Please sign in again.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to perform this action.';
    case 'auth/username-already-exists':
      return 'This username is already taken. Please choose a different username.';
    case 'auth/email-already-exists':
      return 'This email is already registered. Please use a different email.';
    case 'auth/invalid-username':
      return 'Username must be 2-50 characters long and contain only letters, numbers, and underscores.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Sign up function with name, email, password (both name and email must be unique)
export const signUp = async (username, email, password) => {
  try {
    // Input validation
    if (!username || !email || !password) {
      return { 
        success: false, 
        error: 'Username, email and password are required.',
        code: 'auth/missing-credentials'
      };
    }

    if (!validateName(username)) {
      return { 
        success: false, 
        error: 'Username must be 4-20 characters long.',
        code: 'auth/invalid-username'
      };
    }

    if (!validateEmail(email)) {
      return { 
        success: false, 
        error: 'Please enter a valid email address.',
        code: 'auth/invalid-email'
      };
    }

    if (!validatePassword(password)) {
      return { 
        success: false, 
        error: 'Password must be at least 6 characters long.',
        code: 'auth/weak-password'
      };
    }

    // Check if user is already signed in
    if (auth.currentUser) {
      return { 
        success: false, 
        error: 'A user is already signed in. Please sign out first.',
        code: 'auth/user-already-signed-in'
      };
    }

    // Check username availability
    const usernameAvailable = await isUsernameAvailable(username.trim());
    if (!usernameAvailable) {
      return { 
        success: false, 
        error: 'This username is already taken. Please choose a different username.',
        code: 'auth/username-already-exists'
      };
    }

    // Check email availability
    const emailAvailable = await isEmailAvailable(email.trim());
    if (!emailAvailable) {
      return { 
        success: false, 
        error: 'This email is already registered. Please use a different email.',
        code: 'auth/email-already-exists'
      };
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: username.trim() });

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      displayName: username.trim(),
      emailVerified: user.emailVerified,
      createdAt: new Date().toISOString()
    });

    // Send email verification
    try {
      await sendEmailVerification(user);
    } catch (verificationError) {
      console.warn("Failed to send email verification:", verificationError.message);
    }

    console.log("User signed up successfully:", user.uid);
    return { 
      success: true, 
      user: {
        uid: user.uid,
        username: username.trim(),
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      }
    };

  } catch (error) {
    console.error("Sign up error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Sign in function with username and password
export const signIn = async (username, password) => {
  try {
    // Input validation
    if (!username || !password) {
      return { 
        success: false, 
        error: 'Username and password are required.',
        code: 'auth/missing-credentials'
      };
    }

    if (!validateName(username)) {
      return { 
        success: false, 
        error: 'Please enter a valid username.',
        code: 'auth/invalid-username'
      };
    }

    // Check if user is already signed in
    if (auth.currentUser) {
      return { 
        success: false, 
        error: 'A user is already signed in. Please sign out first.',
        code: 'auth/user-already-signed-in',
        user: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
          emailVerified: auth.currentUser.emailVerified
        }
      };
    }

    // Get user data by username
    const userData = await getUserByUsername(username.trim());
    if (!userData) {
      return { 
        success: false, 
        error: 'No account found with this username. Please check your username or sign up.',
        code: 'auth/user-not-found'
      };
    }

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
    const user = userCredential.user;

    console.log("User signed in successfully:", user.uid);
    return { 
      success: true, 
      user: {
        uid: user.uid,
        username: userData.username,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      }
    };

  } catch (error) {
    console.error("Sign in error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Sign out function with error handling
export const signOutUser = async () => {
  try {
    // Check if user is signed in
    if (!auth.currentUser) {
      return { 
        success: false, 
        error: 'No user is currently signed in.',
        code: 'auth/no-current-user'
      };
    }

    await signOut(auth);
    console.log("User signed out successfully");
    return { success: true };

  } catch (error) {
    console.error("Sign out error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Password reset function (using username to get email)
export const resetPassword = async (username) => {
  try {
    if (!username) {
      return { 
        success: false, 
        error: 'Username is required.',
        code: 'auth/missing-username'
      };
    }

    if (!validateName(username)) {
      return { 
        success: false, 
        error: 'Please enter a valid username.',
        code: 'auth/invalid-username'
      };
    }

    // Get user data by username
    const userData = await getUserByUsername(username.trim());
    if (!userData) {
      return { 
        success: false, 
        error: 'No account found with this username.',
        code: 'auth/user-not-found'
      };
    }

    await sendPasswordResetEmail(auth, userData.email);
    console.log("Password reset email sent");
    return { 
      success: true, 
      message: 'Password reset email sent. Please check your inbox.'
    };

  } catch (error) {
    console.error("Password reset error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Resend email verification
export const resendEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { 
        success: false, 
        error: 'No user is currently signed in.',
        code: 'auth/no-current-user'
      };
    }

    if (user.emailVerified) {
      return { 
        success: false, 
        error: 'Email is already verified.',
        code: 'auth/email-already-verified'
      };
    }

    await sendEmailVerification(user);
    console.log("Email verification sent");
    return { 
      success: true, 
      message: 'Verification email sent. Please check your inbox.'
    };

  } catch (error) {
    console.error("Email verification error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Delete user account
export const deleteUserAccount = async (password) => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return { 
        success: false, 
        error: 'No user is currently signed in.',
        code: 'auth/no-current-user'
      };
    }

    if (!password) {
      return { 
        success: false, 
        error: 'Password is required to delete account.',
        code: 'auth/missing-password'
      };
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      return { 
        success: false, 
        error: 'User data not found.',
        code: 'auth/user-data-not-found'
      };
    }

    const userData = userDoc.data();

    // Re-authenticate user before deletion
    const credential = EmailAuthProvider.credential(userData.email, password);
    await reauthenticateWithCredential(user, credential);
    
    // Delete user document from Firestore
    await deleteDoc(doc(db, "users", user.uid));
    
    // Delete user from Authentication
    await deleteUser(user);
    
    console.log("User account deleted");
    return { 
      success: true, 
      message: 'Account deleted successfully.'
    };

  } catch (error) {
    console.error("Delete account error:", error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Monitor auth state changes with error handling
export const onAuthStateChange = (callback) => {
  if (typeof callback !== 'function') {
    console.error('onAuthStateChange: callback must be a function');
    return () => {}; // Return empty unsubscribe function
  }

  try {
    return onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            callback({
              ...user,
              username: userData.username,
              displayName: userData.displayName
            });
          } else {
            callback(user);
          }
        } else {
          callback(null);
        }
      } catch (error) {
        console.error('Auth state change callback error:', error);
        callback(user); // Fallback to basic user object
      }
    });
  } catch (error) {
    console.error('Failed to set up auth state listener:', error);
    return () => {}; // Return empty unsubscribe function
  }
};

// Get current user with error handling
export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: user.uid,
          username: userData.username,
          email: user.email,
          displayName: userData.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous
        };
      } else {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  try {
    return !!auth.currentUser;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

// Refresh current user data
export const refreshUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { 
        success: false, 
        error: 'No user is currently signed in.',
        code: 'auth/no-current-user'
      };
    }

    await user.reload();
    const currentUser = await getCurrentUser();
    return { 
      success: true, 
      user: currentUser
    };

  } catch (error) {
    console.error('Refresh user error:', error.code, error.message);
    return { 
      success: false, 
      error: getErrorMessage(error.code),
      code: error.code
    };
  }
};

// Check username availability (public function)
export const checkUsernameAvailability = async (username) => {
  try {
    if (!validateName(username)) {
      return { 
        success: false, 
        error: 'Username must be 2-50 characters long.',
        code: 'auth/invalid-username'
      };
    }

    const available = await isUsernameAvailable(username.trim());
    return { 
      success: true, 
      available: available
    };
  } catch (error) {
    console.error('Error checking username availability:', error);
    return { 
      success: false, 
      error: 'Failed to check username availability.',
      code: 'auth/username-check-failed'
    };
  }
};