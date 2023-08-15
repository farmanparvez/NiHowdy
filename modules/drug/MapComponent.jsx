import { useEffect } from "react";
import { Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
// import { getMedicinePricesByCode, } from "../../redux/actions/medicineAction";
import { setMapDrugListAfterCalculatingRewardPercentAndBitcoin } from "../../store/slice/medicineSlice";
import { DisplayMapFC } from "./DisplayMapFC";
import { getCurrencyPricebyData } from "../../store/actions/homeMedicineAction";
// import Map from "../Map/Map"

const PharmacySearchMap = () => {
  const { priceForMap, isPriceLoading, 
    isMecicinePriceLoadedSuccess ,
    // NDCCode, initialQuantity, 
  } = useSelector(({ medicine }) => medicine);
  const { rewardPercentBasedOnPriceDetails } = useSelector(({ home }) => home)
  const dispatch = useDispatch();

  const returnDiscountPercentBasedOnValueProvided = async (price) => {
    if (price <= 25) {
      const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 3)
      const percent = (price / 100) * filVal[0]?.value
      const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
    } else if (price > 25 && price <= 50) {
      const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 2)
      const percent = (price / 100) * filVal[0]?.value
      const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
    } else if (price > 50 && price <= 75) {
      const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 1)
      const percent = (price / 100) * filVal[0]?.value
      const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
    } else if (price > 75 && price <= 250) {
      const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 0.5)
      const percent = (price / 100) * filVal[0]?.value
      const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
    } else if (price > 250 && price < 500) {
      const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 0.25)
      const percent = (price / 100) * filVal[0]?.value
      const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
    } else if (price >= 500 && price <= 10000000) {
      const btc = await dispatch(getCurrencyPricebyData({ amount: 1.25, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
      return { earnBitcoin: btc?.price, bitcoinEarnPercent: 0 }
    }
  }

  const fn = async () => {
    const data = priceForMap?.map(async (price) => {
      const data = await returnDiscountPercentBasedOnValueProvided(price?.Price)
      return { ...price, earnBitcoin: data?.earnBitcoin, bitcoinEarnPercent: data?.bitcoinEarnPercent }
    })
    const res = await Promise.all(data)
    dispatch(setMapDrugListAfterCalculatingRewardPercentAndBitcoin(res))
  }

  useEffect(() => {
    if (isMecicinePriceLoadedSuccess && priceForMap.length > 0) {
      fn()
    }
    // eslint-disable-next-line
  }, [isMecicinePriceLoadedSuccess])

  return (
    <div className="flex justify-center items-center h-[500px] w-[100%] ">
      {isPriceLoading ? <Spin /> : <DisplayMapFC />}
    </div>
  );
};

export default PharmacySearchMap;


// import { useState, useEffect } from "react";
// import { AutoComplete, Input, Spin } from "antd";
// import bitcoin from "../../assets/bitcoin.svg";
// import location from "../../assets/location.svg";
// import { ReactSVG } from "react-svg";
// import { useSelector, useDispatch } from "react-redux";
// import { getMedicinePricesByCode, } from "../../redux/actions/medicineAction";
// import { setPrice, setMapDrugListAfterCalculatingRewardPercentAndBitcoin, reset } from "../../redux/slice/medicineSlice";
// import { DisplayMapFC } from "./DisplayMapFC";
// import { getCurrencyPricebyData } from "../../redux/actions/homeMedicineAction";
// import { setEarBitcoin } from "../../redux/slice/homeMedicineSlice";
// // import ScrollLink from "../../components/ScrollLink/ScrollLink";

// const PharmacySearchMap = ({ t }) => {
//   const { priceForMap, isPriceLoading, NDCCode, initialQuantity, isMecicinePriceLoadedSuccess } = useSelector(({ medicine }) => medicine);
//   const { rewardPercentBasedOnPriceDetails } = useSelector(({ home }) => home)
//   const [search, onSearch] = useState(null);
//   const dispatch = useDispatch();

//   const returnDiscountPercentBasedOnValueProvided = async (price) => {
//     if (price <= 25) {
//       const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 3)
//       const percent = (price / 100) * filVal[0]?.value
//       const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
//     } else if (price > 25 && price <= 50) {
//       const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 2)
//       const percent = (price / 100) * filVal[0]?.value
//       const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
//     } else if (price > 50 && price <= 75) {
//       const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 1)
//       const percent = (price / 100) * filVal[0]?.value
//       const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
//     } else if (price > 75 && price <= 250) {
//       const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 0.5)
//       const percent = (price / 100) * filVal[0]?.value
//       const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
//     } else if (price > 250 && price < 500) {
//       const filVal = rewardPercentBasedOnPriceDetails?.filter(res => res.value === 0.25)
//       const percent = (price / 100) * filVal[0]?.value
//       const btc = await dispatch(getCurrencyPricebyData({ amount: percent, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: filVal[0]?.value }
//     } else if (price >= 500 && price <= 10000000) {
//       const btc = await dispatch(getCurrencyPricebyData({ amount: 1.25, from_currency_id: 2781, to_currency_symbol: 'BTC' })).unwrap();
//       return { earnBitcoin: btc?.price, bitcoinEarnPercent: 0 }
//     }
//   }

//   const fn = async () => {
//     const data = priceForMap?.map(async (price) => {
//       const data = await returnDiscountPercentBasedOnValueProvided(price?.Price)
//       return { ...price, earnBitcoin: data?.earnBitcoin, bitcoinEarnPercent: data?.bitcoinEarnPercent }
//     })
//     const res = await Promise.all(data)
//     dispatch(setMapDrugListAfterCalculatingRewardPercentAndBitcoin(res))
//   }

//   useEffect(() => {
//     if (isMecicinePriceLoadedSuccess && priceForMap.length > 0) {
//       fn()
//     }
//     // eslint-disable-next-line
//   }, [isMecicinePriceLoadedSuccess])

//   useEffect(() => {
//     var timer;
//     if (search?.length >= 3) {
//       timer = setTimeout(() => {
//         dispatch(
//           getMedicinePricesByCode({
//             Quant: initialQuantity,
//             NDC: NDCCode,
//             ZipCode: search,
//           })
//         );
//         onSearch("");
//       }, 1000);
//     }
//     return () => {
//       clearTimeout(timer)
//       dispatch(reset())
//     }
//     // eslint-disable-next-line
//   }, [search, dispatch, initialQuantity, NDCCode]);

//   const renderItem = (title) => ({
//     // value: JSON.stringify(title),
//     label: (
//       // <ScrollLink to="drugDetail" spy={true} smooth={true} offset={-50} duration={500} delay={500} >
//       <>
//         {/* <div>{!title && <Empty/>}0 </div> */}
//         <div className="bg-white flex max-[550px]:flex-wrap max-[550px]:border-b-2 max-[550px]:py-1"
//           onClick={() => {
//             dispatch(setPrice(title))
//             dispatch(setEarBitcoin({ price: title?.earnBitcoin }))
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//           }}>
//           <div className="w-[140px] max-sm: mr-2">
//             <img className="sm:max-w-[100%] max-w-[60%] sm:max-h-[90%]" src={title?.PharmacyLogo} alt="" />
//             <div className="text-14 text-csTextColor-1 !whitespace-normal">{title?.Address}</div>
//           </div>
//           <div className="flex ">
//             <div className="sm:px-3 pr-2 flex flex-col justify-end">
//               <div className="text-12 text-csTextColor-2">
//                 RETAIL PRICE:{" "}
//                 <span className="text-csTextColor-1 font-bold text-14 line-through">
//                   ${title?.retailPrice?.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex items-center sm:text-24 text-14 max-[370px]:text-[12px] text-csTextColor-1 font-semibold">
//                 <div className="sm:min-w-[95px] min-w-[30px]">
//                   ${title?.Price}
//                 </div>
//                 <span className="pl-3 max-[370px]:pl-1">
//                   <div className="flex">
//                     <div className="triangle-left" />
//                     <div className="sm:w-[100px] w-[80px] max-[370px]:w-[70px] h-[27px] bg-csYellow text-center sm:text-[14px] text-[12px] max-[370px]:text-[11px] flex justify-center items-center">
//                       SAVE ${(title.retailPrice - title.Price)?.toFixed(2)}
//                     </div>
//                   </div>
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col justify-end">
//               <div className="text-csTextColor-1 max-sm:text-12 max-[370px]:text-[12px]">{title?.bitcoinEarnPercent ?? "..."}% REWARD</div>
//               <div className="flex items-center sm:text-24 text-14 max-[370px]:text-[12px] font-semibold">
//                 <span>{title?.earnBitcoin?.toString()?.slice(0, 9) || "..."}</span> <img className="sm:mx-3 mx-1" src={bitcoin} alt="" />
//                 <span className="text-16 text-csTextColor-1 max-[370px]:text-[12px]">Bitcoin</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//       // </ScrollLink>
//     ),
//   });


//   const options = [{ options: priceForMap?.map((val) => renderItem(val, 10000)) }];

//   return (
//     <>

//       <div className="relative w-[100vw] h-[500px] bg-white">
//         <div className="flex justify-center items-center h-[500px]">
//           {!isPriceLoading ? <DisplayMapFC /> : <Spin />}
//         </div>DisplayMapFC
//         <div className="bg-csLight rounded-lg border-[1px] border-csTextColor-2 sm:p-4 p-2 absolute top-10 md:left-12 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 min-w-[98%] sm:min-w-[700px]">
//           <div className="font-14 font-bold text-csTextColor-2">
//             {t("LOCAL PHARMACY PICK UP")}
//           </div>
//           <div className="font-24 font-semibold text-csTextColor-1 py-2">
//             {t("Find a Pharmacy Near You")}
//           </div>
//           <div className="search-btn">
//             <AutoComplete
//               popupClassName="certain-category-search-dropdown"
//               dropdownMatchSelectWidth={"100%"}
//               style={{ width: "100%" }}
//               onSearch={(text) => onSearch(text)}
//               options={options}
//               notFoundContent="Not Found"
//             >
//               <Input.Search
//                 notFoundContent
//                 prefix={<ReactSVG src={location} />}
//                 className="border-[1px] border-csTextColor-2"
//                 size="large"
//                 placeholder={t("Enter an address or ZIP code")}
//                 enterButton={t("Search")}
//               />
//             </AutoComplete>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PharmacySearchMap;
