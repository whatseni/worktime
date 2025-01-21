import axios from "axios";
import { ReturnCode } from "../types/ReturnCode";
import { GetAllUserParmsType } from "../types/apiPayload";
import { Event } from "react-big-calendar";

export const handleLogin = async () => {
  try {
    const result = await axios.post("http://localhost:5000/admin/login-admin");
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateOrUpdateUser = async ({
  userName,
  userRole,
  isWeek,
  userPhone,
  userBirth,
  userBank,
  userBankAccount,
  company,
}: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/admin/create-or-update-user",
      {
        userName: userName,
        userPhone: userPhone,
        userBirth: userBirth,
        userRole: userRole,
        isWeek: isWeek,
        userBank: userBank,
        userBankAccount: userBankAccount,
        userCompany: "PB",
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteUser = async ({ userPhone }: any) => {
  try {
    const result = await axios.post("http://localhost:5000/user/delete-user", {
      userPhone: userPhone,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUser = async ({ company }: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/get-alluser-info",
      {
        company: company,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUserTimeMonth = async ({
  date,
  company,
}: GetAllUserParmsType): Promise<Event[] | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/get-alluser-time-month",
      {
        date: date,
        company: company,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) return response.data.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const handleGetAllUserAllTimeMonth = async ({
  date,
  company,
}: GetAllUserParmsType) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/get-alluser-alltime-month",
      {
        date: date,
        company: company,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleRegisterSchedule = async ({
  userName,
  userCompany,
  userPhone,
  date,
  start,
  end,
}: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/create-worktime",
      {
        userName: userName,
        userPhone: userPhone,
        company: userCompany,
        workDate: date,
        startTime: start,
        endTime: end,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return ReturnCode.SUCCESS;
    }
  } catch (error) {
    console.error(error);
  }
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
      return ReturnCode.SUCCESS;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

// 시간 삭제
export const handleDeleteSchedule = async ({
  id,
}: any): Promise<any | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/time/delete-worktime",
      {
        id: id,
      }
    );
    if (response.data.code === ReturnCode.SUCCESS) {
      return ReturnCode.SUCCESS;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
