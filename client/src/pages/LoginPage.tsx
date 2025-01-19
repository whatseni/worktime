import { Button, TextField, Typography } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import { handleLogin } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/userContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [birth, setBirth] = useState<string | null>(null);

  const { currentUser, setCurrentUser, setCurrentCompany, setCurrentPhone } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const onClickLoginButton = async () => {
    const data = await handleLogin({ phoneNumber, birth });
    if (data) {
      setCurrentUser(data.userName);
      setCurrentCompany(data.company);
      setCurrentPhone(data.userPhone);
      toast.success("로그인 성공");
      navigate("/");
    }
  }

  useEffect(() => {
    if (!currentUser) navigate("/app");
  }, []);

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
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <TextField
        label="생년월일"
        margin="normal"
        placeholder="990105"
        onChange={(event) => setBirth(event.target.value)}
      />
      <Button variant="contained" onClick={onClickLoginButton}>로그인</Button>
    </CommonLayout>
  )
}