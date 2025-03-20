import { SidebarProvider } from "../_context/SidebarContext";
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
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
