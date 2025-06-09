import dbConnect from "@/lib/dbconnect";
import Admin from "@/models/admin"

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const pw = requestMap["password"];
  
    const findAdmin = await Admin.findOne({id: id, password: pw})

    if (findAdmin)
      return Response.json({ code: 200, data: findAdmin })
    else
      throw new Error("Cannot find Admin")
  } catch (error) {
    return Response.json({ code: 500, data: "error" })
  }
}