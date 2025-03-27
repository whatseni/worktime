import PushNotificationManager from "@/src/components/PushNotificationManger";


export default function Manage() {
  return (
    <div className="">
      <div>설정</div>
      <div>비밀번호 변경</div>
      <div>알림 설정</div>
      <PushNotificationManager />
    </div>
  );
}
