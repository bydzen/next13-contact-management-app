import Link from "next/link"
import { Contact } from "@prisma/client"

import { getContact } from "@/lib/contacts"
import { Button } from "@/components/ui/button"

import UpdateContactForm from "./partials/UpdateContactForm"

interface ContactPageProps {
  params: {
    contactId: string
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { contact } = await getContact(params.contactId)

  return (
    <main className="grid grid-cols-7 gap-8 mt-8">
      <section className="w-full col-span-5 ">
        <div className="bg-white p-8 shadow-md rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Contact Detail</h1>
            <Link href="/">
              <Button size="sm">Back</Button>
            </Link>
          </div>
          <div className="py-4">
            <p>Name : {contact?.name}</p>
            <p>Email : {contact?.email}</p>
            <p>Phone : {contact?.phone}</p>
            <p>
              Created : {contact?.createdAt.toLocaleDateString()} -{" "}
              {contact?.createdAt.toLocaleTimeString()}
            </p>
            <p>
              Updated : {contact?.updatedAt.toLocaleDateString()} -{" "}
              {contact?.updatedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </section>
      <section className="col-span-2 ">
        <div className="bg-white p-8 shadow-md rounded-md space-y-2">
          <h2 className="text-xl font-bold">Update Contact</h2>
          <UpdateContactForm contact={contact as Contact} />
        </div>
      </section>
    </main>
  )
}
