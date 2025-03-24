"use client"

import { useState } from "react";
import Modal from "../common/Modal";

export default function StaffAdd() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="mb-4">
      <button
        className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
        onClick={openModal}
      >추가</button>
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
              onClick={() => {}}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {"등록"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}