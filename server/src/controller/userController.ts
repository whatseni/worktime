import { Request, Response } from "express";
import User from "../model/User";
import { Error } from "mongoose";
import { ReturnCode } from "../utils/Code";

// 모든 근로자 조회
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { company } = req.body;
    const result = await User.find({
      userCompany: company
    });
    res.status(200).json({
      code: ReturnCode.SUCCESS,
      message: "All users Success Find",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
};

export const getAllUsersName = async (req: Request, res: Response) => {
  try {
    const { company } = req.body;
    const result = await User.find({
      userCompany: company
    }, {
      _id: false, userName: true, userPhone: true
    });
    res.status(200).json({
      code: ReturnCode.SUCCESS,
      message: "All users Success Find",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
}

// 근로자 로그인
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userPhone, userBirth } = req.body;
    const findOne = await User.findOne({ userPhone: userPhone, userBirth: userBirth})
    if (findOne) {
      res.status(200).json({
        // 이름과 폰번호 반환
        code: ReturnCode.SUCCESS,
        message: "user Access Success",
        data: {
          userName: findOne.userName,
          userPhone: findOne.userPhone,
          company: findOne.userCompany
        }
      })
    } else {
      throw new Error("user Access Failed")
    }
  } catch (error: any) {
    res.status(500).json({code: ReturnCode.ERROR, message: error.message });
  }
}

