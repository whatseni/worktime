import { Button, TextField, Typography } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../store/userSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [birth, setBirth] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePN = (event) => {
    setPhoneNumber(event.target.value);
  }
  const handleChangeBirth = (event) => {
    setBirth(event.target.value);
  }

  const handleLogin = async () => {
    try {
      const result = await axios.post('http://localhost:5000/employee/login-employee', {
        employeePhone: phoneNumber,
        employeeBirth: birth
      });
      if (result.data.code === "1") {
        let obj = {
          name: result.data.employeeName,
          phone: result.data.employeePhone,
          company: result.data.company
        }
        window.localStorage.setItem("userInfo", JSON.stringify(obj));
        dispatch(login({ name: result.data.employeeName, phone: result.data.employeePhone, company: result.data.company }));
        toast.success("로그인 성공!")
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error('로그인 실패. 다시 시도해주세요.')
    }
  }

  return (
    <CommonLayout>
      <Typography sx={{
        fontSize: "24px",
        fontWeight: 600
      }}>관리 시스템</Typography>
      <TextField
        label="핸드폰 번호"
        margin="normal"
        placeholder="01012341234"
        autoFocus
        onChange={handleChangePN}
      />
      <TextField
        label="생년월일"
        margin="normal"
        placeholder="990105"
        onChange={handleChangeBirth}
      />
      <Button variant="contained" onClick={handleLogin}>로그인</Button>
    </CommonLayout>
  )
}