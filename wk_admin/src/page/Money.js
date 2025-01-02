import { Backdrop, Box, CircularProgress, Container, Typography } from "@mui/material";
import Page from "../component/Page";
import { useState, useEffect } from "react";
import MoneyTable from "../component/money/MoneyTable";

export default function Money() {
  const [inprogressDataLoading, setInprogressDataLoading] = useState(false);
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  return (
    <Page title="근무 기록 테이블">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">월별 근무 기록 달력</Typography>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: 100}}
          open={inprogressDataLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <MoneyTable />
      </Container>
    </Page>
  )
}