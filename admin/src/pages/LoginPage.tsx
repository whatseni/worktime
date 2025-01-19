import { Button, Card, CardActionArea, CardActions, CardContent, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <CardContent sx={{ display: "grid", gap: "10px", width: "500px" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>로그인</Typography>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained">Login</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}