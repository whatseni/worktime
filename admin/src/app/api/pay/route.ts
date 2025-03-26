import dbConnect from "@/src/lib/dbconnect";
import Time from "@/src/models/time";
import { calculateStaffPay } from "../../utils/format";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;
  const year = searchParams.get("year") as string;
  const month = searchParams.get("month") as string;

  try {
    await dbConnect();

    const dataList = await calculateStaffPay(company, year, month)

    return Response.json({ data: dataList })
  } catch (error) {
    console.error(error)
    return Response.json({ data: "error"})
  }
}