import dbConnect from "@/src/lib/dbconnect";
import Time, { TimeType } from "../../../models/time"
import { calculateTime } from "../../utils/format";
import Staff from "@/src/models/staff";
import { Types } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;
  const year = searchParams.get("year") as string;
  const month = searchParams.get("month") as string;

  try {
    await dbConnect();
    const dataList = await Time.find({
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
            startTime: data.start,
            endTime: data.end,
            diff: calculateTime(data.start, data.end)
          }
        }
      )
    })

    return Response.json({ data: returnData })
  } catch (error) {
    console.error(error)
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