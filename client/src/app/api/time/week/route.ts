import dbConnect from "@/lib/dbconnect";
import time, { TimeType } from "@/models/time";

export async function POST(req: Request) {

  const requestMap = await req.json();
  const id = requestMap["userId"];
  const company = requestMap["company"];
  const weekStart = requestMap["weekStart"];

  try {
    await dbConnect();

    let result = [];
    for(let i = 0; i < 7; i++) {
      const current = new Date(weekStart);
      current.setDate(current.getDate() + i);
      let year = current.getFullYear();
      let month = (current.getMonth() + 1).toString().padStart(2, '0');
      let date = current.getDate().toString().padStart(2, '0');

      const data = await time.findOne({
        staffId: id,
        company: company,
        date: { $regex: `^${year}-${month}-${date}` }
      }, {
        _id: false,
        start: true,
        end: true
      })
      console.log(year, month, date, data)
      
      result.push(data)
    }

    return Response.json({ code: 200, data: result})
  } catch (error) {
    console.error(error)
    return Response.json({ code: 500, data: null })
  }
}