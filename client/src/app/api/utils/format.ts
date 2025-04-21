import time from "@/models/time";
import { Types } from "mongoose";

export function calculateTime(start: any, end: any) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)

  const hour = Number(((eh * 60 + em) - (sh * 60 + sm)) / 60);

  return `${hour}h`
}

export async function calculateTotalTime(id: string, company: string, year: string, month: string) {
  const result = await time.aggregate([
    {
      $match: {
        staffId: new Types.ObjectId(id),
        company: company,
        date: { 
          $regex: `^${year}-${month.padStart(2, '0')}` 
        }
      }
    },
    {
      $group: {
        _id: {
          staffId: "$staffId",
          name: "$name"
        },
        totalTime: {
          $sum: {
            $let: {
              vars: {
                startTime: { $toDate: { $concat: ["2000-01-01T", "$start", ":00.000Z"] } },
                endTime: { $toDate: { $concat: ["2000-01-01T", "$end", ":00.000Z"] } }
              },
              in: { 
                $divide: [
                  { $subtract: ["$$endTime", "$$startTime"] },
                  1000 * 60 * 60 // 밀리초를 시간으로 변환
                ]
              }
            }
          }
        }
      }
    },
    {
      $project: {
        totalTime: { $round: ["$totalTime", 1] }
      }
    },
  ])

  return result[0]?.totalTime;
}