import dbConnect from "@/src/_lib/dbconnect";
import Time, { TimeType } from "../../../_models/time"
import { calculateTime } from "../../utils/format";
import Staff from "@/src/_models/staff";
import { Types } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;

  try {
    await dbConnect();
    const dataList = await Time.find({company: company});

    const returnData: any = [];
    dataList.forEach((data: TimeType) => {
      returnData.push(
        {
          id: data._id,
          date: data.date,
          title: data.name,
          extendedProps: {
            startTime: data.start,
            endTime: data.end,
            diff: calculateTime(data.start, data.end)
          }
        }
      )
    })

    return Response.json({ data: returnData })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: null })
  }
}

export async function POST(req: Request) {
  const requestMap = await req.json();

  const date = requestMap.date;
  const start = requestMap.start;
  const end = requestMap.end;
  const staffId = requestMap.selected;
  const company = requestMap.company;

  const staffObj = await Staff.findById(staffId);

  try {
    const data = await Time.create({
      _id: new Types.ObjectId(),
      staffId: staffId.toString(),
      name: staffObj.name,
      company: company,
      date: date,
      start: start,
      end: end
    });

    return Response.json({ data: "create" })
  } catch (error) {
    console.error(error)
    return Response.json({ data: "error"})
  }
}