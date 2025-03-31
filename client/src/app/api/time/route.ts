import dbConnect from "@/src/lib/dbconnect";
import time, { TimeType } from "@/src/models/time";
import { calculateTime } from "../utils/format";

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
  
}