import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchContactForm() {
  return (
    <form className="flex gap-2">
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search Contact Name"
        autoComplete="off"
        className="bg-zinc-100"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
