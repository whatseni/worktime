import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, use, useContext, useEffect, useState } from "react";
import { CurrentAdminContext } from "../context/adminContext";
import { SelectUserType, UserListType } from "../../types/apiPayload";


interface SelectUserInputProps {
  setSelectUser: Dispatch<SetStateAction<SelectUserType | null>>;
}
export default function SelectUserInput({ setSelectUser }: SelectUserInputProps) {

  const [userList, setuserList] = useState<UserListType[]>([]);
  const [isMount, setIsMount] = useState<boolean>(true);
  const { currentCompany } = useContext(CurrentAdminContext);

  const handleuserList = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/get-alluser-name', {
        company: "PB"
      });
      if (isMount && response.data.data) {
        let userInfoList = response.data.data;
        userInfoList = userInfoList.map((userinfo: UserListType) => {
          return {
            ...userinfo,
            label: `${userinfo.userName} (${userinfo.userPhone})`,
          };
        });
        if (userInfoList.length > 0) {
          setuserList(userInfoList);
        }
      }
    } catch (e) {
      console.error(e)
    }
  };

  useEffect(() => {
    handleuserList();
  }, []);

  useEffect(() => {
    setIsMount(true);
    return () => setIsMount(false);
  })
  
  return (
    <Autocomplete 
      options={userList}
      renderInput={(params) => (
        <TextField
          {...params}
          label="선택"
          placeholder="근로자 선택"
         />
      )}
      onChange={(e: React.SyntheticEvent<Element, Event>, v:UserListType | null ) => {
        setSelectUser({userName: v?.userName, userPhone: v?.userPhone})
      }}
      />
  )
}