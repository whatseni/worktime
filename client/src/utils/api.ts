import axios from "axios";
import { toast } from "react-toastify";
import {
  LoginParamsTypes,
  LoginReturnTypes,
  TimeParamsTypes,
} from "../types/apiPayload";
import { ReturnCode } from "../types/returnPayload";

// Login 요청
export const handleLogin = async ({
  phoneNumber,
  birth,
}: LoginParamsTypes): Promise<LoginReturnTypes | null> => {
  try {
    // const result = await axios.post(
    //   "http://localhost:5000/employee/login-employee",
    //   {
    //     employeePhone: phoneNumber,
    //     employeeBirth: birth,
    //   }
    // );

    // if (result.data.code === "1") {
    //   return result.data;
    // }
    return {
      userName: "seeun",
      userPhone: "01031909491",
      company: "pb",
    };
  } catch (error) {
    toast.error("로그인 실패. 다시 로그인해주세요");
  }

  return null;
};

// 시간 등록
export const handleRegisterSchedule = async ({
  user,
  phone,
  company,
  date,
  start,
  end,
}: TimeParamsTypes): Promise<any | null> => {
  try {
    // const response = await axios.post(
    //   "http://localhost:5000/time/create-worktime",
    //   {
    //     userName: user,
    //     userPhone: phone,
    //     company: company,
    //     workDate: date,
    //     startTime: start,
    //     endTime: end,
    //   }
    // );
    // if (response.data.code === ReturnCode.SUCCESS) {
    //   return {};
    // }
    return {
      data: "ok",
    };
  } catch (error) {
    toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
  }
  return null;
};

// 시간 수정
export const handleUpdateSchedule = async ({
  user,
  phone,
  company,
  date,
  start,
  end,
}: TimeParamsTypes): Promise<any | null> => {
  try {
    // const response = await axios.post(
    //   "http://localhost:5000/time/update-worktime",
    //   {
    //     userName: user,
    //     userPhone: phone,
    //     company: company,
    //     workDate: date,
    //     startTime: start,
    //     endTime: end,
    //   }
    // );
    // if (response.data.code === ReturnCode.SUCCESS) {
    //   return {};
    // }
    return {
      data: "ok",
    };
  } catch (error) {
    toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
  }
  return null;
};

// 시간 삭제
export const handleDeleteSchedule = async ({
  user,
  phone,
  company,
  date,
}: TimeParamsTypes): Promise<any | null> => {
  try {
    // const response = await axios.post(
    //   "http://localhost:5000/time/delete-worktime",
    //   {
    //     userName: user,
    //     userPhone: phone,
    //     company: company,
    //     workDate: date,
    //   }
    // );
    // if (response.data.code === ReturnCode.SUCCESS) {
    //   return {};
    // }
    return {
      data: "ok",
    };
  } catch (error) {
    toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
  }
  return null;
};

// 한달 시간 조회
export const handleGetScheduleByMonth = async ({
  user,
  phone,
  date,
}: TimeParamsTypes): Promise<any | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/get-user-time-month",
      {
        userName: user,
        userPhone: phone,
        workDate: date,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return [
        {
          title: "test",
          start: new Date(2025, 1, 15),
          end: new Date(2025, 1, 15),
        },
      ];
    }
  } catch (error) {
    toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
  }
  return null;
};

// 한달 총 근로 시간 조회
export const handleGetAllTimeByMonth = async ({
  user,
  phone,
  date,
}: TimeParamsTypes): Promise<any | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/get-user-alltime-month",
      {
        userName: user,
        userPhone: phone,
        workDate: date,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return {};
    }
  } catch (error) {
    toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
  }
  return null;
};
