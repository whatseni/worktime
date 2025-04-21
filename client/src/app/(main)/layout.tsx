import AppHeader from "@/components/AppHeader"
import ProtectedRoute from "@/components/ProtectedRoute"


export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <AppHeader/>
      <div>{children}</div>
    </ProtectedRoute>
  )
}