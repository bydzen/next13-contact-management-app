import prisma from "./prisma"
import { addContactValidation } from "./validation"

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
    const validContact = await addContactValidation.validate({
      name,
      email,
      phone,
    })

    const countEmail = await prisma.contact.count({
      where: {
        email: validContact.email,
      },
    })

    const countPhone = await prisma.contact.count({
      where: {
        phone: validContact.phone,
      },
    })

    if (countEmail > 0) throw new Error("Email already exists")

    if (countPhone > 0) throw new Error("Phone already exists")

    const contact = await prisma.contact.create({
      data: {
        name: validContact.name,
        email: validContact.email,
        phone: validContact.phone,
      },
    })

    return { contact }
  } catch (error) {
    return { error }
  }
}

export const updateContact = async (
  id: string,
  name: string,
  email: string,
  phone: string
) => {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        email,
        phone,
      },
    })
    return { contact }
  } catch (error) {
    return { error }
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
