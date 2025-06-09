import { useState } from "react";
import Input from "./common/Input";
import Modal from "./common/Modal";
import axios from "axios";
import { useSession } from "@/context/LoginContext";
import { toast } from "react-toastify";

interface ChangeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
export default function ChangeModal({ isOpen, closeModal }: ChangeModalProps) {

  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { getId } = useSession();

  const handleChangePassword = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/manage/pw`, {
      id: getId(),
      password: ""
    });
    if (response.data.code === 200) {
      closeModal();
      toast.success("비밀번호 변경 성공");
    } else {
      toast.error("요청 실패. 확인 바람.")
    }
  }

  const handleBlurPw = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidPw = password === passwordCheck;
    setError(!isValidPw);
    if (isValidPw) {
      setPasswordCheck(value);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
      <div className="max-x-[500px] p-6 lg:p-10">
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl lg:text-2xl">
          비밀번호 변경
        </h5>

        <div className="mt-8">
          <div className="mt-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              비밀번호 입력
            </label>
            <div className="relative">
              <Input 
                id="password"
                type="password"
                placeholder="******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="password_check" className="mb-1.5 block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <div className="relative">
              <Input 
                id="password_check"
                type="password"
                placeholder="******"
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
                onBlur={handleBlurPw}
                error={error}
                hint={error ? "비밀번호가 일치하지 않습니다." : ""}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            닫기
          </button>
          <button
            onClick={handleChangePassword}
            type="button"
            disabled={error ? true : false}
            className={`${error ? "bg-brand-100": "bg-brand-500 hover:bg-brand-600"} btn btn-success btn-update-event flex w-full justify-center rounded-lg  px-4 py-2.5 text-sm font-medium text-white sm:w-auto`}
          >
            변경
          </button>
        </div>
      </div>
    </Modal>
  )
}