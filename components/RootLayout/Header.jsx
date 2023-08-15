import logo from "../../assets/logo.webp"
import Image from "next/image"
import { CsButton } from "../ui"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Fragment } from "react"

const Header = () => {
    const { status } = useSession()

    return (
        <div className="bg-csBG z-50 shadow-main-header-bottom-line-shadow fixed w-full">
            <div className="flex justify-between items-center w-[90%] mx-auto py-3">
                <div className="flex items-center">
                    <div className="shadow-main-logo-shadow rounded-full mr-3">
                        <Link href='/'>
                            <Image src={logo} alt="Nihowdy" width={40} height={40} />
                        </Link>
                    </div>
                    <div className="text-[24px] font-bold">
                        NiHowdy
                    </div>
                </div>
                <div className="gap-5 flex">
                    {(status !== 'authenticated' && status !== 'loading') ?
                        <Fragment>
                            <CsButton type="pr" className="mr-2">Signup</CsButton>
                            <Link href={'/signin'}>
                                <CsButton type="pr">Signin</CsButton>
                            </Link>
                        </Fragment>
                        :
                        <CsButton type="pr" onClick={() => signOut({ redirect: false })}>Logout</CsButton>
                    }
                </div>
            </div >
        </div >
    )
}

export default Header