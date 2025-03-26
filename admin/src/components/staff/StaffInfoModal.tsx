import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Radio from "../common/Radio";
import Switch from "../common/Switch";
import axios from "axios";
import Input from "../common/Input";
import Select from "../common/Select";
import { BANK_LIST } from "@/src/lib/bankList";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  info: any;
}
export default function StaffInfoModal({ isOpen, closeModal, info }: ModalProps) {
  
  const [staffData, setStaffData] = useState<any>({
    _id: "",
    name: "",
    birth: "",
    phone: "",
    bank: "",
    bankAccount: "",
    workDay: [],
    startTime: "",
    endTime: "",
    isWeek: false
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    if (info) {
      setStaffData(info);
    }
  }, [info]);

  const handleDayChange = (day: string) => {
    setStaffData((prev: any) => {
      const workDay = prev.workDay.includes(day)
        ? prev.workDay.filter((d: string) => d !== day)
        : [...prev.workDay, day];
      return { ...prev, workDay };
    });
  };

  const handleBlurPhone = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidPhone = /^010-[0-9]{4}-[0-9]{4}$/.test(value);
    
    setError(!isValidPhone);
  
    if (isValidPhone) {
      setStaffData((prev: any) => ({
        ...prev,
        phone: value
      }));
    }
  };

  const handleClick = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?id=${staffData._id}`, {
      company: "PB",
      name: staffData.name,
      birth: staffData.birth,
      phone: staffData.phone,
      bank: staffData.bank,
      bankAccount: staffData.bankAccount,
      workDay: staffData.workDay,
      startTime: staffData.startTime,
      endTime: staffData.endTime,
      isWeek: false
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
              <Input 
                id="staff-name"
                type="text"
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
              <Input 
                id="staff-birth"
                type="date"
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
              <Input 
                id="staff-phone"
                type="text"
                placeholder="010-****-****"
                error={error}
                value={staffData.phone}
                onBlur={handleBlurPhone}
                onChange={(e) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    phone: e.target.value
                  }))
                }}
                hint={error ? "핸드폰 번호 형식을 맞춰주세요." : ""}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-bank" className="mb-1.5 block text-sm font-medium text-gray-700">
              은행
            </label>
            <div className="relative">
              <Select 
                options={BANK_LIST}
                placeholder="은행을 선택해주세요."
                onChange={(e: any) => {
                  setStaffData((prev: any) => ({
                    ...prev,
                    bank: e.target.value
                  }))
                }}
                selectedValue={staffData.bank}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="staff-bankA" className="mb-1.5 block text-sm font-medium text-gray-700">
              계좌번호
            </label>
            <div className="relative">
              <Input 
                id="staff-bankA"
                type="text"
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
              <Radio id="Mon" name="Mon" value="0" checked={staffData.workDay.includes("Mon")} 
                onChange={() => handleDayChange("Mon")} label="월"/>
              <Radio id="Tue" name="Tue" value="1" checked={staffData.workDay.includes("Tue")} 
                onChange={() => handleDayChange("Tue")} label="화"/>
              <Radio id="Wed" name="Wed" value="2" checked={staffData.workDay.includes("Wed")} 
                onChange={() => handleDayChange("Wed")} label="수"/>
              <Radio id="Thu" name="Thu" value="3" checked={staffData.workDay.includes("Thu")} 
                onChange={() => handleDayChange("Thu")} label="목"/>
              <Radio id="Fri" name="Fri" value="4" checked={staffData.workDay.includes("Fri")} 
                onChange={() => handleDayChange("Fri")} label="금"/>
              <Radio id="Sat" name="Sat" value="5" checked={staffData.workDay.includes("Sat")} 
                onChange={() => handleDayChange("Sat")} label="토"/>
              <Radio id="Sun" name="Sun" value="6" checked={staffData.workDay.includes("Sun")} 
                onChange={() => handleDayChange("Sun")} label="일"/>
            </div>
          </div>

          <div className="mt-6 flex">
            <div className="mr-10">
              <label htmlFor="event-start-time" className="mb-1.5 block text-sm font-medium text-gray-700">
                시작 시간
              </label>
              <div className="relative">
                <Input 
                  id="event-start-time"
                  type="time"
                  value={staffData.startTime}
                  onChange={(e) => {
                    setStaffData((prev: any) => ({
                      ...prev,
                      startTime: e.target.value
                    }))
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="event-start-time" className="mb-1.5 block text-sm font-medium text-gray-700">
                종료 시간
              </label>
              <div className="relative">
                <Input 
                  id="event-start-time"
                  type="time"
                  value={staffData.endTime}
                  onChange={(e) => {
                    setStaffData((prev: any) => ({
                      ...prev,
                      endTime: e.target.value
                    }))
                  }}
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
            disabled={error ? true : false}
            className={`${error ? "bg-brand-100": "bg-brand-500 hover:bg-brand-600"} btn btn-success btn-update-event flex w-full justify-center rounded-lg  px-4 py-2.5 text-sm font-medium text-white sm:w-auto`}
          >
            {info ? "수정" : "등록"}
          </button>
        </div>
      </div>
    </Modal>
  )
}