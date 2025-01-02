import { Box, Typography, Button, styled } from "@mui/material";
import Page from "../component/Page";
import { Link as RouterLink } from 'react-router-dom';


const RootStyle = styled(Page)(() => ({
  position: 'absolute',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "700px"
}));


export default function Page404() {
  return (
    <RootStyle title="Page Not Found">
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
          존재하지 않는 페이지입니다.
        </Typography>
        <Button to="/" size="large" variant="contained" component={RouterLink}>
          메인으로 가기
        </Button>
      </Box>
    </RootStyle>
  )
}