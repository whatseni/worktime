import { ToastContainer } from "react-toastify";
import { AdminProvider } from "../context/AdminContext";
import { SidebarProvider } from "../context/SidebarContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer
            position="bottom-right"
            autoClose={1000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          </SidebarProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
