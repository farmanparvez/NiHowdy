import { Row, Col, Result, Empty } from "antd";
import img1 from "../../assets/bitcoin.svg"
import { Trans } from "next-i18next";
import { useSelector } from "react-redux";
import { CsSpin } from "../../components/ui";
import Image from "next/image";

const TopRated = ({ t }) => {
    const { popularDrug, isLoading, isError } = useSelector(({ home }) => home)

    const medicine = <>
        {!isLoading && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
        {!isLoading && !isError && popularDrug?.length === 0 && <Empty />}
        {!isLoading && !isError && popularDrug?.length > 0 && popularDrug?.slice(0, 3)?.map((res, index) =>
            <div key={index} className="py-3 flex max-sm:flex-wrap gap-5 items-end sm:justify-start">
                <div className="flex items-center">
                    <div className="w-[120px]"><span className="text-[18px] font-semibold">{res?.drugname}</span></div>
                </div>
                <div className="flex max-sm:flex-wrap">
                    <div className="sm:mx-2 max-sm:mr-2">
                        <div className="text-csTextColor-4 text-[12px] flex items-center">{t("RETAIL PRICE")}:<div className="text-[14px] text-csTextColor-1 line-through pl-2">${res?.retailPrice?.toFixed(2)}</div></div>
                        <div className="flex pt-1">
                            <div className="sm:w-[80px] w-[40px]"><span className="sm:text-[24px] text-[10px] font-bold  text-csTextColor-5">${res?.price}</span></div>
                            <div className=" px-2 mx-1 text-[12px] align-middle flex items-center" >
                                <div className="flex w-[100%]">
                                    <div className="triangle-left" />
                                    <div className="sm:pr-2 min-w-[100%] h-[27px] sm:min-w-[100px] sm:h-[27px] bg-csYellow sm:text-[14px] text-center text-[12px] flex justify-center items-center">
                                        SAVE ${res?.savedPrice?.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:mx-2">
                        <div className="text-csTextColor-4 text-[12px]">{res?.percentage_amount}{t("% REWARD")}</div>
                        <div className="pt-2 flex"><span className="md:text-[24px] text-[14px] font-bold text-csTextColor-1">{res?.reward?.toString()?.slice(0, 9)} </span><Image className="px-2" src={img1} alt="" /> <span className="sm:text-[16px] text-[14px] font-semibold flex items-center">{t('Bitcoin')}</span></div>
                    </div>
                </div>
            </div>
        )}
    </>

    return (
        <CsSpin spinning={isLoading}>
            <Row gutter={[20, 30]} justify='center' className="md:p-10 py-8 px-5 bg-csBGSmoke text-csTextColor-1">
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                    <Row className="py-2">
                        <Col>
                            <span className="sm:text-[48px] text-[32px] font-semibold">
                                {t('Instant Savings')} <br /> <span className="text-csTextColor-3">&</span> {t('Earn Bitcoin')}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={20} align='middle' className="py-2">
                        <Col >
                            <span className="text-[20px]">
                                <Trans i18nKey={"Simply show this FREE prescription savings"} components={{ 1: <br /> }} />
                            </span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    {medicine}
                </Col>
            </Row>
        </CsSpin>
    )
}

export default TopRated
