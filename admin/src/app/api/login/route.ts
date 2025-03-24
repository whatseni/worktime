import dbConnect from "@/src/_lib/dbconnect";
import Admin from "@/src/_models/admin";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const pw = requestMap["password"];
  
    const findAdmin = await Admin.findOne({id: id, password: pw})

    if (findAdmin)
      return Response.json({ code: "success" })
    else
      throw new Error("Cannot find Admin")
  } catch (error) {
    return Response.json({ code: "error" })
  }
}