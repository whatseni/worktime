import { Request, Response } from "express";
import Time from "../model/Time";
import { formatDate } from "../utils/checker";
import { getAllTime } from "../utils/func";

// 월별 특정 사용자 근무 시간 조회
export const getUserWorkTimesByMonth = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, selectMonth } = req.body;
    const year = new Date().getFullYear();
    // 선택된 월의 첫 번째 날
    const startDate = new Date(`${year}-${selectMonth}-01`);
    // 다음 달의 첫 번째 날
    const endDate = new Date(`${year}-${selectMonth}-01`);
    endDate.setMonth(endDate.getMonth() + 1);

    const workTimes = await Time.find({ employeeName: employeeName, employeePhone: employeePhone,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     })
    const returnRes = workTimes.map((work) => {
      const temp = {
        date: formatDate(work.workDate),
        startTime: work.startTime,
        endTime: work.endTime
      }
      return temp;
    })
    res.status(200).json({code: '1', data: returnRes});
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


// 월별 특정 회사 모든 사용자 근무 시간 조회
export const getAllUsersTimeByCompanyAndMonth = async (req: Request, res: Response) => {
  try {
    const { selectMonth, company } = req.body;
    const year = new Date().getFullYear();
    // 선택된 월의 첫 번째 날
    const startDate = new Date(`${year}-${selectMonth}-01`);
    // 다음 달의 첫 번째 날
    const endDate = new Date(`${year}-${selectMonth}-01`);
    endDate.setMonth(endDate.getMonth() + 1);

    const workTimes = await Time.find({ company: company,
      workDate: {
        $gte: startDate,
        $lt: endDate
      }
     })
    res.status(200).json(workTimes);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

// 특정 날짜에 특정 사용자 근무 기록 조회
export const getUserTimeBySpecificDate = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, date } = req.body;

    const result = await Time.findOne({ employeeName: employeeName, employeePhone: employeePhone, workDate: new Date(date)})
    
    if (result) res.status(200).json({ code: "1", isWorked: true, startTime: result.startTime, endTime: result.endTime});
    else res.status(200).json({ code: "1", isWorked: false })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// 근로자 특정 월 총 근무 시간
export const getUserAllTimeByMonth = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, selectMonth } = req.body;
    const year = new Date().getFullYear();
    // 선택된 월의 첫 번째 날
    const startDate = new Date(`${year}-${selectMonth}-01`);
    // 다음 달의 첫 번째 날
    const endDate = new Date(`${year}-${selectMonth}-01`);
    endDate.setMonth(endDate.getMonth() + 1);
    const result = await Time.find({ employeeName: employeeName, employeePhone:employeePhone, workDate: {
      $gte: startDate,
      $lt: endDate
    }})
    if (result) {
      const response = getAllTime(result)
      res.status(200).json({code: 1, data: {
        'allTime': response
      }})
    } else {
      res.status(200).json({code: 1, data: {
        'allTime': 0
      }})
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// 근무 시간 기록 생성
export const createWorkTime = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, workDate, startTime, endTime, company } = req.body;
    const createTimeResult = new Time({ employeeName, employeePhone, workDate, startTime, endTime, company })
    await createTimeResult.save();
    res.status(200).json(createTimeResult);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// 근무 시간 기록 수정
export const updateWorkTime = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, workDate, startTime, endTime, company } = req.body;
    const updateTimeResult = await Time.findOneAndUpdate({ employeeName, employeePhone, workDate, startTime, endTime, company })
    res.status(200).json(updateTimeResult);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

// 근무 시간 기록 삭제
export const deleteWorkTime = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, workDate, startTime, endTime, company } = req.body;
    const deleteTimeResult = await Time.findOneAndDelete({ employeeName, employeePhone, workDate, startTime, endTime, company })
    res.status(200).json(deleteTimeResult);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}