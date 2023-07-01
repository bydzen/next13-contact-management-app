"use client"

import React from "react"
import Link from "next/link"

import { Contact } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { rootContext } from "@/app/context"

interface ContactItemProps {
  contact: Contact
}
export default function ContactItem({ contact }: ContactItemProps) {
  const { handleChangeShowRemoveContactPopup, handleSetId } =
    React.useContext(rootContext)

  const handleRemove = () => {
    handleSetId(contact.id)
    handleChangeShowRemoveContactPopup(true)
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
          <Button
            size="sm"
            variant="outline"
          >
            Detail
          </Button>
        </Link>
        <Button
          size="sm"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </section>
    </li>
  )
}
