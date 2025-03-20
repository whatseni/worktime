export default function Modal({ isOpen, closeModal, selectedEvent }: any) {
  return (
    <div className="max-x-[700px] p-6 lg:p-10">
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl lg:text-2xl">
          {selectedEvent ? "수정" : "추가"}
        </h5>
        <p className="text-sm text-gray-500">
          test test test stese
        </p>
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            date
          </label>
          <div className="relative">
            <input 
              id="event-date"
              type="date"

              className="input__box"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            start time
          </label>
          <div className="relative">
            <input 
              id="event-start-time"
              type="time"

              className="input__box"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            end time
          </label>
          <div className="relative">
            <input 
              id="event-end-time"
              type="time"

              className="input__box"
            />
          </div>
        </div>
      </div>
    </div>
  )
}