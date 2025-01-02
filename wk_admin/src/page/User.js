import { Box, Container, Typography, Backdrop, CircularProgress } from "@mui/material";
import Page from "../component/Page";
import MoneyTable from "../component/money/MoneyTable";

export default function User() {
  return (
    <Page title="근무 기록 테이블">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">월별 근무 기록 달력</Typography>
        </Box>
        {/* <Backdrop
          sx={{ color: '#fff', zIndex: 100}}
          open={inprogressDataLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}

        <MoneyTable />
      </Container>
    </Page>
  )
}