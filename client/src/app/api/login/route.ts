import dbConnect from "@/src/lib/dbconnect";
import { createSession } from "@/src/lib/session";
import staff from "@/src/models/staff";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const pw = requestMap["password"];
    console.log(id, pw)
  
    const findAdmin = await staff.findOne({phone: id, birth: pw})

    if (findAdmin) {
      await createSession(id)
      return Response.json({ data: findAdmin })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ code: "error" })
  }
}