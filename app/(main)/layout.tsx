import React from "react"
import Image from "next/image"

import { getServerSession } from "next-auth"

import { ComponentWithChildren } from "@/types/props"
import { authOptions } from "@/lib/auth"
import { Header } from "@/components/header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import RemoveContactPopup from "./(home)/partials/remove-contact-popup"
import SignoutButton from "./(home)/partials/signout-button"

interface MainLayoutProps extends ComponentWithChildren {}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions)

  const firstname = session?.user?.name?.split(" ")[0]

  return (
    <>
      <div className="container flex pt-10">
        <Header />
        <section>
          <div className="w-[360px] h-full flex justify-end items-center gap-4">
            <div className="flex justify-center items-center bg-white gap-4 rounded-md shadow-md px-4 py-1">
              <Image
                src={session?.user?.image!}
                width={35}
                height={35}
                alt={session?.user?.name!}
                className="rounded-full"
              />
              <h1>Hello, {firstname}!</h1>
            </div>

            <SignoutButton />
          </div>
        </section>
      </div>
      <RemoveContactPopup />
      <div className="container">{children}</div>
      <TailwindIndicator />
    </>
  )
}
