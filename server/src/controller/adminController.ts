import { Request, Response } from "express";
import Admin from "../model/Admin";
import { ReturnCode } from "../utils/Code";
import Time from "../model/Time";
import { calculateTimeDifference, combineDateAndTime } from "../utils/func";
import User from "../model/User";
const bcrypt = require("bcryptjs");

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { id, password, company } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Admin.create({
      id: id,
      password: hashedPassword,
      company: company,
    });
    res.status(200).json({
      code: ReturnCode.SUCCESS,
      message: "Admin created",
    });
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const user = await Admin.findOne({ id: id });

    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user, password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.status(200).json({
        code: ReturnCode.SUCCESS,
        data: {
          id: user.id,
          company: user.company,
        },
      });
    } else {
      res
        .status(401)
        .json({ code: ReturnCode.FAILED, data: { isValidPassword } });
    }
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
};

// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
export const getAllUsersTimeByCompanyAndMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const { date, company } = req.body;

    const selectDate = new Date(date);
    const startMonth = new Date(
      Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1)
    );
    const endMonth = new Date(
      Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1)
    );

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
      const { hours, minutes } = calculateTimeDifference(
        entry.startTime,
        entry.endTime
      );
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

export const getAllUsersAllTimeByCompanyAndMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const { date, company } = req.body;

    // 선택된 월의 첫 번째 날과 다음 달의 첫 번째 날
    const selectDate = new Date(date);
    const startMonth = new Date(
      Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1)
    );
    const endMonth = new Date(
      Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1)
    );

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
                      {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$workDate",
                        },
                      },
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
                      {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$workDate",
                        },
                      },
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
    console.log(error);
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
};

// 생성 또는 수정
export const createOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const {
      userPhone, // 고유 필드, 사용자 식별
      userName,
      userBirth,
      isWeek,
      userRole,
      userBank,
      userBankAccount,
      userCompany,
      id,
    } = req.body;

    // `findOneAndUpdate`와 `upsert` 옵션 사용
    const user = await User.findOneAndUpdate(
      { _id: id }, // 조건: userPhone 기준으로 사용자 검색
      {
        $set: {
          userName,
          userBirth,
          isWeek,
          userRole,
          userBank,
          userBankAccount,
          userCompany,
        },
      },
      {
        new: true, // 업데이트된 문서를 반환
        upsert: true, // 없으면 새로 생성
      }
    );

    res.status(200).json({
      code: ReturnCode.SUCCESS,
      message: user ? "User updated successfully" : "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
};

// 특정 사용자 삭제
export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { selected } = req.body; // selected 배열: 삭제할 사용자들의 _id 값

    if (!Array.isArray(selected) || selected.length === 0) {
      return res.status(400).json({
        code: ReturnCode.ERROR,
        message: "Invalid input: 'selected' should be a non-empty array.",
      });
    }

    // MongoDB의 $in 연산자를 사용해 배열의 모든 _id에 해당하는 문서 삭제
    const deleteResult = await User.deleteMany({ _id: { $in: selected } });

    if (deleteResult.deletedCount > 0) {
      res.status(200).json({
        code: ReturnCode.SUCCESS,
        message: `${deleteResult.deletedCount} users deleted successfully.`,
      });
    } else {
      res.status(404).json({
        code: ReturnCode.ERROR,
        message: "No users found for deletion.",
      });
    }
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
};
