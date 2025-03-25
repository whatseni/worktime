import dbConnect from "@/src/lib/dbconnect";
import Time from "@/src/models/time";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;

  try {
    await dbConnect();
    const dataList = await Time.find({
      company: company
    });

    return Response.json({ data: dataList })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: "error"})
  }
}