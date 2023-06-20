"use client"

import React from "react"

import { Loader2 as Loader } from "lucide-react"
import { toast } from "react-hot-toast"

import { wait } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { removeContactAction } from "../_actions"
import { rootContext } from "../context"

export default function RemoveContactPopup() {
  const {
    showRemoveContactPopup,
    handleChangeShowRemoveContactPopup,
    id,
    handleSetId,
  } = React.useContext(rootContext)
  const [isPending, startTransition] = React.useTransition()

  const handleClose = () => {
    handleChangeShowRemoveContactPopup(false)
  }

  const handleRemove = () => {
    startTransition(async () => {
      await wait(1000)
      await removeContactAction(id)

      handleSetId("")
      handleChangeShowRemoveContactPopup(false)

      toast.success("Contact removed successfully.")
    })
  }

  if (!showRemoveContactPopup) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8">
        <h2 className="text-xl font-bold">Remove Contact</h2>
        <p className="text-sm font-light">
          Are you sure you want to remove this contact?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleClose}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={isPending}
            onClick={handleRemove}
          >
            {isPending ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? "Removing..." : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  )
}
