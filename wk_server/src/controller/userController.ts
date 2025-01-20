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

// 생성
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, userPhone, userBirth, userRole, userBank, userBankAccount, userCompany } = req.body;
    const newuser = User.create({ userName, userPhone, userBirth, userCompany,userRole, userBank, userBankAccount });

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
    const { userName, userPhone, userBirth, userRole, userBank, userBankAccount, userCompany } = req.body;
    const updateResult = await User.findOneAndUpdate({ userPhone: userPhone }, {
      userName: userName,
      userPhone: userPhone, 
      userBirth: userBirth,
      userCompany: userCompany,
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