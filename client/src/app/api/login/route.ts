import dbConnect from "@/src/lib/dbconnect";
import { createSession } from "@/src/lib/session";
import staff from "@/src/models/staff";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const pw = requestMap["password"];
  
    const find = await staff.findOne({phone: id, birth: pw}, {
      _id: true,
      company: true,
    })

    if (find) {
      await createSession(id)
      return Response.json({ code: 200, data: find })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ code: 500, data: "error" })
  }
}