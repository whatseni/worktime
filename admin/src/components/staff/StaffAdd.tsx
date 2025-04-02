"use client"

import { useState } from "react";
import StaffInfoModal from "./StaffInfoModal";

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
      <StaffInfoModal isOpen={isOpen} closeModal={closeModal} info={null}/>
    </div>
  )
}