import { Contact } from "@prisma/client"

import { getContact } from "@/lib/contacts"

import BackButton from "./partials/back-button"
import UpdateContactForm from "./partials/update-contact-form"

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
            <BackButton />
          </div>
          <div className="py-4">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="text-gray-500">Name </td>
                  <td className="text-gray-500 px-3">: </td>
                  <td>{contact?.name}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Email </td>
                  <td className="text-gray-500 px-3">: </td>
                  <td>{contact?.email}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Phone </td>
                  <td className="text-gray-500 px-3">: </td>
                  <td>{contact?.phone}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Created </td>
                  <td className="text-gray-500 px-3">: </td>
                  <td>
                    {contact?.createdAt.toLocaleDateString([], {
                      dateStyle: "long",
                    })}{" "}
                    @{" "}
                    {contact?.createdAt.toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-500">Last Updated </td>
                  <td className="text-gray-500 px-3">: </td>
                  <td>
                    {contact?.updatedAt.toLocaleDateString([], {
                      dateStyle: "long",
                    })}{" "}
                    @{" "}
                    {contact?.updatedAt.toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
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
