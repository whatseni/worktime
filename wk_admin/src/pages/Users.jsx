import { Helmet } from "react-helmet-async";
import UserListTable from "../components/UserListTable";
import { Container, Box, Typography } from "@mui/material";

export default function Users() {
  return (
    <>
      <Helmet>
        <title>근무자 정보 테이블 | 관리자용</title>
      </Helmet>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">근로자 테이블 목록</Typography>
        </Box>
        <UserListTable />
      </Container>

    </>
  )
}