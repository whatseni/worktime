import { AdminProvider } from "../context/AdminContext";
import { SidebarProvider } from "../context/SidebarContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AdminProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
