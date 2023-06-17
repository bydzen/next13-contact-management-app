import ContactItem from "@/partials/ContactItem"
import { Contact } from "@prisma/client"

interface ContactListProps {
  contacts: Contact[]
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <ul className="space-y-4">
      {contacts.map((contact) => (
        <ContactItem contact={contact} />
      ))}
    </ul>
  )
}
