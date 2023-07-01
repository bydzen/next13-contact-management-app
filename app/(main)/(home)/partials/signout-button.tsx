"use client"

import React from "react"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SignoutButton() {
  const handleSignout = () => {
    signOut({ callbackUrl: "/signin" })
  }

  return <Button onClick={handleSignout}>Signout</Button>
}
