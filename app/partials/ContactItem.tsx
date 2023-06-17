"use client"

import React from "react"
import { Contact } from "@prisma/client"
import { Loader2 as Loader } from "lucide-react"

import { Button } from "@/components/ui/button"

import { removeContactAction } from "../_actions"

interface ContactItemProps {
  contact: Contact
}
export default function ContactItem({ contact }: ContactItemProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <li
      key={contact.id}
      className="flex justify-between items-center hover:bg-zinc-100 p-4 rounded-md border"
    >
      <section>
        <h1 className="font-bold text-lg">{contact.name}</h1>
        <p className="font-light text-lg">{contact.email}</p>
      </section>
      <section className="flex justify-center items-center gap-2">
        <Button size="sm" variant="outline">
          Detail
        </Button>
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => startTransition(() => removeContactAction(contact.id))}
        >
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Removing..." : "Remove"}
        </Button>
      </section>
    </li>
  )
}
