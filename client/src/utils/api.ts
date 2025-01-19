import axios from "axios";
import { toast } from "react-toastify";
import { LoginParamsTypes, LoginReturnTypes } from "../types/apiPayload";

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
