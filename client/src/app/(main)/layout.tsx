import AppHeader from "@/src/components/AppHeader"
import ProtectedRoute from "@/src/components/ProtectedRoute"

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