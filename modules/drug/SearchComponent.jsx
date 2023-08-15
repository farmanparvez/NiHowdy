import { AutoComplete, Input, Spin } from "antd"
import { ReactSVG } from "react-svg"
import location from "../../assets/location.svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPrice } from "../../store/slice/medicineSlice";
import { setEarBitcoin } from "../../store/slice/homeMedicineSlice";
import bitcoin from "../../assets/bitcoin.svg";
import { getMedicinePricesByCode } from "../../store/actions/medicineAction";
import { reset } from "../../store/slice/medicineSlice";
// import ScrollLink from "../../components/ScrollLink/ScrollLink";
// import { Link } from "react-router-dom";
import Link from "next/link";

const SearchComponent = ({ t }) => {
    const { priceForMap, NDCCode, initialQuantity, isPriceLoading } = useSelector(({ medicine }) => medicine);
    const [search, onSearch] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        var timer;
        if (search?.length >= 3) {
            timer = setTimeout(() => {
                dispatch(
                    getMedicinePricesByCode({
                        Quant: initialQuantity,
                        NDC: NDCCode,
                        ZipCode: search,
                    })
                );
            }, 1000);
        }
        return () => {
            clearTimeout(timer)
            dispatch(reset())
        }
        // eslint-disable-next-line
    }, [search, dispatch, initialQuantity, NDCCode]);


    const DrugList = (title) => {
        return (
            <>
                <div className="bg-white flex max-[500px]:flex-wrap border-2 max-[550px]:py-1 border-[#838383] my-5 py-1 max-[1122px]:px-2 px-3 max-[500px]:py-3  rounded-md min-h-[110px] "
                    onClick={() => {
                        dispatch(setPrice(title))
                        dispatch(setEarBitcoin({ price: title?.earnBitcoin }))
                        // window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    <div className="w-[140px] max-[1122px]:w-[100px]  max-[950px]:w-[140px]  flex flex-col justify-center max-[500px]:pb-1">
                        <div>
                            <img className="sm:max-w-[100%] max-w-[60%] sm:max-h-[90%]" src={title?.PharmacyLogo} alt="" />
                        </div>
                        <div className="text-14 max-[1122px]:text-[12px] max-[950px]:text-[14px] text-csTextColor-1 !whitespace-normal">{title?.Address}</div>
                    </div>
                    <div className="flex">
                        <div className="px-2 pr-2 flex flex-col justify-center max-[950px]:px-10 max-[600px]:px-3 max-[500px]:!pl-0">
                            <div className="text-12 text-csTextColor-2">
                                RETAIL PRICE:{" "}
                                <span className="text-csTextColor-1 font-bold text-14 line-through">
                                    ${title?.retailPrice?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center text-18 max-[1122px]:text-[14px] max-[600px]:text-[14px] max-[370px]:text-[12px] text-csTextColor-1 font-semibold">
                                <div className="sm:min-w-[50px] min-w-[30px]">
                                    ${title?.Price}
                                </div>
                                <span className="pl-1 max-[370px]:pl-1">
                                    <div className="flex">
                                        <div className="triangle-left" />
                                        <div className="sm:w-[80px] w-[80px] max-[370px]:w-[70px] h-[27px] bg-csYellow text-center sm:text-[12px] text-[12px] max-[370px]:text-[11px] flex justify-center items-center">
                                            SAVE ${(title.retailPrice - title.Price)?.toFixed(2)}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-csTextColor-1 text-[18px] max-[1122px]:text-[14px] max-[600px]:text-[14px] max-[370px]:text-[12px]">PLUS {title?.bitcoinEarnPercent ?? "..."}% in BITCOIN:</div>
                            <div className="flex items-center text-[18px] max-[1122px]:text-[14px] max-[600px]:text-[14px] max-[370px]:text-[12px] font-semibold">
                                <span>{title?.earnBitcoin?.toString()?.slice(0, 9) || "..."}</span> <img className="sm:mx-1 mx-1" src={bitcoin} alt="" />
                                <span className="text-[18px] max-[1122px]:text-[14px] text-csTextColor-1 max-[370px]:text-[12px]">Bitcoin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
    }

    return (
        <div>
            <div className="bg-csLight rounded-lg border-csTextColor-2 px-5 pb-5">
                <div className="font-24 font-semibold text-csTextColor-1 py-2">
                    Find a Pharmacy Near You. <span className="text-[#616161]">Enter an address or ZIP code</span>
                </div>
                <div className="search-btn">
                    <AutoComplete
                        popupClassName="certain-category-search-dropdown"
                        style={{ width: "100%" }}
                        onSearch={(text) => onSearch(text)}
                        allowClear={false}

                    >
                        <Input.Search allowClear={false}
                            // notFoundContent
                            prefix={<ReactSVG src={location} />}
                            className="border-[1px] border-csTextColor-2"
                            size="large"
                            placeholder={t("Enter an address or ZIP code")}
                            enterButton={t("Search")}
                        />
                    </AutoComplete>
                </div>
                <div className="pt-3">
                    💰Save Instantly with free{" "}
                    <span className="text-csTextColor-3 cursor-pointer">
                        {/* <ScrollLink to="cardSection" spy={true} smooth={true} offset={-50} duration={500} delay={500} > */}
                        {t("savings cards")}
                        {/* </ScrollLink> */}
                    </span>
                    . Not required to sign up <br />
                    <span className="text-csTextColor-3 cursor-pointer">
                        <Link href='/signup'>
                            Register
                        </Link>
                    </span>{" "}
                    to earn additional Bitcoin
                </div>
                <div className="overflow-x-auto">
                    <Spin spinning={isPriceLoading}>
                        <div className="h-[360px]">
                            {priceForMap?.map((val, index) => <div key={index}><DrugList  {...val} /></div>)}
                        </div>
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent

