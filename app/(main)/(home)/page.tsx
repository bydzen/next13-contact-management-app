import Image from "next/image"
import { redirect } from "next/navigation"

import { Contact } from "@prisma/client"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { getContacts } from "@/lib/contacts"

import ContactList from "./partials/contact-list"
import ContactListPagination from "./partials/contact-list-pagination"
import CreateContactForm from "./partials/create-contact-form"
import SearchContactForm from "./partials/search-contact-form"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const { contacts } = await getContacts(session?.user?.email! as string)

  if (!session) {
    redirect("/signin")
  }

  return (
    <>
      <main className="grid grid-cols-7 gap-8 mt-8">
        <section className="w-full col-span-5 ">
          <div className="p-8 space-y-2 bg-white rounded-md shadow-md">
            <div className="flex justify-between pb-4">
              <h2 className="text-xl font-bold">Contact List</h2>
              <SearchContactForm />
            </div>
            <ContactList contacts={contacts as Contact[]} />
            <ContactListPagination />
          </div>
        </section>
        <section className="col-span-2 ">
          <div className="p-8 space-y-2 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold">Add Contact</h2>
            <CreateContactForm emailUser={session.user?.email!} />
          </div>
        </section>
      </main>
    </>
  )
}
