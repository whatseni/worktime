import dbConnect from "@/lib/dbconnect";
import Staff from "@/models/staff";
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
      let tempPw = requestMap.birth;
      let [year, month, date] = tempPw.split("-");
      year = year.slice(2);
      let pw = `${year}${month}${date}`;
      const data = await Staff.create({
        _id: new Types.ObjectId(),
        ...requestMap,
        password: pw
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