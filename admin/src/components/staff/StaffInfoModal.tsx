import { useState } from "react";
import Modal from "../common/Modal";
import Radio from "../common/Radio";
import Switch from "../common/Switch";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  info: any;
}
export default function StaffInfoModal({ isOpen, closeModal, info = null }: ModalProps) {
  const [staffData, setStaffData] = useState(info ? info : {
    _id: "",
    name: "",
    birth: "",
    phone: "",
    bank: "",
    bankAccount: "",
    isWeek: false
  });

  const handleClick = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff`, {
      company: "PB",
      ...staffData
    })
    console.log(response);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
      <div className="max-x-[700px] p-6 lg:p-10">
        <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl lg:text-2xl">
          근로자
        </h5>
        <p className="text-sm text-gray-500">
          근로자 정보를 추가하거나 수정하세요.
        </p>
        </div>
        <div className="mt-8">
          <div className="mt-6">
            <label htmlFor="staff-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              이름 입력
            </label>
            <div className="relative">
              <input 
                id="staff-name"
                type="text"
                className="input__box"
                value={staffData.name}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    name: e.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-birth" className="mb-1.5 block text-sm font-medium text-gray-700">
              생년월일
            </label>
            <div className="relative">
              <input 
                id="staff-birth"
                type="date"
                className="input__box"
                value={staffData.birth}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    birth: e.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              핸드폰 번호
            </label>
            <div className="relative">
              <input 
                id="staff-phone"
                type="text"
                className="input__box"
                value={staffData.phone}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    phone: e.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-bank" className="mb-1.5 block text-sm font-medium text-gray-700">
              은행
            </label>
            <div className="relative">
              <input 
                id="staff-bank"
                type="text"
                className="input__box"
                value={staffData.bank}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    bank: e.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-bankA" className="mb-1.5 block text-sm font-medium text-gray-700">
              계좌번호
            </label>
            <div className="relative">
              <input 
                id="staff-bankA"
                type="text"
                className="input__box"
                value={staffData.bankAccount}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    bankAccount: e.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-time" className="mb-1.5 block text-sm font-medium text-gray-700">
              근무 시간대
            </label>
            <div className="relative flex">
              <Radio id="Mon" name="Mon" value="0" checked={false} onChange={() => {}} label="월"/>
              <Radio id="Tue" name="Tue" value="0" checked={false} onChange={() => {}} label="화"/>
              <Radio id="Wed" name="Wed" value="0" checked={false} onChange={() => {}} label="수"/>
              <Radio id="Thu" name="Thu" value="0" checked={false} onChange={() => {}} label="목"/>
              <Radio id="Fri" name="Fri" value="0" checked={false} onChange={() => {}} label="금"/>
              <Radio id="Sat" name="Sat" value="0" checked={false} onChange={() => {}} label="토"/>
              <Radio id="Sun" name="Sun" value="0" checked={false} onChange={() => {}} label="일"/>
            </div>
          </div>

          <div className="mt-6 flex">
            <div className="mr-10">
              <label htmlFor="event-start-time" className="mb-1.5 block text-sm font-medium text-gray-700">
                시작 시간
              </label>
              <div className="relative">
                <input 
                  id="event-start-time"
                  type="time"
                  onChange={() => {}}
                  className="input__box"
                />
              </div>
            </div>
            <div>
              <label htmlFor="event-start-time" className="mb-1.5 block text-sm font-medium text-gray-700">
                종료 시간
              </label>
              <div className="relative">
                <input 
                  id="event-start-time"
                  type="time"
                  onChange={() => {}}
                  className="input__box"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Switch 
              label="주휴 수당"
              defaultChecked={staffData.isWeek}
              onChange={(checked) => {
                setStaffData((prev: any) => ({
                  ...prev,
                  isWeek: checked
                }))
              }}
            />
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
            onClick={handleClick}
            type="button"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            등록
          </button>
        </div>
      </div>
    </Modal>
  )
}