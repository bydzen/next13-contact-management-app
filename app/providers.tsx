"use client"

import { Toaster } from "react-hot-toast"

import { ComponentWithChildren } from "@/types/props"

import { RootProvider } from "./context"

export default function Providers({ children }: ComponentWithChildren) {
  return (
    <>
      <RootProvider>
        <Toaster position="top-center" />
        {children}
      </RootProvider>
    </>
  )
}
