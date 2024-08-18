import { Helmet } from "react-helmet-async";
import UserListTable from "../components/UserListTable";

export default function Users() {
  return (
    <>
    <Helmet>
      <title>근무자 정보 테이블 | 관리자용</title>
    </Helmet>
    <UserListTable/>
  </>
  )
}