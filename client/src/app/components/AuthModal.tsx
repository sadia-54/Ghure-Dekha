"use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// type AuthModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       console.log("Logging in with", formData.email, formData.password);
//     } else {
//       console.log("Signing up with", formData);
//     }
//     // close modal after submit
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[400px] bg-white text-green-900">
//         <DialogHeader>
//           <DialogTitle className="font-semibold">{isLogin ? "Login" : "Sign Up"}</DialogTitle>
//           <DialogDescription>
//             {isLogin
//               ? "Enter your credentials to log in."
//               : "Create an account by filling the form."}
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <Label className="my-2" htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 required
//               />
//             </div>
//           )}

//           <div>
//             <Label className="my-2" htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="example@mail.com"
//               required
//             />
//           </div>

//           <div>
//             <Label className="my-2" htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <DialogFooter className="flex flex-col justify-center gap-2">
//             <Button className="w-20 mx-auto rounded-2xl" variant="submitButton" type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
//             <Button
//               type="button"
//               variant="ghost"
//               className="text-sm text-muted-foreground hover:underline"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin
//                 ? "Don't have an account? Sign Up"
//                 : "Already have an account? Login"}
//             </Button>

           
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from '@/components/ui/button'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { data: session } = useSession()

  if (!open) return null // or your modal closed UI

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {session ? (
          <>
            <p>Welcome, {session.user?.name}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        )}
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </div>
    </div>
  )
}
