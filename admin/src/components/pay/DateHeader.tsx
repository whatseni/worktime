export default function DateHeader({ year, month, handlePrev, handleNext }: any) {
  return (
    <div className="fc-button-group flex m-5">
      <button className="fc-prev-button fc-button fc-button-primary" onClick={handlePrev}>
        <span className="fc-icon fc-icon-chevron-left" role="img"></span>
      </button>
      <span className="text-gray-800 text-lg flex items-center">{year}년 {month}월</span>
      <button className="fc-next-button fc-button fc-button-primary" onClick={handleNext}>
        <span className="fc-icon fc-icon-chevron-right" role="img"></span>
      </button>
    </div>
  )
}