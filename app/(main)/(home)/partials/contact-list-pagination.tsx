import React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactListPagination() {
  return (
    <div className="pt-4 flex justify-between items-center">
      <p className="text-center text-gray-500">
        Showing 1 to 10 of 100 entries
      </p>
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-gray-500">Page Limit</p>
      </div>
      <div className="space-x-2">
        <span className="text-blue-500 cursor-pointer hover:text-blue-600">
          Previous
        </span>
        <span>|</span>
        <span className="text-blue-500 cursor-pointer hover:text-blue-600">
          Next
        </span>
      </div>
    </div>
  )
}
