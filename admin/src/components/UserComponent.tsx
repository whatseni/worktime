
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Checkbox, Button, Box } from '@mui/material';
import UserToolbar from './user/UserToolbar';
import { Fragment, useEffect, useState } from 'react';
import UserModal from './user/UserModal';
import { handleDeleteUsers, handleGetAllUser } from '../utils/api';
import { toast } from 'react-toastify';
import { UsersDataType } from '../types/apiPayload';


export default function UserComponent() {
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<UsersDataType[]>([]);
  const [selectUser, setSelectUser] = useState<UsersDataType | null>(null);


  const handleClickUser = (data: any) => {
    setModalOpen(true);
    setSelectUser(data);
  }
  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      setSelected(usersData.map((user: any) => user._id));
    } else {
      setSelected([]);
    }
  }
  const handleSelect = (event: any, id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onClickDeleteUser = async () => {
    try {
      const result = await handleDeleteUsers(selected);
      if (result) toast.success("삭제 성공!")
    } catch (error) {
      toast.error("삭제 실패...")
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleGetAllUser({ company: 'PB' })
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
      <Card sx={{ margin: "20px" }}>
        <UserModal open={modalOpen} setOpen={setModalOpen} userData={selectUser} setSelectUser={setSelectUser} />
        <UserToolbar numSelected={selected} onClickDeleteUser={onClickDeleteUser}/>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox 
                  indeterminate={selected.length > 0 && selected.length < usersData.length}
                  checked={usersData.length > 0 && selected.length === usersData.length}
                  onChange={handleSelectAll}
                  />
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
                usersData && usersData.map((data: UsersDataType) => {
                  const isItemSelected = selected && selected.indexOf(data._id) !== -1;
                  return (
                  <TableRow key={data._id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                      checked={isItemSelected}
                      onChange={(event: any) => handleSelect(event, data._id)}
                      />
                    </TableCell>
                    <TableCell onClick={() => handleClickUser(data)}>{data.userName}</TableCell>
                    <TableCell>{data.userRole}</TableCell>
                    <TableCell>
                      <Checkbox checked={data.isWeek} />
                    </TableCell>
                    <TableCell>{data.userPhone}</TableCell>
                    <TableCell>{data.userBirth}</TableCell>
                    <TableCell>{data.userBank}</TableCell>
                    <TableCell>{data.userBankAccount}</TableCell>
                  </TableRow>
                )})
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
        <Button variant='contained' onClick={() => setModalOpen(true)}>추가하기</Button>
      </Box>
    </Fragment>
  );
}
