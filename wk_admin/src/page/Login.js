import * as Yup from 'yup';
import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, InputAdornment, IconButton, Box, styled, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Page from "../component/Page";
import { useNavigate } from 'react-router-dom';
import { useSession } from '../component/context/sessionContext';
import { useState } from 'react';


const RootStyle = styled(Page)(() => ({
  position: 'absolute',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "700px"
}));

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setSession } = useSession();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식을 지켜주세요.').required('이메일을 입력해주세요.'),
    password: Yup.string().required('패스워드를 입력해주세요.')
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      console.log(data);
      try {
        // const response = await axios.post('/admin/login-admin', {
        //   id: data.email,
        //   password: data.password
        // });
        // if (response) {
        //   setSession('test@email.com');
        //   navigate('/dashboard/calendar', { replace: true });
        // }
        setSession('test@email.com');
          navigate('/dashboard/main', { replace: true });
      } catch (e) {
        console.log(e);
        window.alert('로그인 실패');
      }
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <RootStyle title="로그인 페이지">
      <Container maxWidth="xl">
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            로그인 페이지
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>이메일과 패스워드를 입력하세요.</Typography>
        </Stack>
        <Box>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField 
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton  edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                 <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Login
              </LoadingButton>
              </Stack>
             
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </RootStyle>
  )
}