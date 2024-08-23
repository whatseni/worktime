import { Icon } from "@iconify/react";
import { Box, Button, Card, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const naviagte = useNavigate();

  const handleLogin = () => {
    naviagte('/calendar')
  }
  return (
    <>
      <Helmet>
        <title>로그인 | 근무 시간 관리</title>
      </Helmet>
      <Box sx={{ height: 1 }}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>관리자용 로그인</Typography>
            <Stack spacing={3}>
              <TextField name="id" label="ID" />
              <TextField name="password" label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
              <Button variant="contained" onClick={handleLogin}>로그인</Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </>
  )
}