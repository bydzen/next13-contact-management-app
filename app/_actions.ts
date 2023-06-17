"use server"

import { revalidatePath } from "next/cache"

import { addContact, removeContact } from "@/lib/contacts"

export const addContactAction = async (
  name: string,
  email: string,
  phone: string
) => {
  await addContact(name, email, phone)
  revalidatePath("")
}

export const removeContactAction = async (id: string) => {
  await removeContact(id)
  revalidatePath("")
}
