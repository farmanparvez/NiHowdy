import Link from "next/link";
import Image from "next/image";
import NH from "../../assets/footerlogo.svg";
import insta from "../../assets/instagram.svg";
import fb from "../../assets/facebook.svg";
import lk from "../../assets/linkedin.svg";
import tw from "../../assets/twitter.svg";
import tk from "../../assets/tiktok.svg";
import cp from "../../assets/copyright.svg";

const Footer = ({ t }) => {
    return (
        <div className=" w-full">
            <div className="min-sm:p-8 p-4">
                <div className="flex flex-wrap justify-between">
                    <div className="flex m-2 items-center">
                        <div className="w-12 h-12  flex justify-center items-center ">
                            <Image src={NH} alt="NiHowdy" />
                        </div>
                        <div className="text-csBG font-bold ml-4 text-24">{t("NiHowdy")}</div>
                    </div>
                    <div className="flex items-center m-2">
                        <div className="text-right flex items-end justify-end gap-5">
                            <Image src={insta} alt="" />
                            <Image src={fb} alt="" />
                            <Image src={lk} alt="" />
                            <Image src={tw} alt="" />
                            <Image src={tk} alt="" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-[12px] flex ml-auto p-4 text-black">
                        <span><span className="font-bold">{t("The NiHowdy prescription discount program is NOT insurance.")}</span> {t("Text")}</span>
                    </div>
                    <div className="text-csTextColor-6 gap-5 w-full font-semibold flex items-center flex-wrap">
                        <div className="flex items-center">
                            <Image src={cp} alt="" className="mr-2" />{t("2022 NiHowdy. All rights reserved")}
                        </div>
                        <div><Link href='/terms'>{t("Terms and Conditions")}</Link></div>
                        <div><Link href='/privacy'>{t("Privacy Policy.")}</Link></div>
                        <div><Link href='/program-decription'>{t("Program Description")}</Link></div>
                        <div><Link href='/additional-faqs'>{t("Additional FAQs")}</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
