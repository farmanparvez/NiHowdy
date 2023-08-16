import Image from "next/image";
import walgreen from "../../../assets/walgreen.svg";
import cvs from "../../../assets/cvsh.svg";
import wegmans from "../../../assets/wegmans.svg";
import walmart from "../../../assets/walmart.svg";
import costco from "../../../assets/costco.svg";
import Kroger from "../../../assets/Kroger.svg";
import alarm from "../../../assets/alarm.svg";


const AvailablePharmacies = () => {
    return (
        <div className="py-8 csTextColor-1">
            <div className="flex justify-center item-center px-5 max-sm:text-center">
                <h1 className="font-medium text-[24px] text-csTextColor-1">
                    Available at more than 35,000 Pharmacies nationwide
                </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center max-sm:gap-4 gap-14 p-5">
                <div>
                    <Image src={walgreen} alt="" />
                </div>
                <div>
                    <Image src={cvs} alt="" />
                </div>
                <div>
                    <Image src={wegmans} alt="" />
                </div>
                <div>
                    <Image src={walmart} alt="" />
                </div>
                <div>
                    <Image src={costco} alt="" />
                </div>
                <div>
                    <Image src={Kroger} alt="" />
                </div>
            </div>
            <div className="p-3 bg-csBG">
                <div className="flex justify-center items-center gap-3">
                    <div>
                        <Image src={alarm} alt="" />
                    </div>
                    <div align="middle" justify="center" className="text-csYellow font-medium text-16 flex items-center">
                        Free mail order delivery coming soon
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvailablePharmacies