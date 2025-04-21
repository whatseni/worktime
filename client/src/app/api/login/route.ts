import dbConnect from "@/lib/dbconnect";
import { createSession } from "@/lib/session";
import staff from "@/models/staff";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
   
    const id = requestMap["id"];
    let one = id.splice(0, 3)
    let two = id.splice(3, 7);
    let three = id.splie(7);
    let str = `${one}-${two}-${three}`;
    const pw = requestMap["password"];
    const find = await staff.findOne({phone: str, password: pw}, {
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