import dbConnect from "@/src/lib/dbconnect";
import staff from "@/src/models/staff";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const pw = requestMap["password"];

    const hashedPw = await bcrypt.hash(pw, 10);
  
    const data = await staff.findByIdAndUpdate({id: id}, {password: hashedPw})
    
    if (data)
      return Response.json({ data: "success" })
  } catch (error) {
    console.log(error)
    return Response.json({ code: "error" })
  }
}