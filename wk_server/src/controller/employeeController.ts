import { Request, Response } from "express";
import Employee from "../model/Employee";
import { Error } from "mongoose";

// 생성
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, employeeBirth, employeeCompany } = req.body;
    const newEmployee = new Employee({ employeeName, employeePhone, employeeBirth, employeeCompany });
    await newEmployee.save();
    res.status(200).json({
      "message": "employee success save",
      "employee": newEmployee
    })
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

// 모든 근로자 조회
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      "message": "All Employees Success Find",
      "employees": employees
    })
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// 근로자 로그인
export const loginEmployee = async (req: Request, res: Response) => {
  try {
    const { employeePhone, employeeBirth } = req.body;
    const findOne = await Employee.findOne({ employeePhone: employeePhone, employeeBirth: employeeBirth})
    if (findOne) {
      res.status(200).json({
        // 이름과 폰번호 반환
        "message": "Employee Access Success"
      })
    } else {
      throw new Error("Employee Access Failed")
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// 특정 사용자 수정
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeName, employeePhone, employeeBirth, employeeCompany } = req.body;
    const updateResult = await Employee.findOneAndUpdate({ employeePhone: employeePhone }, {
      employeeName: employeeName,
      employeePhone: employeePhone, 
      employeeBirth: employeeBirth, 
      employeeCompany: employeeCompany
    });
    if (updateResult) {
      res.status(200).json({
        "message": "employee success save",
      })
    } else {
      throw new Error("Employee Update Failed")
    }
    
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

// 특정 사용자 삭제
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { employeePhone } = req.body;
    const deleteResult = await Employee.findOneAndDelete({ employeePhone: employeePhone})
    if (deleteResult) {
      res.status(200).json({
        "message": "employee delete save",
      })
    } else {
      throw new Error("Employee Update Failed")
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}