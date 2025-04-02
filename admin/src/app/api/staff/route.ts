import dbConnect from "@/src/lib/dbconnect";
import Staff from "@/src/models/staff";
import { Types } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;

  try {
    await dbConnect();
    const dataList = await Staff.find({
      company: company
    });

    return Response.json({ code: 200, data: dataList })
  } catch (error) {
    console.error(error)
    return Response.json({ code: 500, data: "error"})
  }
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  const requestMap = await req.json();

  if (id) {
    try {
      await dbConnect();
      const data = await Staff.findByIdAndUpdate(id, requestMap)
  
      return Response.json({ code: 200, data: data })
    } catch (error) {
      console.error(error)
      return Response.json({ code: 500, data: "error"})
    }
  } else {
    try {
      await dbConnect();
      const data = await Staff.create({
        _id: new Types.ObjectId(),
        ...requestMap
      });
  
      return Response.json({ code: 200, data: data })
    } catch (error) {
      console.error(error)
      return Response.json({ code: 500, data: "error"})
    }
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await dbConnect();
    const data = await Staff.findByIdAndDelete(id)

    return Response.json({ code: 200, data: data })
  } catch (error) {
    console.error(error)
    return Response.json({ code: 500, data: "error"})
  }
}