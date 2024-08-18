import { Button, TextField, Typography } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import { useState } from "react";

export default function Login() {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);

  const handleChangeID = (event) => {
    setUserId(event.target.value);
  }
  const handleChangePW = (event) => {
    setUserPw(event.target.value);
  }

  const handleLogin = async () => {
    try {
      console.log(userId, userPw)

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <CommonLayout>
      <Typography sx={{
        fontSize: "24px",
        fontWeight: 600
      }}>관리 시스템</Typography>
      <TextField
        label="ID"
        margin="normal"
        autoFocus
        onChange={handleChangeID}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        onChange={handleChangePW}
      />
      <Button variant="contained" onClick={handleLogin}>로그인</Button>
    </CommonLayout>
  )
}