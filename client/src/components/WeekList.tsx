"use client"

import Input from "./common/Input"

const renderItems = () => {
  return (
    <></>
  )
}
export default function WeekList() {
  return (
    <div>
      <div className="fc-button-group flex m-5">
        <button className="fc-prev-button fc-button fc-button-primary" onClick={() => {}}>
          <span className="fc-icon fc-icon-chevron-left" role="img"></span>
        </button>
        <span className="text-gray-800 text-lg flex items-center">3월 1주</span>
        <button className="fc-next-button fc-button fc-button-primary" onClick={() => {}}>
          <span className="fc-icon fc-icon-chevron-right" role="img"></span>
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white sm:w-fit">
        <ul className="flex flex-col">
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>월</span>
            <Input />
          </li>
          <li className="flex items-center gap-2  px-3 py-2.5 text-sm text-gray-500 ">
            <span>화</span>
            <Input />
          </li>
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>수</span>
            <Input />
          </li>
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>목</span>
            <Input />
          </li>
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>금</span>
            <Input />
          </li>
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>토</span>
            <Input />
          </li>
          <li className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <span>일</span>
            <Input />
          </li>
        </ul>
      </div>
    </div>
  )
}