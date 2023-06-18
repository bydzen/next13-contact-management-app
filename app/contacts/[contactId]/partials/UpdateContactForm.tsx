"use client"

import React from "react"
import { Contact } from "@prisma/client"
import { Loader2 as Loader } from "lucide-react"
import { toast } from "react-hot-toast"

import { wait } from "@/lib/utils"
import { updateContactValidation } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateContactAction } from "@/app/_actions"

interface UpdateContactFormProps {
  contact: Contact
}

export default function UpdateContactForm({ contact }: UpdateContactFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const [nameError, setNameError] = React.useState<string | null>(null)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [phoneError, setPhoneError] = React.useState<string | null>(null)

  const action = async (data: FormData) => {
    const name = data.get("name") as string
    const email = data.get("email") as string
    const phone = data.get("phone") as string

    startTransition(async () => {
      await wait(1000)
      await updateContactAction(contact.id, name, email, phone)
      await updateContactValidation
        .validate({ name, email, phone }, { abortEarly: false })
        .then(async () => {
          setEmailError(null)
          setNameError(null)
          setPhoneError(null)
          toast.success("Contact updated successfully.")
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
          toast.error("Failed to update contact.")
        })
    })
  }

  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Fullname"
          autoComplete="off"
          defaultValue={contact.name}
          className="bg-zinc-100"
          autoFocus
        />
        {nameError ? <p className="text-red-500 text-sm">{nameError}</p> : ""}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          defaultValue={contact.email}
          className="bg-zinc-100"
        />
        {emailError ? <p className="text-red-500 text-sm">{emailError}</p> : ""}
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone">Phone</label>
        <Input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          autoComplete="off"
          defaultValue={contact.phone}
          className="bg-zinc-100"
        />
        {phoneError ? <p className="text-red-500 text-sm">{phoneError}</p> : ""}
      </div>
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  )
}
