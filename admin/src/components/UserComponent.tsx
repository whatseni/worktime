
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Checkbox, Button, Box} from '@mui/material';
import UserToolbar from './user/UserToolbar';
import { Fragment, useEffect, useState } from 'react';
import UserModal from './user/UserModal';
import { handleGetAllUser } from '../utils/api';
import { toast } from 'react-toastify';


export default function UserComponent() {
  const [selected, setSelected] = useState(["!"]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [usersData, setUsersData] = useState([]);
  const [selectUser, setSelectUser] = useState();


  const handleClickUser = (data: any) => {
    setModalOpen(true);
    setSelectUser(data);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleGetAllUser({ company: 'PB'})
        if (result) {
          setUsersData(result)
        }
      } catch (error) {
        toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };
    
    fetchData();
  }, [])

  return (
    <Fragment>
      <Card sx={{ margin: "20px"}}>
        <UserModal open={modalOpen} setOpen={setModalOpen} userData={selectUser}/>
        <UserToolbar numSelected={selected}/>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell padding="checkbox">
                    <Checkbox/>
                  </TableCell>
                <TableCell>이름</TableCell>
                <TableCell>시간대</TableCell>
                <TableCell>주휴 수당 여부</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>거래은행</TableCell>
                <TableCell>계좌번호</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                usersData && usersData.map((data: any) => (
                  <TableRow key={data._id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell onClick={() => handleClickUser(data)}>{data.userName}</TableCell>
                    <TableCell>{data.userRole}</TableCell>
                    <TableCell>
                      <Checkbox checked={data.isWeek}/>
                    </TableCell>
                    <TableCell>{data.userPhone}</TableCell>
                    <TableCell>{data.userBirth}</TableCell>
                    <TableCell>{data.userBank}</TableCell>
                    <TableCell>{data.userBankAccount}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
    </Card>
    <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
      <Button variant='contained' onClick={() => setModalOpen(true)}>추가하기</Button>
    </Box>
    </Fragment>
  );
}
