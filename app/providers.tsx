"use client"

import { Toaster } from "react-hot-toast"

import { ComponentWithChildren } from "@/types/props"

export default function Providers({ children }: ComponentWithChildren) {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  )
}
