import Image from "next/image"
import bitcoin from "../../assets/bitcoin.webp"
import medicineBox from "../../assets/medicineBox.webp"
import { Input } from 'antd';
import { useRouter } from "next/router";
import { Trans } from "next-i18next";
import { AutoCompleteComponent } from "/components/ui";

const Hero = ({ t }) => {
    const router = useRouter()
    console.log(router.locale)
    // console.log(t)
    return (
        <div className="bg-csBG h-[300px] relative z-10">
            <div className="flex justify-between h-full pb-5">
                <div className="mt-auto ml-12">
                    <Image src={medicineBox} alt="" width={150} height={150} />
                </div>
                <div >
                    <Image src={bitcoin} alt="" width={200} height={200} />
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="md:text-[48px] text-[32px] font-normal">
                    <Trans i18nKey={"Prescription drug savings, free Bitcoin No Catch"} components={{ 1: <br className="max-sm:hidden" /> }} />
                </span><br />
                <div className="sm:text-[20px] text-[16px] my-4">{t("Save on Prescriptions and Earn Bitcoin")}</div>
                <div>
                    <AutoCompleteComponent t={t} />
                </div>
            </div>
        </div>
    )
}

export default Hero