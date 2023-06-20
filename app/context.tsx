"use client"

import React from "react"

import { ComponentWithChildren } from "@/types/props"

interface RootContextProps {
  showRemoveContactPopup: boolean
  handleChangeShowRemoveContactPopup: (value: boolean) => Promise<void>
  id: string
  handleSetId: (value: string) => Promise<void>
}

export const rootContext = React.createContext<RootContextProps>(
  {} as RootContextProps
)

export const RootProvider = ({ children }: ComponentWithChildren) => {
  const [showRemoveContactPopup, setShowRemoveContactPopup] =
    React.useState<boolean>(false)
  const [id, setId] = React.useState<string>("")

  const handleChangeShowRemoveContactPopup = (value: boolean) => {
    setShowRemoveContactPopup(value)
  }

  const handleSetId = (value: string) => {
    setId(value)
  }

  const value = {
    showRemoveContactPopup,
    handleChangeShowRemoveContactPopup,
    id,
    handleSetId,
  } as RootContextProps

  return <rootContext.Provider value={value}>{children}</rootContext.Provider>
}
