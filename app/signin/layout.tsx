import { ComponentWithChildren } from "@/types/props"

interface SigninLayoutProps extends ComponentWithChildren {}

export default function SigninLayout({ children }: SigninLayoutProps) {
  return <div>{children}</div>
}
