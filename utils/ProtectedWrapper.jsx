import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { CsSpin } from "@/components/ui"

export default function ProtectedWrapper({ children }) {
  const { status } = useSession()
  const { push } = useRouter()
  if (status === 'loading') return <CsSpin />
  if (status === 'authenticated') {
    return children
  } else {
    push('/signin')
  }
}