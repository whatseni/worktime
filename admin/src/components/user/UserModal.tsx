import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { z } from 'zod';
import { Field, Form, Formik, FormikHelpers, FieldArray } from 'formik';
import { toFormikValidationSchema } from "zod-formik-adapter";
import { handleCreateUser } from "../../utils/api";

const FormValidator = z.object({
  userName: z.string(),
  userRole: z.string(),
  isWeek: z.boolean(),
  userPhone: z.string(),
  userBirth: z.string(),
  bank: z.string(),
  bankAccount: z.string()
})
type FormStructure = z.infer<typeof FormValidator>;

const initialValues: FormStructure = {
  userName: "",
  userRole: "",
  isWeek: false,
  userPhone: "",
  userBirth: "",
  bank: "",
  bankAccount: ""
}

const validator = toFormikValidationSchema(FormValidator);

type OnSubmitCB<T> = (values: T, helpers: FormikHelpers<T>) => void;
const onSubmit: OnSubmitCB<typeof initialValues> = (values, { resetForm }) => {
  console.log(values);
  handleCreateUser({...values})
  resetForm();
};


interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
}
export default function UserModal({ open, setOpen, userData }: ModalProps) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>정보</DialogTitle>
      <DialogContent sx={{ width: "400px"}}>
        <DialogContentText>
          사용자 정보 {userData ? "수정" : "삭제"}
        </DialogContentText>
        <br/>
        <Formik onSubmit={onSubmit}
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
                  defaultValue={userData && userData.userName}
                  {...getFieldProps('userName')}
                  error={Boolean(touched.userName && errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
                <TextField
                  fullWidth
                  autoComplete="시간대"
                  type="userRole"
                  label="시간대"
                  defaultValue={userData && userData.userName}
                  {...getFieldProps('userRole')}
                  error={Boolean(touched.userRole && errors.userRole)}
                  helperText={touched.userRole && errors.userRole}
                />
                <FormControlLabel
                  control={
                    <Switch
                    defaultChecked={userData && userData.isWeek}
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
                  defaultValue={userData && userData.userPhone}
                  {...getFieldProps('userPhone')}
                  error={Boolean(touched.userPhone && errors.userPhone)}
                  helperText={touched.userPhone && errors.userPhone}
                />
                <TextField
                  fullWidth
                  autoComplete="생년월일"
                  type="userBirth"
                  label="생년월일"
                  defaultValue={userData && userData.userBirth}
                  {...getFieldProps('userBirth')}
                  error={Boolean(touched.userBirth && errors.userBirth)}
                  helperText={touched.userBirth && errors.userBirth}
                />
                <TextField
                  fullWidth
                  autoComplete="거래은행"
                  type="bank"
                  label="거래은행"
                  defaultValue={userData && userData.userBank}
                  {...getFieldProps('bank')}
                  error={Boolean(touched.bank && errors.bank)}
                  helperText={touched.bank && errors.bank}
                />
                <TextField
                  fullWidth
                  autoComplete="계좌번호"
                  type="bankAccount"
                  label="계좌번호"
                  defaultValue={userData && userData.userBankAccount}
                  {...getFieldProps('bankAccount')}
                  error={Boolean(touched.bankAccount && errors.bankAccount)}
                  helperText={touched.bankAccount && errors.bankAccount}
                />
                </Stack>
                <br/>
                <Button fullWidth size="large" type="submit" variant="contained">제출하기</Button>
              </Form>
            )
          }
        </Formik>
      </DialogContent>
    </Dialog>
  )
}