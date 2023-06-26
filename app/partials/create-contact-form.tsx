"use client"

import React from "react"

import { Loader2 as Loader } from "lucide-react"
import { toast } from "react-hot-toast"

import { wait } from "@/lib/utils"
import { addContactValidation } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { addContactAction } from "../_actions"

export default function CreateContactForm() {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const phoneRef = React.useRef<HTMLInputElement>(null)

  const [nameError, setNameError] = React.useState<string | null>(null)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [phoneError, setPhoneError] = React.useState<string | null>(null)

  const [isPending, startTransition] = React.useTransition()

  const action = async (data: FormData) => {
    const name = data.get("name") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string

    startTransition(async () => {
      await wait(1000)
      await addContactAction(name, email, phone)
      await addContactValidation
        .validate({ name, email, phone }, { abortEarly: false })
        .then(async () => {
          nameRef.current!.value = ""
          emailRef.current!.value = ""
          phoneRef.current!.value = ""
          setEmailError(null)
          setNameError(null)
          setPhoneError(null)
          toast.success("Contact added successfully.")
        })
        .catch((errors) => {
          errors.inner.forEach((error: any) => {
            if (error.path === "name") {
              setNameError(error.message)
            } else if (error.path === "email") {
              setEmailError(error.message)
            } else if (error.path === "phone") {
              setPhoneError(error.message)
            }
          })
          toast.error("Failed to add contact.")
        })
    })
  }

  return (
    <form
      action={action}
      className="space-y-3"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <Input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          placeholder="Fullname"
          autoComplete="off"
          className="bg-zinc-100 my-1"
        />
        {nameError ? <p className="text-red-500 text-sm">{nameError}</p> : ""}
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
          className="bg-zinc-100 my-1"
        />
        {emailError ? <p className="text-red-500 text-sm">{emailError}</p> : ""}
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone">Phone</label>
        <Input
          ref={phoneRef}
          type="number"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          autoComplete="off"
          className="bg-zinc-100 my-1"
        />
        {phoneError ? <p className="text-red-500 text-sm">{phoneError}</p> : ""}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  )
}
