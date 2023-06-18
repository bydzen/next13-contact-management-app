import prisma from "./prisma"
import { addContactValidation, updateContactValidation } from "./validation"

export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return { contacts }
  } catch (error) {
    return { error }
  }
}

export const getContact = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    })
    return { contact }
  } catch (error) {
    return { error }
  }
}

export async function addContact(name: string, email: string, phone: string) {
  try {
    const validContact = await addContactValidation.isValid({
      email,
      name,
      phone,
    })

    if (!validContact) return

    const countEmail = await prisma.contact.count({
      where: { email },
    })

    const countPhone = await prisma.contact.count({
      where: {
        phone,
      },
    })

    if (countEmail > 0) throw new Error("Email already exists")

    if (countPhone > 0) throw new Error("Phone already exists")

    const contact = await prisma.contact.create({
      data: { name, email, phone },
    })
    return { contact, error: null }
  } catch (error) {
    return { contact: null, error }
  }
}

export const updateContact = async (
  id: string,
  name: string,
  email: string,
  phone: string
) => {
  const validContact = await updateContactValidation.isValid({
    email,
    name,
    phone,
  })

  if (!validContact) return

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        email,
        phone,
      },
    })
    return { contact, error: null }
  } catch (error) {
    return { contact: null, error }
  }
}

export async function removeContact(id: string) {
  try {
    const contact = await prisma.contact.delete({
      where: { id },
    })
    return { contact }
  } catch (error) {
    return { error }
  }
}
