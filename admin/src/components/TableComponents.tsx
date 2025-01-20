
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Button, Box, Checkbox, IconButton, Typography} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { handleGetAllUserAllTimeMonth } from '../utils/api';
import { toast } from 'react-toastify';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function TableComponent() {
  const [date, setDate] = useState(new Date());
  const [timesData, setTimesData] = useState();

  useEffect(() => {
          const fetchData = async () => {
            try {
              await handleGetAllUserAllTimeMonth({ date, company: 'PB'})

            } catch (error) {
              toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
            }
          };
        
          fetchData();
  }, [])
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
          <IconButton>
            <ChevronLeftIcon/>
          </IconButton>
          <Typography sx={{lineHeight:"40px"}}>{12}월</Typography>
          <IconButton>
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
                <TableCell>3.3%</TableCell>
                <TableCell>급여</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox/>
                </TableCell>
                <TableCell>A</TableCell>
                <TableCell>평일오픈</TableCell>
                <TableCell>12시간 30분</TableCell>
                <TableCell >
                  <Checkbox
                    color="primary"
                    checked={true}
                  />
                </TableCell>
                <TableCell >
                <Checkbox
                    color="primary"
                    checked={true}
                  />
                </TableCell>
                <TableCell>급여</TableCell>
              </TableRow>
              <TableRow>
              <TableCell padding="checkbox">
                  <Checkbox/>
                </TableCell>
                <TableCell>이름</TableCell>
                <TableCell>시간대</TableCell>
                <TableCell>총 근무 시간</TableCell>
                <TableCell >
                <Checkbox
                    color="primary"
                    checked={true}
                  />
                </TableCell>
                <TableCell >
                <Checkbox
                    color="primary"
                    checked={true}
                  />
                </TableCell>
                <TableCell>급여</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  );
}
