import ContactItem from "@/partials/contact-item"
import { Contact } from "@prisma/client"

interface ContactListProps {
  contacts: Contact[]
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <ul className="space-y-4">
      {contacts.length == 0 ? (
        <p className="text-center py-7 text-gray-500">
          No one contact here, try add your first contact.
        </p>
      ) : null}
      {contacts?.map((contact) => (
        <ContactItem contact={contact} />
      ))}
    </ul>
  )
}
