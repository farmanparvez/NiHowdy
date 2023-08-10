import Modal from './Modal';
import { ReactSVG } from "react-svg";
import { Trans } from 'next-i18next';
import { Card } from "antd";
import { useState, useEffect, useRef, useCallback, forwardRef } from 'react'
import email from '../../assets/email.svg'
import Print from '../../assets/Print.svg'
import download from '../../assets/download.svg'
import Slider from "react-slick";
import { getCardDetaiails } from '../../store/actions/homeMedicineAction';
import { useDispatch, useSelector } from 'react-redux';
import { CsSpin, CsButton } from '../../components/ui';
import walgreen from "../../assets/walgreen.svg";
import cvs from "../../assets/cvsh.svg";
import walmart from "../../assets/walmart.svg";
import Kroger from "../../assets/Kroger.svg";
import { Result, Empty } from 'antd';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import Image from 'next/image';
import { sendEmailSavingCard } from '../../store/actions/savingCard';
import { RightCircleTwoTone, LeftCircleTwoTone } from '@ant-design/icons';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "block", backgroundColor: '#000', borderRadius: '50%' }}>
            <RightCircleTwoTone twoToneColor="#eb2f96"
                style={{ color: '#000' }}
            />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{ ...style, display: "block", backgroundColor: '#000', borderRadius: '50%' }}
        >
            <LeftCircleTwoTone twoToneColor="#eb2f96"
                style={{ color: '#000' }}
            />
        </div>
    );
}

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

