import { Request, Response } from "express";
import Time from "../model/Time";
import { formatDate } from "../utils/checker";
import { getAllTime } from "../utils/func";
import { ReturnCode } from "../utils/Code";

// 월별 특정 사용자 근무 시간 조회
export const getUserWorkTimesByMonth = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, date } = req.body;
    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);

    const workTimes = await Time.find({ employeeName: employeeName, employeePhone: employeePhone,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     })
    const returnResult = workTimes.map((work) => {
      const temp = {
        date: formatDate(work.workDate),
        startTime: work.startTime,
        endTime: work.endTime
      }
      return temp;
    })
    res.status(200).json({code: ReturnCode.SUCCESS, data: returnResult});
  } catch (error) {
    console.log(error)
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
};


// 월별 특정 회사 모든 사용자 근무 시간 조회
export const getAllUsersTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { date, company } = req.body;

    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);

    const workTimes = await Time.find({ company: company,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     })
    res.status(200).json({code: ReturnCode.SUCCESS, data: workTimes});
  } catch (error) {
    console.log(error)
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 특정 날짜에 특정 사용자 근무 기록 조회
export const getUserTimeBySpecificDate = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, date } = req.body;

    const result = await Time.findOne({ employeeName: employeeName, employeePhone: employeePhone, workDate: new Date(date)})
    
    if (result) res.status(200).json({ code: ReturnCode.SUCCESS, isWorked: true, startTime: result.startTime, endTime: result.endTime});
    else res.status(200).json({ code: ReturnCode.SUCCESS, isWorked: false })
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 근로자 특정 월 총 근무 시간
export const getUserAllTimeByMonth = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, date } = req.body;
    // 선택된 월의 첫 번째 날
    const startDate = new Date(date);
    // 다음 달의 첫 번째 날
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    const result = await Time.find({ employeeName: employeeName, employeePhone:employeePhone, workDate: {
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
    console.log(error);
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 근무 시간 기록 업데이트
export const updateWorkTime = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, workDate, startTime, endTime, company } = req.body;
    let start = startTime.join(':');
    let end = endTime.join(':');
    // 타임 기록이 없다면 삽입 있다면 업데이트
    const updateTimeResult = await Time.findOneAndUpdate(
      {
        employeeName: employeeName,
        employeePhone: employeePhone,
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
        upsert: true        // 문서가 없으면 새로 추가
      }
    );
    res.status(200).json({ code: ReturnCode.SUCCESS, data: updateTimeResult?.workDate });
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}

// 근무 시간 기록 삭제
export const deleteWorkTime = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, workDate, company } = req.body;
    const deleteTimeResult = await Time.findOneAndDelete({ employeeName, employeePhone, workDate, company })
    res.status(200).json({ code: ReturnCode.SUCCESS, data: deleteTimeResult?.workDate });
  } catch (error) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error });
  }
}