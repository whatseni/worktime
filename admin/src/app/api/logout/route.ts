import { deleteSession } from "@/src/lib/session"

export async function GET(req: Request) {
  try {
    deleteSession()
    return Response.json({ code: 200, data: "ok" })
  } catch (error) {
    return Response.json({ code: 500, data: "error" })
  }
}