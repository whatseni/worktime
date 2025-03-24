import dbConnect from "@/src/_lib/dbconnect";
import Staff from "@/src/_models/staff";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const company = searchParams.get("company") as string;

  try {
    await dbConnect();
    const dataList = await Staff.find({
      company: company
    });

    return Response.json({ data: dataList })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: "error"})
  }
}

export async function POST(req: Request) {
  const requestMap = await req.json();
  const company = requestMap.company;
  const name = requestMap.name;
  const phone = requestMap.phone;
  const birth = requestMap.birth;
  const bank = requestMap.bank;
  const bankAccount = requestMap.bankAccount;
  const isWeek = requestMap.isWeek;

  try {

    await dbConnect();
    const data = await Staff.create({
      
    });

    return Response.json({ data: data })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: "error"})
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await dbConnect();
    const data = await Staff.findByIdAndDelete(id)

    return Response.json({ data: data })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: "error"})
  }
}

export async function PUT(req: Request) {
  const requestMap = await req.json();

  const id = requestMap.id;
  const company = requestMap.company;
  const name = requestMap.name;
  const phone = requestMap.phone;
  const birth = requestMap.birth;
  const bank = requestMap.bank;
  const bankAccount = requestMap.bankAccount;
  const isWeek = requestMap.isWeek;

  try {
    await dbConnect();
    const data = await Staff.findByIdAndUpdate(id, {
      
    })

    return Response.json({ data: data })
  } catch (error) {
    console.error("error find time")
    return Response.json({ data: "error"})
  }
}