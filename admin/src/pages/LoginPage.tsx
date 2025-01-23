import { Button, Card, CardActionArea, CardActions, CardContent, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReturnCode } from "../types/ReturnCode";
import { toast } from "react-toastify";
import { CurrentAdminContext } from "../components/context/adminContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const { currentAdmin, currentCompany, setCurrentAdmin, setCurrentCompany } = useContext(CurrentAdminContext);

  const onClickLoginButton = async () => {
    const response = await axios.post("http://localhost:5000/admin/login-admin", {
      id: email,
      password: password
    });
    console.log(response.data)
    if (response.data.code === ReturnCode.SUCCESS) {
      setCurrentAdmin(response.data.data.id);
      setCurrentCompany(response.data.data.company);
      navigate("/app")
      toast.success("로그인 성공")
    } else {
      toast.error("로그인 실패")
    }
  }
  useEffect(() => {
    if (currentAdmin && currentCompany) navigate("/app");
  }, []);
  return (
    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <CardContent sx={{ display: "grid", gap: "10px", width: "500px" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>로그인</Typography>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained" onClick={onClickLoginButton}>Login</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}