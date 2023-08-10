import { useState, useEffect } from "react"
import img from "../../assets/bitcoin1.svg"
import img1 from "../../assets/doller.png"
import bg from "../../assets/bg-bitcoin-removebg-preview.png"
import { getRewardValueInYear } from "../../store/actions/homeMedicineAction"
import { useDispatch, useSelector } from "react-redux"
import { CsSpin } from "../../components/ui"
import Image from "next/image"

const BitcoinValveSection = ({ t }) => {
  const [changeItem, setChangeItem] = useState(false)
  const { isLoading, getRewardValueInYearDetails } = useSelector(({ home }) => home)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRewardValueInYear())
  }, [dispatch, changeItem])

  return (
    <CsSpin spinning={isLoading}>
      <div className="bition-value max-[370px]:h-[670px]  h-[650px]">
        <div className="bitcoin-container relative">
          <Image className="max-md:h-[200px] h-[300px]" src={bg} alt="" />
          <div className="md:p-10 absolute top-0 py-8 px-5 max-md:hidden text-white w-full">
            <div>
              <span className="max-sm:text-[24px] text-[32px] flex flex-wrap justify-center text-center items-end">
                {t('If you have earned')}
                <span className="sm:text-[48px] text-[28px] font-bold text-csTextColor-7 px-2  align-baseline relative top-1" >
                  {t('BITCOIN')}
                </span>{t('instead of getting')}
                <span className="sm:text-[48px] text-[28px] font-bold text-csTextColor-8 px-2  align-baseline relative top-1">
                  {t('CASH')}
                </span>
                {t('back')}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center gap-10 py-5 max-lg:w-[100%] w-[70%] mx-auto">
                <div className="w-[50%]">
                  <div className="text-center text-[24px] font-bold">{getRewardValueInYearDetails[0]?.BTC_Year}</div>
                  <div className="flex items-center justify-evenly">
                    <div className="flex items-center flex-col w-[157px]"><Image className="py-4" src={img1} alt="" /><span className="text-[20px] font-bold">${getRewardValueInYearDetails[0]?.Drug_Reward}</span></div>
                    <div className="font-bold text-[48px]">=</div>
                    <div className="flex items-center flex-col w-[158px]"><Image className="py-4" src={img} alt="" /><span className="text-[20px] font-bold">{(getRewardValueInYearDetails[0]?.BTC_Year_Amt * 1).toFixed(6)} Bitcoin</span></div>
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="text-center text-[24px] font-bold">{t('TODAY')}</div>
                  <div className="text-[14px] font-bold text-center pt-3">{t('YOU WOULD HAVE')}</div>
                  <div className="flex gap-2 justify-center m-4 h-[200px]">
                    <img src={getRewardValueInYearDetails[0]?.Image_URL} alt="" className="max-w-[100%] max-h-[100%]" />
                  </div>
                  <div className="text-[16px] text-center">
                    {getRewardValueInYearDetails[0]?.Today_Aggregate_Item}
                  </div>
                  <div className="text-[40px] font-bold text-center">${Number((getRewardValueInYearDetails[0]?.BTC_USD_Today?.replace('$', "") * 1)?.toFixed(2))?.toLocaleString("en-US")}</div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setChangeItem(pre => !pre)}
                      type="button" className="border-2 p-3 mt-5 text-csYellow border-csYellow">{t('Show me more. What else?')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden absolute top-0 w-full flex flex-col justify-center items-center text-white min-sm:py-20 py-10">
            <div className="max-sm:p-3">
              <div className="text-20 font-semibold">Back in<span className="px-3 text-[28px] font-bold">{getRewardValueInYearDetails[0]?.BTC_Year}</span>if you earned</div>
              <div className="flex items-center px-3 my-3 border-csYellow border-[2px] rounded-md"><img className="w-7 h-7" src={img} alt="" /><span className="px-3 text-[28px] font-bold">{(getRewardValueInYearDetails[0]?.BTC_Year_Amt * 1).toFixed(6)} in bitcoin back</span></div>
              <div className="text-20 font-semibold">instead of getting </div>
              <div className="flex items-center px-3 my-3 border-[#339966] border-[2px] rounded-md"><img className="w-12 h-7" src={img1} alt="" /><span className="px-3 text-[28px] font-bold">${getRewardValueInYearDetails[0]?.Drug_Reward} in cash back</span></div>
              <div className="text-20 font-semibold">you would have </div>
              <div className="flex items-center justify-between max-h-[180px]">
                <div className="text-[28px] font-bold text-csYellow ">${Number((getRewardValueInYearDetails[0]?.BTC_USD_Today?.replace('$', "") * 1)?.toFixed(2))?.toLocaleString("en-US")}</div>
                <div className="px-1 text-20 font-semibold">or</div>
                <div className="max-h-[100%] max-w-[120px]">
                  <img className="max-w-[100%] max-h-[150px]" src={getRewardValueInYearDetails[0]?.Image_URL} alt="" />
                  <div className="text-14 py-3 text-center">{getRewardValueInYearDetails[0]?.Today_Aggregate_Item}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setChangeItem(pre => !pre)}
                type="button" className="border-2 p-3 text-csYellow border-csYellow">{t('Show me more. What else?')}</button>
            </div>
          </div>
        </div>
      </div>
    </CsSpin>
  )
}

export default BitcoinValveSection