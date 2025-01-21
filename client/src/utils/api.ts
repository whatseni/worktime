import axios from "axios";
import {
  AllTimeReturnTypes,
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
    const result = await axios.post(
      "http://localhost:5000/user/login-user",
      {
        userPhone: phoneNumber,
        userBirth: birth,
      }
    );

    if (result.data.code === ReturnCode.SUCCESS) {
      console.log(result.data.data)
      return result.data.data;
    }
  } catch (error) {
    console.error(error);
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
    const response = await axios.post(
      "http://localhost:5000/time/create-worktime",
      {
        userName: user,
        userPhone: phone,
        company: company,
        workDate: date,
        startTime: start,
        endTime: end,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return {};
    }
    return {
      data: "ok",
    };
  } catch (error) {
    console.error(error);
  }
  return null;
};

// 시간 수정
export const handleUpdateSchedule = async ({
  id,
  date,
  start,
  end,
}: any): Promise<any | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/update-worktime",
      {
        id: id,
        workDate: date,
        startTime: start,
        endTime: end,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return {};
    }
    return {
      data: "ok",
    };
  } catch (error) {
    console.error(error);
  }
  return null;
};

// 시간 삭제
export const handleDeleteSchedule = async ({id
}: any): Promise<any | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/delete-worktime",
      {
        id: id
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return {};
    }
    return {
      data: "ok",
    };
  } catch (error) {
    console.error(error);
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
        date: date,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

// 한달 총 근로 시간 조회
export const handleGetAllTimeByMonth = async ({
  user,
  phone,
  date,
}: TimeParamsTypes): Promise<string | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/get-user-alltime-month",
      {
        userName: user,
        userPhone: phone,
        date: date,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return response.data.data.allTime;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
