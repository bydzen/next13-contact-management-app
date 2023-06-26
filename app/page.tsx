import Image from "next/image"
import { redirect } from "next/navigation"

import ContactList from "@/partials/contact-list"
import CreateContactForm from "@/partials/create-contact-form"
import { Contact } from "@prisma/client"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { getContacts } from "@/lib/contacts"

import ContactListPagination from "./partials/contact-list-pagination"
import SearchContactForm from "./partials/search-contact-form"
import SignoutButton from "./partials/signout-button"

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
          <div className="bg-white p-8 shadow-md rounded-md space-y-2">
            <div className="flex justify-between pb-4">
              <h2 className="text-xl font-bold">Contact List</h2>
              <div className="absolute -top-[100px] -right-[430px] flex justify-between items-center gap-2">
                <Image
                  src={session.user?.image!}
                  width="50"
                  height="50"
                  alt={session.user?.email!}
                />
                <h1>{session.user?.name}</h1>
                <SignoutButton />
              </div>
              <SearchContactForm />
            </div>
            <ContactList contacts={contacts as Contact[]} />
            <ContactListPagination />
          </div>
        </section>
        <section className="col-span-2 ">
          <div className="bg-white p-8 shadow-md rounded-md space-y-2">
            <h2 className="text-xl font-bold">Add Contact</h2>
            <CreateContactForm emailUser={session.user?.email!} />
          </div>
        </section>
      </main>
    </>
  )
}
