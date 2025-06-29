import { db } from "@/service/firebaseconfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "trips"), {
      ...body,
      createdAt: new Date(),
    });

    // Optional: update the same document with the tripId field
    await updateDoc(doc(db, "trips", docRef.id), {
      tripId: docRef.id,
    });

    return NextResponse.json({ message: "Trip saved", tripId: docRef.id });
  } catch (err) {
    console.error("Error saving trip:", err);
    return NextResponse.json({ error: "Failed to save trip" }, { status: 500 });
  }
}
