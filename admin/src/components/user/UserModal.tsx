import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { z } from 'zod';
import { Field, Form, Formik, FormikHelpers, FieldArray } from 'formik';
import { toFormikValidationSchema } from "zod-formik-adapter";

const FormValidator = z.object({
  username: z.string(),
  userrole: z.string(),
  userPhone: z.string(),
  userBirth: z.string(),
  bank: z.string(),
  bankaccount: z.string()
})
type FormStructure = z.infer<typeof FormValidator>;

const initialValues: FormStructure = {
  username: "",
  userrole: "",
  userPhone: "",
  userBirth: "",
  bank: "",
  bankaccount: ""
}

const validator = toFormikValidationSchema(FormValidator);

type OnSubmitCB<T> = (values: T, helpers: FormikHelpers<T>) => void;
const onSubmit: OnSubmitCB<typeof initialValues> = (values, { resetForm }) => {
  console.log(values);
  resetForm();
};


interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserModal({ open, setOpen }: ModalProps) {
  return (
    <Dialog open={false}>
      <DialogTitle>정보</DialogTitle>
      <DialogContent>
        <DialogContentText>
          사용자 정보
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
                  type="username"
                  label="사용자 이름"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  autoComplete="시간대"
                  type="userrole"
                  label="시간대"
                  {...getFieldProps('userrole')}
                  error={Boolean(touched.userrole && errors.userrole)}
                  helperText={touched.userrole && errors.userrole}
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
                  type="bank"
                  label="거래은행"
                  {...getFieldProps('bank')}
                  error={Boolean(touched.bank && errors.bank)}
                  helperText={touched.bank && errors.bank}
                />
                <TextField
                  fullWidth
                  autoComplete="계좌번호"
                  type="bankaccount"
                  label="계좌번호"
                  {...getFieldProps('bankaccount')}
                  error={Boolean(touched.bankaccount && errors.bankaccount)}
                  helperText={touched.bankaccount && errors.bankaccount}
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