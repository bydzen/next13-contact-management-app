"use server"

import { revalidatePath } from "next/cache"

import { addContact, removeContact, updateContact } from "@/lib/contacts"

export const addContactAction = async (
  name: string,
  email: string,
  phone: string
) => {
  const { error } = await addContact(name, email, phone)

  revalidatePath("/")
  return { error }
}

export const updateContactAction = async (
  id: string,
  name: string,
  email: string,
  phone: string
) => {
  await updateContact(id, name, email, phone)
  revalidatePath(`/contacts/${id}`)
}

export const removeContactAction = async (id: string) => {
  await removeContact(id)
  revalidatePath("/")
}
