"use client"

import React from "react"
import Link from "next/link"
import { Contact } from "@prisma/client"
import { Loader2 as Loader } from "lucide-react"

import { wait } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { removeContactAction } from "../_actions"

interface ContactItemProps {
  contact: Contact
}
export default function ContactItem({ contact }: ContactItemProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleRemove = () => {
    startTransition(async () => {
      await wait(1000)
      removeContactAction(contact.id) as Promise<void>
    })
  }

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
        <Link href={`/contacts/${contact.id}`}>
          <Button size="sm" variant="outline">
            Detail
          </Button>
        </Link>
        <Button size="sm" disabled={isPending} onClick={handleRemove}>
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Removing..." : "Remove"}
        </Button>
      </section>
    </li>
  )
}
