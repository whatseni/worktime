import { Request, Response } from "express";
import Manager from "../model/Manager";

export const loginManager = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    // TODO :: password 암호화
    const findOne = await Manager.findOne({ id: id, password: password})
    if (findOne) {
      res.status(200).json({
        "message": "Employee Access Success"
      })
    } else {
      throw new Error("Employee Access Failed")
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}