import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Select from "../common/Select";
import axios from "axios";
import Input from "../common/Input";

export default function CalendarModal({ 
  isOpen,
  onClose,
  eventDate,
  eventId,
  selectedStaff,
  setSelectedStaff,
  setEventDate,
  eventStartTime,
  eventEndTime,
  setEventStartTime,
  setEventEndTime,
  handleAddEvents,
  handleDeleteEvent
}: any) {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?company=${"PB"}`);
      if (response.data.code === 200) {
        const temp = response.data.data;
        const savedStaff: any = [];
        temp.forEach((t: any) => {
          savedStaff.push({
            key: t._id,
            value: t.name
          })
        })
        setStaffList(savedStaff)
      }

    }
    fetchData();
  }, [])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6 lg:p-10">
      <div className="max-x-[700px] p-6 lg:p-10">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl lg:text-2xl">
            {eventId ? "수정" : "추가"}
          </h5>
          <p className="text-sm text-gray-500">
            근무 시간을 등록하거나 수정해주세요.
          </p>
        </div>
        <div className="mt-8">
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              근로자 선택
            </label>
            <div className="relative">
              <Select
                options={staffList}
                placeholder="근로자를 선택해주세요."
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStaff(e.target.value)}
                selectedValue={selectedStaff}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="event-date" className="mb-1.5 block text-sm font-medium text-gray-700">
              날짜 선택
            </label>
            <div className="relative">
              <Input 
                id="event-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="event-start-time" className="mb-1.5 block text-sm font-medium text-gray-700">
              시작 시간
            </label>
            <div className="relative">
              <Input 
                id="event-start-time"
                type="time"
                value={eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="event-end-time" className="mb-1.5 block text-sm font-medium text-gray-700">
              종료 시간
            </label>
            <div className="relative">
              <Input 
                id="event-end-time"
                type="time"
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          {
            eventId && <button
            onClick={handleDeleteEvent}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            삭제
          </button>
          }
          <button
            onClick={() => handleAddEvents(selectedStaff)}
            type="button"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {eventId ? "수정" : "등록"}
          </button>
        </div>
      </div>
    </Modal>
  )
}