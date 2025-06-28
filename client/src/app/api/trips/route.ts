import { db } from "@/service/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, tripData } = body;

    if (!userEmail || !tripData) {
      return new Response("Missing required fields", { status: 400 });
    }

    const tripRef = await addDoc(collection(db, "trips"), {
      userEmail,
      tripData,
      createdAt: new Date(),
    });

    return Response.json({ tripId: tripRef.id });
  } catch (error) {
    console.error("Error saving trip:", error);
    return new Response("Error saving trip", { status: 500 });
  }
}
