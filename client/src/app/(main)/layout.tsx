import AppHeader from "@/src/components/AppHeader"

export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <AppHeader/>
      <div>{children}</div>
    </div>
  )
}