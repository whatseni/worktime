import dbConnect from "@/src/lib/dbconnect";
import { deleteSession } from "@/src/lib/session";
import staff from "@/src/models/staff";

export async function GET(req: Request) {
  try {
    deleteSession()
    return Response.json({ data: "hi" })
  } catch (error) {
    return Response.json({ code: "error" })
  }
}