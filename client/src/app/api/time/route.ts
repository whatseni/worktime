import dbConnect from "@/lib/dbconnect";
import time, { TimeType } from "@/models/time";
import { calculateTime, calculateTotalTime } from "../utils/format";
import { Types } from "mongoose";
import staff from "@/models/staff";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;
  const year = searchParams.get("year") as string;
  const month = searchParams.get("month") as string;
  const id = searchParams.get("userId") as string;

  try {
    await dbConnect();
    const dataList = await time.find({
      staffId: id,
      company: company,
      date: { $regex: `^${year}-${month.padStart(2, '0')}` }
    });

    const returnData: any = [];
    dataList.forEach((data: TimeType) => {
      returnData.push(
        {
          id: data._id,
          date: data.date,
          title: data.name,
          extendedProps: {
            diff: calculateTime(data.start, data.end),
          }
        }
      )
    })

    let res = await calculateTotalTime(id, company, year, month);
    return Response.json({ code: 200, data: {
      data: returnData,
      totalTime: res
    }})
  } catch (error) {
    console.error(error)
    return Response.json({ code: 500, data: null })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const requestMap = await req.json();
    const id = requestMap["id"];
    const company = requestMap["company"];
    const data = requestMap["data"];

    const staffObj = await staff.findById(id);
    try {
      for(let i = 0; i < 7; i++) {
        if (data[i].start && data[i].end) {
          const temp = await time.create({
            _id: new Types.ObjectId(),
            staffId: id,
            company: company,
            name: staffObj.name,
            date: data[i].date,
            start: data[i].start,
            end: data[i].end
          })
        }
      }
    } catch (e: any) {
      throw new Error(e)
    }
    
    return Response.json({ code: 200, data: "success" })
  } catch (error) {
    console.log(error)
    return Response.json({ code: 500, data: "error" })
  }
}