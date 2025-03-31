"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "../context/LoginContext";

const queryClient = new QueryClient();

interface Props {
  children?: React.ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
      </UserProvider>
    </QueryClientProvider>
  )
}