import dbConnect from "@/src/lib/dbconnect";
import time, { TimeType } from "@/src/models/time";
import { calculateTime } from "../utils/format";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;
  const year = searchParams.get("year") as string;
  const month = searchParams.get("month") as string;

  try {
    await dbConnect();
    const dataList = await time.find({
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