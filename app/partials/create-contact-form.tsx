"use client"

import React from "react"
import { Loader2 as Loader } from "lucide-react"

import { wait } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { addContactAction } from "../_actions"

export default function CreateContactForm() {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const phoneRef = React.useRef<HTMLInputElement>(null)

  const [isPending, startTransition] = React.useTransition()

  const action = async (data: FormData) => {
    const name = data.get("name") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string

    if (!name || !email || !phone) {
      return
    }

    startTransition(async () => {
      await wait(1000)
      addContactAction(name, email, phone) as Promise<void>
    })

    // Reset form
    nameRef.current!.value = ""
    emailRef.current!.value = ""
    phoneRef.current!.value = ""
  }

  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <Input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          placeholder="Fullname"
          autoComplete="off"
          className="bg-zinc-100"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <Input
          ref={emailRef}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          className="bg-zinc-100"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone">Phone</label>
        <Input
          ref={phoneRef}
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          autoComplete="off"
          className="bg-zinc-100"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  )
}
