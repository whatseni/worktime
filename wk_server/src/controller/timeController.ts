import { Request, Response } from "express";
import Time from "../model/Time";
import { getAllTime, getAllTimeByUser } from "../utils/func";
import { ReturnCode } from "../utils/Code";

// 특정 회사의 특정 근로자가 한달동안 근무한 데이터 조회
export const getTimeByMonth = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, date } = req.body;
    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);

    const result = await Time.find({ userName: userName, userPhone: userPhone,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     }, { _id: false, workDate: true, startTime: true, endTime: true })

    res.status(200).json({code: ReturnCode.SUCCESS, data: result});
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
};

// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
export const getAllUsersTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { date, company } = req.body;

    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);

    const result = await Time.find({ company: company,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     })
    res.status(200).json({code: ReturnCode.SUCCESS, data: result});
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 조회
export const getUserTimeBySpecificDate = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, date } = req.body;

    const result = await Time.findOne({ userName: userName, userPhone: userPhone, workDate: new Date(date)})
    
    if (result) res.status(200).json({ code: ReturnCode.SUCCESS, isWorked: true, startTime: result.startTime, endTime: result.endTime});
    else res.status(200).json({ code: ReturnCode.SUCCESS, isWorked: false })
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 특정 근로자가 한달동안 총 근무한 시간 데이터 조회
export const getUserAllTimeByMonth = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, date } = req.body;
    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    const result = await Time.find({ userName: userName, userPhone:userPhone, workDate: {
      $gte: startDate,
      $lt: endDate
    }})
    if (result) {
      const response = getAllTime(result)
      res.status(200).json({code: ReturnCode.SUCCESS, data: {
        'allTime': response
      }})
    } else {
      res.status(200).json({code: ReturnCode.SUCCESS, data: {
        'allTime': 0
      }})
    }
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 수정
export const updateWorkTime = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, workDate, startTime, endTime, company } = req.body;
    let start = startTime.join(':');
    let end = endTime.join(':');
    // 타임 기록이 없다면 삽입 있다면 업데이트
    const updateTimeResult = await Time.findOneAndUpdate(
      {
        userName: userName,
        userPhone: userPhone,
        workDate: new Date(workDate),
        company: company,
      },
      {
        $set: {
          startTime: start,
          endTime: end,
        }
      },
      {
        new: true,         // 업데이트된 문서를 반환
        upsert: false        // 문서가 없으면 새로 추가
      }
    );
    res.status(200).json({ code: ReturnCode.SUCCESS, data: updateTimeResult?.workDate });
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 특정 근로자가 해당 날짜 근무한 데이터 삭제
export const deleteWorkTime = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, workDate, company } = req.body;
    const deleteTimeResult = await Time.findOneAndDelete({ userName, userPhone, workDate, company })
    if (deleteTimeResult) {
      res.status(200).json({ code: ReturnCode.SUCCESS, data: deleteTimeResult?.workDate });
    } else {
      throw new Error('Delete Failed')
    }
    
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 생성
export const createWorkTime = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, workDate, startTime, endTime, company } = req.body;
    let start = startTime.join(':');
    let end = endTime.join(':');

    const result = await Time.create(
      {
        userName: userName,
        userPhone: userPhone,
        workDate: new Date(workDate),
        startTime: start,
        endTime: end,
        company: company,
      }
    );
    if (result) res.status(200).json({ code: ReturnCode.SUCCESS, data: result });
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 회사의 모든 근로자의 한달 총 근로 시간 데이터 조회
export const getAllUsersAllTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { date, company } = req.body;
    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    const result = await Time.find({ company: company, workDate: {
      $gte: startDate,
      $lt: endDate
    }}, {
      userName: true,
      workDate: true,
      startTime: true,
      endTime: true,
    })
    if (result) {
      const response = getAllTimeByUser(result)
      res.status(200).json({code: ReturnCode.SUCCESS, data: {
        time: response
      }})
    }
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}