const PresciptionCard = ({ t }) => {
    const [visible, setVisible] = useState({ isVisible: false, type: '' });
    const dispatch = useDispatch()
    const componentRef = useRef(null);
    const { cardInfo, isLoading, isError } = useSelector(({ home }) => home)
    const [loading, setLoading] = useState(false);
    const [sendEmailLoading, setEmailLoading] = useState(false);
    const auth = typeof window !== "undefined" && (localStorage.getItem('accessToken') || localStorage.getItem('googleToken'))

    // useEffect(() => {
    //     dispatch(getCardDetaiails())
    // }, [dispatch])

    const footer = {
        background: "linear-gradient(92.54deg, #333652 17.15%, #5e5151 33.5%, #856f4f 48.85%, #ab8e49 63.21%, #d2ae3f 77.57%, #fad02c 90.92%)",
    }

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
    });

    const ComponentToPrint = forwardRef((props, ref) => {
        return (
            <div ref={ref} className="flex flex-col items-center justify-center absolute z-[-100]" >
                <div className='sm:h-[332px] sm:w-[800px] w-[95%] sm:px-20 px-2 pt-10'>
                    {cardInfo?.map((cardInfo, indexedDB) => <Card key={cardInfo._id} className="presciption-card p-0 rounded-3xl sm:h-[332px] sm:min-w-[450px]" bodyStyle={{ padding: "0" }}>
                        <div className='flex flex-col justify-between sm:min-h-[332px] max-sm:h-[210px]'>
                            <div className="sm:text-[22px] text-14 font-semibold rounded-t-3xl px-4 py-1 text-white pb-4" style={footer}>
                                NiHowdy
                            </div>
                            <div className="px-4 sm:px-12 sm:pt-5 pt-2 flex sm:gap-14 gap-5 max-[440px]:leading-5">
                                <div >
                                    <div>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            <Trans i18nKey="BIN">
                                                <code>BIN</code>
                                            </Trans>
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">{cardInfo.bin}</div>
                                    </div>
                                    <div className='max-[440px]:leading-1'>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            <Trans i18nKey="PCN">
                                                <code>PCN</code>
                                            </Trans>
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">{cardInfo.pcn}</div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            <code>Group #</code>
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">
                                            {cardInfo.group}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            {t("Member ID")}
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">
                                            {(typeof (auth) !== "undefined") && cardInfo.member_id}
                                        </div>
                                        {(typeof (auth) === "undefined") && <div className="text-[#000] sm:text-20 text-16 font-thin">
                                            Sign up on nihowdy.com
                                            <div className="!text-red-500 text-12">Pharmacist, may default to 'NIHOWDY123'</div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-csYellow sm:text-14 text-[10px] rounded-b-3xl px-5 py-1 flex justify-between items-center pb-3 sm:mt-6 mt-3">
                                <div className="font-semibold">nihowdy.com</div>
                                <div>
                                    <div>Member Support</div>
                                    <div >(800)999-3053</div>
                                </div>
                                <div>
                                    <div className="font-bold">This is not insurance </div>
                                    {/* <div className='max-[440px]:block hidden pr-1'>,</div> */}
                                    <div className="font-semibold">This card is free</div>
                                </div>
                            </div>
                        </div>
                    </Card>)
                    }
                </div>
                <div className='sm:w-[800px] w-[95%] sm:px-20 px-2 sm:py-10 py-4 sm:mt-5'>
                    <Card bordered className="presciption-card sm:h-[332px] sm:text-12 text-[8px] max-sm:leading-[9px] leading-4 sm:p-5 py-2 max-sm:px-3 font-medium bg-csBGSmoke border-2 rounded-3xl sm:min-w-[500px]" bodyStyle={{ padding: "0px 0px" }}>
                        <div>
                            <div className='text-center'>
                                Accepted at approx 35,000
                                pharmacies nationwide!
                            </div>
                            <div className='flex justify-center w-[80%] gap-5 pt-2 mx-auto'>
                                <div><img className='max-w-[100%] max-h-[90%]' src={cvs} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[90%]' src={walgreen} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[90%]' src={walmart} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[90%]' src={Kroger} alt="" /></div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="text-csTextColor-2 grid justify-evenly border-r-2 sm:pr-3 pt-1 pr-1">
                                <div >
                                    For more information, to report issues, and
                                    to find participating pharmacies near you, <br />
                                    visit <span className='font-bold text-black'>nihowdy.com</span><br />
                                    or call <span className='font-bold text-black'>(800) 999-3053.</span>
                                </div>
                            </div>
                            <div className="text-csTextColor-2 sm:pl-3 pl-1">
                                <div className='text-csBG'>
                                    Member Instructions
                                </div>
                                <div>1. Present card to pharmacist.</div>
                                <div>2. Ask for discount on each
                                    prescription and save up to $95!
                                </div>
                                <div>3. Sign up on nihowdy.com for
                                    free drug rebates!
                                </div>
                                <div className='text-csBG'>Pharmacist Instructions</div>
                                <div> This card gives holder discounts
                                    through the BIN, PCN, Group on
                                    the front. If you need assistance
                                    call (877) 800-7820.
                                </div>
                            </div>
                        </div>
                        <div className="text-csTextColor-2">
                            <div className=''>The NiHowdy Program Prices, covered drugs, and pharmacies are subject to
                                change. By using this card, you agree to the terms & privacy policy found at
                                nihowdy.com/terms. Administered by Glic Health LLC,
                                One Marina Park Drive, Ste 1410, Boston MA 02210 - (844) 944-4542
                            </div>
                            <div>
                                CVS, KROGER, WALMART and WALGREENS logos are trademarks and/or
                                registered trademarks of CVS, KROGER, WALMART and WALGREEŃS,
                                respectively.
                            </div>
                        </div>
                    </Card>
                </div>
            </div >
        )
    })

    const exportAsImage = async (el, imageFileName) => {
        setLoading(true)
        const canvas = await html2canvas(el);
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, imageFileName);
        setLoading(false)
    };
    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        fakeLink.href = blob;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        fakeLink.remove();
    };

    const emailSavingCard = async () => {
        const auth = localStorage.getItem('accessToken') || localStorage.getItem('googleToken')
        if (auth) {
            setEmailLoading(true)
            const canvas = await html2canvas(componentRef.current);
            const image = canvas.toDataURL("image/png", 1.0);
            await dispatch(sendEmailSavingCard({ file_data: image }))
            setEmailLoading(false)
        } else {
            setVisible({ isVisible: true, type: 'email' })
        }
    }

    return (
        <>
            <div id='cardSection' className="flex justify-center items-center md:p-10 py-8 px-5 csTextColor-1 presciption bg-white">
                {!isLoading && !isError && cardInfo?.length > 0 && <ComponentToPrint ref={componentRef} text={"hello"} />}
                <div className="flex min-[991px]:w-[100%] w-[100%]  max-[991px]:flex-wrap min-[991px]:justify-evenly gap-10 max-sm:gap-5 items-center z-10">
                    <div>
                        <div className="py-2">
                            <div >
                                <span className="text-[32px] font-bold text-csTextColor-1">
                                    <Trans i18nKey="Prescription Savings Card" />
                                </span>
                            </div>
                        </div>
                        <div className="py-2">
                            <div >
                                <span className="text-16 font-normal text-csTextColor-1">
                                    {/* Simply show this FREE prescription savings card at your <br /> pharmacy to get instant discount on your medications. */}
                                    <Trans i18nKey="Simply show this FREE prescription savings" components={{ 1: <br /> }} />
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4 py-2">
                            <div>
                                <CsButton type='sc' loading={sendEmailLoading}
                                    onClick={emailSavingCard}
                                    className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={email} />}>
                                    <span className="!text-csBG max-sm:!hidden" >
                                        {t("Email")}
                                    </span>
                                </CsButton>
                            </div>
                            <div>
                                <CsButton type='sc' onClick={handlePrint} className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={Print} />}>
                                    <span className="text-csBG max-sm:!hidden">
                                        {t("Print")}
                                    </span>
                                </CsButton>
                            </div>
                            <div>
                                <CsButton type='sc' loading={loading}
                                    onClick={() => exportAsImage(componentRef.current, "NiHowdy Prescription Savings Card")}
                                    className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={download} />}>
                                    <span className="text-csBG max-sm:!hidden">
                                        {t("Download")}
                                    </span>
                                </CsButton>
                            </div>
                        </div>
                    </div>
                    <div className='min-[991px]:max-w-[650px] w-[100%] max-sm:px-3'>
                        <CsSpin spinning={isLoading}>
                            {!isLoading && !isError && cardInfo?.length === 0 && <Empty />}
                            {!isLoading && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
                            {!isLoading && !isError && cardInfo?.length > 0 && <Slider {...settings} >
                                <div className='presciption-card w-[90%] max-[991px]:grow '>
                                    {cardInfo?.map((cardInfo, indexedDB) => <Card key={cardInfo._id} className="presciption-card p-0 rounded-3xl sm:min-w-[450px]" bodyStyle={{ padding: "0" }}>
                                        <div className='flex flex-col justify-between sm:min-h-[332px] max-sm:h-[250px]'>
                                            <div className="sm:text-32 text-20 font-semibold rounded-t-3xl px-4 py-1 text-white" style={footer}>
                                                NiHowdy
                                            </div>
                                            <div className="px-4 sm:px-12 sm:pt-5 pt-2 flex sm:gap-14 gap-5 max-[440px]:leading-5">
                                                <div >
                                                    <div>
                                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                                            <Trans i18nKey="BIN">
                                                                <code>BIN</code>
                                                            </Trans>
                                                        </div>
                                                        <div className="text-[#000] sm:text-20 text-16 font-thin">{cardInfo.bin}</div>
                                                    </div>
                                                    <div className='max-[440px]:leading-1'>
                                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                                            <Trans i18nKey="PCN">
                                                                <code>PCN</code>
                                                            </Trans>
                                                        </div>
                                                        <div className="text-[#000] sm:text-20 text-16 font-thin">{cardInfo.pcn}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                                            <Trans i18nKey="GROUP #">
                                                                <code>GROUP #</code>
                                                            </Trans>
                                                        </div>
                                                        <div className="text-[#000] sm:text-20 text-16 font-thin">
                                                            {cardInfo.group}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                                            {t('Member ID')}
                                                        </div>
                                                        <div className="text-[#000] sm:text-20 text-16 font-thin">
                                                            {(typeof (auth) !== "undefined") && cardInfo?.member_id}
                                                        </div>
                                                        {(typeof (auth) === "undefined") && <div className="text-[#000] sm:text-20 text-16 font-thin">
                                                            {t("Sign up on nihowdy.com")}
                                                            <div className="!text-red-500 text-12">{t("Pharmacist, may default to 'NIHOWDY123'")}</div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-csYellow sm:text-14 text-[10px] rounded-b-3xl px-5 py-1 flex justify-between items-center">
                                                <div className="font-semibold">{t('nihowdy.com')}</div>
                                                <div>
                                                    <div>{t("Member Support")}</div>
                                                    <div >(800)999-3053</div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{t("This is not insurance")}</div>
                                                    <div className="font-semibold">{t("This card is free")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>)}
                                </div>
                                <div className='max-[991px]:grow'>
                                    <Card bordered className="presciption-card max-sm:h-[210px] sm:text-12 text-[8px] max-sm:leading-[9px] sm:p-5 py-2 max-sm:px-3 font-medium bg-csBGSmoke border-2 rounded-3xl sm:min-w-[500px]" bodyStyle={{ padding: "0px 0px" }}>
                                        <div>
                                            <div className='text-center'>
                                                {t('Accepted at approx 35,000 pharmacies nationwide!')}
                                            </div>
                                            <div className='flex justify-center w-[80%] gap-5 pt-2 mx-auto'>
                                                <div><Image className='max-w-[100%] max-h-[90%]' src={cvs} alt="" /></div>
                                                <div><Image className='max-w-[100%] max-h-[90%]' src={walgreen} alt="" /></div>
                                                <div><Image className='max-w-[100%] max-h-[90%]' src={walmart} alt="" /></div>
                                                <div><Image className='max-w-[100%] max-h-[90%]' src={Kroger} alt="" /></div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className="text-csTextColor-2 grid justify-evenly border-r-2 sm:pr-3 pt-1 pr-1">
                                                <div >
                                                    {t("For more information, to report issues, and to find participating pharmacies near you,")}
                                                    <br />
                                                    {t('visit')} <span className='font-bold text-black'>{t('nihowdy.com')}</span><br />
                                                    {t("or call")} <span className='font-bold text-black'>(800) 999-3053.</span>
                                                </div>
                                            </div>
                                            <div className="text-csTextColor-2 sm:pl-3 pl-1">
                                                <div className='text-csBG'>
                                                    {t('Member Instructions')}
                                                </div>
                                                <div>1. {t("Present card to pharmacist.")}</div>
                                                <div>2. {t('Ask for discount on each prescription and save up to $95!')}
                                                </div>
                                                <div>3. {t("Sign up on nihowdy.com for free drug rebates!")}
                                                </div>
                                                <div className='text-csBG'>{t('Pharmacist Instructions')}</div>
                                                <div> {t("This card gives holder discounts through the BIN, PCN, Group on the front. If you need assistance call")}<span> (877) 800-7820.</span></div>
                                            </div>
                                        </div>
                                        <div className="text-csTextColor-2">
                                            <div className=''>{t("The NiHowdy Program Prices, covered drugs, and pharmacies are subject to change. By using this card, you agree to the terms & privacy policy found at nihowdy.com/terms. Administered by Glic Health LLC, One Marina Park Drive, Ste 1410, Boston MA 02210 - (844) 944-4542")}
                                            </div>
                                            <div>
                                                {t("CVS, KROGER, WALMART and WALGREENS logos are trademarks and/or registered trademarks of CVS, KROGER, WALMART and WALGREEŃS, respectively.")}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Slider>}
                        </CsSpin>
                    </div>
                </div>
            </div>
            {/* <PdfJSX /> */}
            {visible.isVisible && <Modal exportRef={componentRef} visible={visible} setVisible={setVisible} />}
        </>
    )
}

export default PresciptionCard
