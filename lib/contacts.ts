import { Contact } from "@prisma/client"

import prisma from "./prisma"

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

export async function addContact(name: string, email: string, phone: string) {
  try {
    const contact = await prisma.contact.create({
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
