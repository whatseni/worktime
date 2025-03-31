import { deleteSession } from "@/src/lib/session";

export async function GET(req: Request) {
  try {
    deleteSession()
    return Response.json({ data: "hi" })
  } catch (error) {
    return Response.json({ code: "error" })
  }
}