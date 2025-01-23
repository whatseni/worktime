import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { z } from 'zod';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from "zod-formik-adapter";
import { handleCreateOrUpdateUser } from "../../utils/api";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { CurrentAdminContext } from "../context/adminContext";
import { UsersDataType } from "../../types/apiPayload";

const FormValidator = z.object({
  userName: z.string(),
  userRole: z.string(),
  isWeek: z.boolean(),
  userPhone: z.string(),
  userBirth: z.string(),
  userBank: z.string(),
  userBankAccount: z.string()
})
type FormStructure = z.infer<typeof FormValidator>;

const defaultValues: FormStructure = {
  userName: "",
  userRole: "",
  isWeek: false,
  userPhone: "",
  userBirth: "",
  userBank: "",
  userBankAccount: ""
}

const validator = toFormikValidationSchema(FormValidator);

type OnSubmitCB<T> = (values: T, helpers: FormikHelpers<T>) => void;


interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  userData: UsersDataType | null;
  setSelectUser: Dispatch<SetStateAction<any>>;
}
export default function UserModal({ open, setOpen, userData, setSelectUser }: ModalProps) {

  const { currentCompany } = useContext(CurrentAdminContext);
  const [initialValues, setInitialValues] = useState<FormStructure>(defaultValues);

  useEffect(() => {
    if (userData) {
      setInitialValues(userData);
    } else {
      setInitialValues(defaultValues);
    }
  }, [userData, open]);

  const onSubmit: OnSubmitCB<typeof defaultValues> = (values, { resetForm }) => {
    setSelectUser(null);
    handleCreateOrUpdateUser({ ...values, id: userData?._id })
    resetForm();
    handleClose();
  };

  const handleClose = () => {
    setInitialValues(defaultValues);
    setSelectUser(null);
    setOpen(false); // 모달 닫기
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>정보</DialogTitle>
      <DialogContent sx={{ width: "400px" }}>
        <DialogContentText>
          사용자 정보 {userData ? "수정" : "삭제"}
        </DialogContentText>
        <br />
        <Formik
          enableReinitialize
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validator}>
          {
            ({ resetForm, handleSubmit, isValid, errors, touched, getFieldProps }) => (
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    autoComplete="사용자 이름"
                    type="userName"
                    label="사용자 이름"
                    {...getFieldProps('userName')}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                  <TextField
                    fullWidth
                    autoComplete="시간대"
                    type="userRole"
                    label="시간대"
                    {...getFieldProps('userRole')}
                    error={Boolean(touched.userRole && errors.userRole)}
                    helperText={touched.userRole && errors.userRole}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={getFieldProps("isWeek").value}
                        {...getFieldProps("isWeek")}
                        color="primary"
                      />
                    }
                    label="주휴 여부"
                  />
                  <TextField
                    fullWidth
                    autoComplete="전화번호"
                    type="userPhone"
                    label="전화번호"
                    {...getFieldProps('userPhone')}
                    error={Boolean(touched.userPhone && errors.userPhone)}
                    helperText={touched.userPhone && errors.userPhone}
                  />
                  <TextField
                    fullWidth
                    autoComplete="생년월일"
                    type="userBirth"
                    label="생년월일"
                    {...getFieldProps('userBirth')}
                    error={Boolean(touched.userBirth && errors.userBirth)}
                    helperText={touched.userBirth && errors.userBirth}
                  />
                  <TextField
                    fullWidth
                    autoComplete="거래은행"
                    type="userBank"
                    label="거래은행"
                    {...getFieldProps('userBank')}
                    error={Boolean(touched.userBank && errors.userBank)}
                    helperText={touched.userBank && errors.userBank}
                  />
                  <TextField
                    fullWidth
                    autoComplete="계좌번호"
                    type="userBankAccount"
                    label="계좌번호"
                    {...getFieldProps('userBankAccount')}
                    error={Boolean(touched.userBankAccount && errors.userBankAccount)}
                    helperText={touched.userBankAccount && errors.userBankAccount}
                  />
                </Stack>
                <br />
                <Button fullWidth size="large" type="submit" variant="contained">제출하기</Button>
              </Form>
            )
          }
        </Formik>
      </DialogContent>
    </Dialog>
  )
}