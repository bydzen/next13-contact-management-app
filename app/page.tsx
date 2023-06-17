import ContactList from "@/partials/ContactList"
import CreateContactForm from "@/partials/CreateContactForm"
import { Contact } from "@prisma/client"

import { getContacts } from "@/lib/contacts"

import ContactListPagination from "./partials/ContactListPagination"
import SearchContactForm from "./partials/SearchContactForm"

export default async function HomePage() {
  const { contacts } = await getContacts()

  return (
    <div className="container py-10">
      <header>
        <h1 className="text-center font-bold text-3xl">Contact Management</h1>
      </header>
      <main className="grid grid-cols-7 gap-8 mt-8">
        <section className="w-full col-span-5 ">
          <div className="bg-white p-8 shadow-md rounded-md space-y-2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Contact List</h2>
              <SearchContactForm />
            </div>
            <ContactList contacts={contacts as Contact[]} />
            <ContactListPagination />
          </div>
        </section>
        <section className="col-span-2 ">
          <div className="bg-white p-8 shadow-md rounded-md space-y-2">
            <h2 className="text-xl font-bold">Add Contact</h2>
            <CreateContactForm />
          </div>
        </section>
      </main>
    </div>
  )
}
