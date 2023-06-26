"use client"
import React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return (
    <Button
      size="sm"
      onClick={handleBack}
    >
      Back
    </Button>
  )
}
