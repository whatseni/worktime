/**
 * Calendar Component의 Props
 */
export type Event = {
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * Calendar 에 넘겨야 할 Props들
 * onChangeMonth : 월 변경하는 메소드 (년도와 월 인자로 넘겨줘야함)
 * events: 각 날짜에 맞는 이벤트들 목록
 * onClickDate : 날짜 클릭
 * onClickEvent : 이벤트 클릭
 */
export interface CalendarPropsType {
  onClickDate: (date: string) => void;
  events: Event[] | null;
  onChangeMonth: (year: number, month: number) => void;
  onClickEvent: (event: Event) => void;
}