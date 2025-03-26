import time from "@/src/models/time";

export function calculateTime(start: any, end: any) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)

  const hour = Number(((eh * 60 + em) - (sh * 60 + sm)) / 60);
  const min = Number(((eh * 60 + em) - (sh * 60 + sm)) % 60);

  return `${hour}h ${min}m`
}

export function calculatePay() {

}

const CURRENT_PAY = 10030
const CURRNET_WPAY = 13050
// export const calculateStaffPay = async (company: any, year: any, month: any) => {
//   const result = await time.aggregate([
//     // 1. 필터링 조건
//     {
//       $match: {
//         company: company, // 동적으로 회사 지정
//         date: { 
//           $regex: `^${year}-${month.padStart(2, '0')}` // 년도와 월 동적 지정
//         }
//       }
//     },
    
//     // 2. 작업별 그룹화 및 총 근무 시간 계산
//     {
//       $group: {
//         _id: {
//           staffId: "$staffId",
//           name: "$name"
//         },
//         totalTime: {
//           $sum: {
//             $let: {
//               vars: {
//                 startTime: { $toDate: { $concat: ["2000-01-01T", "$start", ":00.000Z"] } },
//                 endTime: { $toDate: { $concat: ["2000-01-01T", "$end", ":00.000Z"] } }
//               },
//               in: { 
//                 $divide: [
//                   { $subtract: ["$$endTime", "$$startTime"] },
//                   1000 * 60 * 60 // 밀리초를 시간으로 변환
//                 ]
//               }
//             }
//           }
//         }
//       }
//     },
    
//     // 3. 급여 계산 및 최종 형태 변환
//     {
//       $project: {
//         staffId: "$_id.staffId",
//         name: "$_id.name",
//         totalTime: { $round: ["$totalTime", 1] },
//         pay: { $multiply: ["$totalTime", CURRENT_PAY] },
//         payintax: { 
//           $multiply: [
//             { $multiply: ["$totalTime", CURRENT_PAY] },
//             0.967 // 세후 비율 (96.7%)
//           ]
//         },
//         _id: 0
//       }
//     },
    
//     // 4. 결과 정렬
//     {
//       $sort: { totalTime: -1 }
//     }
//   ]);

//   return result;
// };

export const calculateStaffPay = async (company: any, year: any, month: any) => {
  const result = await time.aggregate([
    // 1. 필터링 조건: 회사와 년-월 기준 매칭
    {
      $match: {
        company: company,
        date: { 
          $regex: `^${year}-${month.padStart(2, '0')}` 
        }
      }
    },
    
    // 2. 작업별 그룹화 및 총 근무 시간 계산
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

    // 3. staff 컬렉션과 조인하여 isWeek 필드 가져오기 (컬렉션 이름은 "staffs"라고 가정)
    {
      $lookup: {
        from: "staffs",
        localField: "_id.staffId",
        foreignField: "_id",
        as: "staff"
      }
    },
    {
      $unwind: "$staff"
    },
    
    // 4. 급여 계산 및 최종 형태 변환
    {
      $project: {
        staffId: "$_id.staffId",
        name: "$_id.name",
        totalTime: { $round: ["$totalTime", 1] },
        // 조건에 따라 isWeek가 true면 13050, false면 10000을 사용
        isWeek: "$staff.isWeek",
        pay: { 
          $multiply: [
            "$totalTime", 
            { $cond: { if: "$staff.isWeek", then: CURRNET_WPAY, else: CURRENT_PAY } }
          ]
        },
        payintax: { 
          $multiply: [
            { 
              $multiply: [
                "$totalTime", 
                { $cond: { if: "$staff.isWeek", then: CURRNET_WPAY, else: CURRENT_PAY } }
              ]
            },
            0.967 // 세후 비율 (96.7%)
          ]
        },
        _id: 0
      }
    },
    
    // 5. 결과 정렬 (총 근무 시간이 많은 순서대로)
    {
      $sort: { totalTime: -1 }
    }
  ]);

  return result;
};
