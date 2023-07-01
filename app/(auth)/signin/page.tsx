"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SigninPage() {
  const handleSignin = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="w-full p-8 flex justify-center">
      <main className="bg-white rounded-md shadow-md w-[420px] h-full p-8">
        <Button onClick={handleSignin}>Signin With Google</Button>
      </main>
    </div>
  )
}
