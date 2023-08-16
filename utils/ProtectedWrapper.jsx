import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { CsSpin } from "@/components/ui"
import { getCurrentUserAPI } from "@/service/authAPI"
import { useQuery } from "@tanstack/react-query"

export default function ProtectedWrapper({ children }) {
  const user = useQuery({ queryKey: ['user'], queryFn: getCurrentUserAPI })
  console.log(user)

  const { status } = useSession()
  const { push } = useRouter()
  if (status === 'loading') return <CsSpin />
  if (status === 'authenticated') {
    return children
  } else {
    push('/signin')
  }
}