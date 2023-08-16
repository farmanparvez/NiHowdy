import { Row, Col } from "antd"
import mySvg from "../../../assets/logo.svg";
import img from "../../../assets/bitcoin.svg"
import { Select } from "antd";
import { getCurrencyPrice } from "../../../store/actions/homeMedicineAction";
import { useDispatch, useSelector } from "react-redux";
import { CsSpin } from "../../../components/ui";
import { useEffect, useState } from "react";
import Image from "next/image";
const { Option } = Select

const Reward = ({ t, data, isLoading }) => {
    const { btcPrice, bitcoindPrice } = useSelector(({ home }) => home)
    const dispatch = useDispatch();
    const [bitcoinPrice, setBitcoinPrice] = useState(0.05 * 100000)
    const reward = data?.data[0]?.reward
    // console.log(data?.data)

    useEffect(() => {
        if (reward) {
            dispatch(getCurrencyPrice({ amount: reward, from_currency_id: 1, to_currency_symbol: 'USD' }));
            setBitcoinPrice(reward * 100000)
        }
    }, [dispatch, reward]);

    const handleChange = (value) => setBitcoinPrice(value * reward)

    return (
        <div className="bg-csBGSmoke">
            <CsSpin spinning={isLoading}>
                <div>
                    <div className="flex min-[990px]:justify-between max-[990px]:flex-wrap max-sm:flex-col-reverse max-[990px]:w-[100%] gap-5 mx-auto w-[90%] md:p-10 py-8 px-5 text-csTextColor-1">
                        <div className="min-[990px]:basis-1/2 basis-full">
                            <div className="flex min-h-full items-end justify-evenly">
                                <div className="flex flex-col justify-end items-center">
                                    <div className="flex max-sm:flex-col max-sm:items-center text-[20px] max-sm:text-[12px] text-csTextColor-6 pb-1 font-semibold">
                                        <div className="flex"><span>{reward?.toString()?.slice(0, 9) || '--'} </span> <Image src={img} alt="" className="mx-1" /></div>
                                        <div className="text-csTextColor-1">=</div>
                                        <div className="flex">
                                            ${Number(btcPrice?.price?.toString()?.slice(0, 6)).toLocaleString("en-US")}
                                            <span className="text-[14px] ml-2 flex items-center">USD </span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-2 vertical-bar"></div>
                                    <div className="text-[12px] text-csTextColor-6 py-1 font-semibold">{t('TODAY’S VALUE')}</div>
                                    <div className="sm:flex text-center">
                                        <div className="text-[14px] text-csTextColor-1">{t('Bitcoin Price')} @</div>
                                        <div> ${Number(bitcoindPrice?.toFixed(2)).toLocaleString("en-US")}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex max-sm:flex-col max-sm:items-center items-center font-semibold	">
                                        <div className="flex">
                                            <span className="text-csTextColor-6 mr-1 text-[18px]">{reward?.toString()?.slice(0, 9) || "--"}</span>
                                            <Image src={img} alt="" />
                                        </div>
                                        <div><span className="text-csTextColor-1 text-[16px] px-2">=</span></div>
                                        <div>
                                            <span className="text-[24px] max-sm:text-[16px] text-csBG font-bold flex items-center">
                                                ${bitcoinPrice?.toLocaleString("en-US")}<span className="text-14 p-2">USD</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-[239px] horizontal-bar"><Image className="p-1" src={mySvg} alt="" /></div>
                                    <div className="text-[12px] text-csTextColor-6 py-1 font-semibold">{t('POTENTIAL FUTURE VALUE')}</div>
                                    <div className="sm:flex">
                                        <div className="text-[14px] text-csTextColor-1">{t('Bitcoin Price')} @</div>
                                        <div>
                                            <Select onChange={handleChange} placeholder={<span className='text-[14px] text-[#616161]'>100k</span>} className='border-[2px] mx-2 rounded-md border-csYellow text-csBG'>
                                                <Option value="100000">100k</Option>
                                                <Option value="250000">250k</Option>
                                                <Option value="500000">500k</Option>
                                                <Option value="1000000">1m</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col min-[990px]:basis-1/2 justify-center w-full'>
                            <Row className="py-2">
                                <Col span={22}><span className="max-sm:text-[32px] text-[48px]  font-semibold csTextColor-1">{t("How much Bitcoin can you earn with")} {data?.data[0]?.drugname}</span></Col>
                            </Row>
                            <Row gutter={20} align='middle' className="py-2">
                                <Col ><span className="text-[20px] font-normal csTextColor-1">{t("The potential for Bitcoin rewards to increase and appreciate in value is a possibility to consider, which may occur over time.")}</span></Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </CsSpin>
        </div>
    )
}

export default Reward