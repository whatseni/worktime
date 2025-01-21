
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Button, Box, Checkbox, IconButton, Typography} from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { handleGetAllUserAllTimeMonth } from '../utils/api';
import { toast } from 'react-toastify';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CurrentAdminContext } from './context/adminContext';
import { calculatePay, calculatePayTax } from '../utils/func';




export default function TableComponent() {
  const [date, setDate] = useState<Date>(new Date());
  const [timesData, setTimesData] = useState([]);

  const { currentCompany } = useContext(CurrentAdminContext);

  const handleClickPrevMonth = () => {};
  const handleClickNextMonth = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleGetAllUserAllTimeMonth({ date, company: 'PB'})
        if (result) {
          setTimesData(result)
        }
      } catch (error) {
        toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };
    fetchData();
  }, [date])
  return (
    <Fragment>
      <Box sx={{
        display: "flex",
        justifyContent:"space-between",
        margin: "20px 20px 0 0"
      }}>
        <Box sx={{
          display: "flex"
        }}>
          <IconButton onClick={handleClickPrevMonth}>
            <ChevronLeftIcon/>
          </IconButton>
          <Typography sx={{lineHeight:"40px"}}>{date.getMonth() + 1}월</Typography>
          <IconButton onClick={handleClickNextMonth}>
            <ChevronRightIcon/>
          </IconButton>
        </Box>
        <Button variant='contained' color="success">Excel로 출력</Button>
      </Box>
      
      <Card sx={{ margin: "20px"}}>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox/>
                </TableCell>
                <TableCell>이름</TableCell>
                <TableCell>시간대</TableCell>
                <TableCell>총 근무 시간</TableCell>
                <TableCell>주휴수당</TableCell>
                <TableCell>3.3% 적용 전</TableCell>
                <TableCell>3.3% 적용 후</TableCell>
                <TableCell>급여</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                timesData && timesData.map((data: any) => (
                  <TableRow key={data.userId}>
                    <TableCell>
                      <Checkbox/>
                    </TableCell>
                    <TableCell>{data.userName}</TableCell>
                    <TableCell>{data.userRole}</TableCell>
                    <TableCell>{data.totalHours} 시간 {data.totalMinutes}</TableCell>
                    <TableCell>
                      <Checkbox/>
                    </TableCell>
                    <TableCell>{calculatePay(data.totalHours, data.totalMinutes)}</TableCell>
                    <TableCell>{calculatePayTax(data.totalHours, data.totalMinutes)}</TableCell>
                    <TableCell>
                      121313211
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  );
}
