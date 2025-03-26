
import Calendar from "@/src/components/Calendar";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function Main() {
  return (
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  )
}