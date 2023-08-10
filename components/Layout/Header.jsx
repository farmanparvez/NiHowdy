import logo from "../../assets/logo.webp"
import Image from "next/image"
import { Button } from "antd"

const Header = () => {
    return (
        <div className="bg-csBG z-50 shadow-main-header-bottom-line-shadow fixed w-full">
            <div className="flex justify-between items-center w-[90%] mx-auto py-3">
                <div className="flex items-center">
                    <div className="shadow-main-logo-shadow rounded-full mr-3">
                        <Image src={logo} alt="Nihowdy" width={40} height={40} />
                    </div>
                    <div className="text-[24px] font-bold">
                        NiHowdy
                    </div>
                </div>
                <div className="gap-5">
                    <Button type="primary" className="mr-5">Signin</Button>
                    <Button type="primary">Signup</Button>
                </div>
            </div>
        </div>
    )
}

export default Header