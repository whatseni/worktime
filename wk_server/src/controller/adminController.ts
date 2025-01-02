import { Request, Response } from "express";
import Admin from "../model/Admin";
import { ReturnCode } from "../utils/Code";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    // TODO :: password 암호화
    const findOne = await Admin.findOne({ id: id, password: password })
    if (findOne) {
      res.status(200).json({ 
        code: ReturnCode.SUCCESS,
        message: "Login Success"
      })
    } else {
      throw new Error("Login Failed")
    }
  } catch (error: any) {
    res.status(500).json({ code: ReturnCode.ERROR, message: error.message });
  }
}