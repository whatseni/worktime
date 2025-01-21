import { Request, Response } from "express";
import Admin from "../model/Admin";
import { ReturnCode } from "../utils/Code";
import Time from "../model/Time";
import { calculateTimeDifference, combineDateAndTime, getAllTimeByUser } from "../utils/func";
import User from "../model/User";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    // TODO :: password 암호화
    const findOne = await Admin.findOne({ id: id, password: password })
    if (findOne) {
      res.status(200).json({ 
        code: ReturnCode.SUCCESS,
        message: "Login Success"
      })
    } else {
      throw new Error("Login Failed")
    }
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
}

// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
export const getAllUsersTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { date, company } = req.body;

    const selectDate = new Date(date);
    const startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
    const endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));

    // MongoDB aggregate로 Time과 User 조인
    const result = await Time.aggregate([
      {
        $match: {
          company: company,
          workDate: {
            $gte: startMonth,
            $lt: endMonth,
          },
        },
      },
      {
        $lookup: {
          from: "users", // users 컬렉션 이름
          localField: "userName", // Time 컬렉션에서 조인할 필드
          foreignField: "userName", // User 컬렉션의 연결 필드
          as: "userInfo", // 조인 결과를 저장할 필드
        },
      },
      {
        $unwind: "$userInfo", // userInfo를 평탄화
      },
    ]);

    // 데이터를 변환하여 응답 형식에 맞게 처리
    const transformedResult = result.map((entry) => {
      const start = combineDateAndTime(entry.workDate, entry.startTime);
      const end = combineDateAndTime(entry.workDate, entry.endTime);
      const { hours, minutes } = calculateTimeDifference(entry.startTime, entry.endTime);
      return {
        id: entry._id,
        title: `${entry.userInfo.userName} ${hours}h ${minutes}m`,
        start: start,
        end: end,
      };
    });

    res.status(200).json({ code: ReturnCode.SUCCESS, data: transformedResult });
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
};


export const getAllUsersAllTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { date, company } = req.body;

    // 선택된 월의 첫 번째 날과 다음 달의 첫 번째 날
    const selectDate = new Date(date);
    const startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
    const endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));

    const result = await Time.aggregate([
      {
        $match: {
          company: company,
          workDate: { $gte: startMonth, $lt: endMonth },
        },
      },
      {
        $lookup: {
          from: "users", // User 컬렉션 이름
          localField: "userName", // Time 컬렉션에서 연결할 필드
          foreignField: "userName", // User 컬렉션에서 연결할 필드
          as: "userInfo", // 조인 결과를 저장할 필드
        },
      },
      {
        $unwind: "$userInfo", // 조인 결과를 평탄화
      },
      {
        $project: {
          userName: 1,
          userRole: "$userInfo.userRole", // User의 userRole 추가
          userId: "$userInfo._id", // User의 _id 추가
          workDuration: {
            $subtract: [
              {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$workDate" } },
                      "T",
                      "$endTime",
                      "Z",
                    ],
                  },
                },
              },
              {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$workDate" } },
                      "T",
                      "$startTime",
                      "Z",
                    ],
                  },
                },
              },
            ],
          }, // 각 작업 시간 차이 계산
        },
      },
      {
        $group: {
          _id: "$userName", // 사용자별로 그룹화
          userId: { $first: "$userId" }, // 그룹의 첫 번째 userId 유지
          userRole: { $first: "$userRole" }, // 그룹의 첫 번째 userRole 유지
          totalMilliseconds: { $sum: "$workDuration" }, // 모든 작업 시간 합산
        },
      },
      {
        $project: {
          _id: false,
          userName: "$_id",
          userId: 1,
          userRole: 1,
          totalHours: { $floor: { $divide: ["$totalMilliseconds", 3600000] } }, // 총 시간
          totalMinutes: {
            $floor: {
              $mod: [{ $divide: ["$totalMilliseconds", 60000] }, 60],
            },
          }, // 총 분
        },
      },
    ]);
    
    

    if (result) {
      // const response = getAllTimeByUser(result);

      res.status(200).json({
        code: ReturnCode.SUCCESS,
        data: result,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
};

// 생성
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, userBirth,isWeek, userRole, userBank, userBankAccount, userCompany } = req.body;
    const newuser = User.create({ userName, userPhone, userBirth,isWeek, userCompany,userRole, userBank, userBankAccount });

    res.status(200).json({
      code: ReturnCode.SUCCESS,
      message: "user success save",
      data: newuser
    })
  } catch (error:any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message })
  }
}


// 특정 사용자 수정
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, userBirth, userRole,isWeek, userBank, userBankAccount, userCompany } = req.body;
    const updateResult = await User.findOneAndUpdate({ userPhone: userPhone }, {
      userName: userName,
      userPhone: userPhone, 
      userBirth: userBirth,
      userCompany: userCompany,
      isWeek: isWeek,
      userRole: userRole,
      userBank: userBank,
      userBankAccount: userBankAccount
    });
    if (updateResult) {
      res.status(200).json({
        code: ReturnCode.SUCCESS,
        message: "user success save",
      })
    } else {
      throw new Error("user Update Failed")
    }
    
  } catch (error:any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message })
  }
}

// 특정 사용자 삭제
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userPhone } = req.body;
    const deleteResult = await User.findOneAndDelete({ userPhone: userPhone })
    if (deleteResult) {
      res.status(200).json({
        code: ReturnCode.SUCCESS,
        message: "user delete save",
      })
    } else {
      throw new Error("user Update Failed")
    }
  } catch (error:any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message })
  }
}