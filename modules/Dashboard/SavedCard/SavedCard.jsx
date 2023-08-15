// import "../styles.scss"
import Modal from "../../Home/Modal";
import { Card, Result, Empty, Row, Col } from "antd";
import { ReactSVG } from "react-svg";
import React, { useEffect, useState, useRef, useCallback, forwardRef } from 'react'
import email from '../../../assets/email.svg'
import Print from '../../../assets/Print.svg'
import download from '../../../assets/download.svg'
import ProtectedWrapper from "../../../utils/ProtectedWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getProfileSavingCard } from "../../../store/actions/savingCard";
import { CsSpin, CsButton } from "../../../components/ui";
import walgreen from "../../../assets/walgreen.svg";
import cvs from "../../../assets/cvsh.svg";
import walmart from "../../../assets/walmart.svg";
import Kroger from "../../../assets/Kroger.svg";
import { Trans } from 'react-i18next';
import Slider from "react-slick";
import html2canvas from "html2canvas";
import { useReactToPrint } from 'react-to-print';
import { sendEmailSavingCard } from "../../../store/actions/savingCard";
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

const SavedCard = () => {
    const [visible, setVisible] = useState({ isVisible: false, type: '' });
    const { isLoading, profileSavingCardDetail, isError } = useSelector(({ profileSavingCard }) => profileSavingCard)
    const [sendEmailLoading, setEmailLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const componentRef = useRef(null);
    const dispatch = useDispatch()
    const exportRef = useRef();

    useEffect(() => {
        dispatch(getProfileSavingCard())
    }, [dispatch])

    const footer = {
        background: "linear-gradient(92.54deg, #333652 17.15%, #5e5151 33.5%, #856f4f 48.85%, #ab8e49 63.21%, #d2ae3f 77.57%, #fad02c 90.92%)",
    }

    const ComponentToPrint = forwardRef((props, ref) => {
        return (
            <div ref={ref} className="flex flex-col items-center justify-center">
                <div className='sm:h-[332px] sm:w-[800px] w-[95%]  sm:px-20 px-2 pt-10'>
                    {!isLoading && !isError && profileSavingCardDetail?.length > 0 && profileSavingCardDetail?.map((cardInfo, indexedDB) => <Card key={cardInfo?._id} className="presciption-card p-0 rounded-3xl sm:min-w-[450px]" bodyStyle={{ padding: "0" }}>
                        <div className='flex flex-col justify-between sm:min-h-[332px] max-sm:h-[210px]'>
                            <div className="sm:text-[22px] text-14 font-semibold rounded-t-3xl px-4 pb-4 text-white"
                                style={footer}>
                                NiHowdy
                            </div>
                            <div className="px-2 sm:px-12 sm:pt-5 flex gap-14 max-sm:leading-[17px]">
                                <div>
                                    <div>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            <Trans i18nKey="BIN">
                                                <code>BIN</code>
                                            </Trans>
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">{cardInfo.bin}</div>
                                    </div>
                                    <div>
                                        <div className="text-csBG sm:text-16 text-12 font-semibold ">
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
                                    <div >
                                        <div className="text-csBG sm:text-16 text-12 font-semibold">
                                            Member ID
                                        </div>
                                        <div className="text-[#000] sm:text-20 text-16 font-thin">
                                            {cardInfo.member_id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sm:py-2 max-sm:pt-1 max-sm:pb-2 max-sm:!leading-1 px-4 text-[#000] font-thin sm:text-14 text-[8px]'>Make sure to present this membership card to your pharmacist as it is specific to you and provides access to preferred pricing and unique Bitcoin rewards.</div>
                            <div className="bg-csYellow sm:text-14 text-[9px] rounded-b-3xl px-5 pb-3 flex justify-between items-center">
                                <div className="font-semibold">nihowdy.com</div>
                                <div>
                                    <div>Member Support</div>
                                    <div >(800)999-3053</div>
                                </div>
                                <div>
                                    <div className="font-bold">This is not insurance </div>
                                    <div className="font-semibold">This card is free</div>
                                </div>
                            </div>
                        </div>
                    </Card>)}
                </div>
                <div className='sm:w-[800px] w-[96%] sm:px-20 px-2 sm:py-10 py-4 sm:mt-5'>
                    <Card bordered className="presciption-card sm:h-[332px] flex items-center sm:text-12 text-[8px] max-sm:leading-[9px] leading-4 sm:py-2 sm:px-4 px-2 font-medium bg-csBGSmoke border-2 rounded-3xl sm:min-w-[500px]" bodyStyle={{ padding: "0px 0px" }}>
                        <div>
                            <div className='text-center'>
                                Accepted at approx 35,000
                                pharmacies nationwide!
                            </div>
                            <div className='flex justify-center w-[80%] gap-5 pt-3 mx-auto'>
                                <div><img className='max-w-[100%] max-h-[80%]' src={cvs} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[80%]' src={walgreen} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[80%]' src={walmart} alt="" /></div>
                                <div><img className='max-w-[100%] max-h-[80%]' src={Kroger} alt="" /></div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="text-csTextColor-2 grid justify-evenly border-r-2 sm:pr-3 pr-1">
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
                        <div className="text-csTextColor-2 mb-3">
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
            </div>
        )
    })

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName"
    });

    const exportAsImage = async (el, imageFileName) => {
        setLoading(true)
        const canvas = await html2canvas(el);
        const image = canvas.toDataURL("image/png", 1.0);
        console.log(image)
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
        setEmailLoading(true)
        const canvas = await html2canvas(componentRef.current);
        const image = canvas.toDataURL("image/png", 1.0);
        await dispatch(sendEmailSavingCard({ file_data: image, }))
        setEmailLoading(false)
    }

    return (
        <ProtectedWrapper>
            <CsSpin spinning={isLoading}>
                <div className="flex justify-center items-center min-h-[100%] relative pt-5">
                    <div className="flex justify-center items-center w-[100%] bg-[#f5f5f5] relative">
                        {/* <div className="w-[100%] min-h-[100%] bg-white"> */}
                        <div>
                            {!isLoading && <ComponentToPrint ref={componentRef} text={"NiHowdy Prescription Savings Card"} />}
                        </div>
                        <div className="w-[100%] min-h-[100%] bg-white absolute top-0">
                            <div>
                                <span className="text-20 font-bold p-10 text-csTextColor-10">Savings Card</span>
                            </div>
                            <div ref={exportRef} className='presciption-card flex items-center flex-col mb-5 pt-3'>
                                <div className='min-[991px]:max-w-[700px] w-[100%] px-8'>
                                    {/* <CsSpin spinning={isLoading}> */}
                                    {!isLoading && !isError && profileSavingCardDetail?.length === 0 && <Empty />}
                                    {!isLoading && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
                                    {!isLoading && !isError && profileSavingCardDetail?.length > 0 && <Slider {...settings}>
                                        <div className='w-[90%] max-[991px]:grow'>
                                            {profileSavingCardDetail?.map((cardInfo, indexedDB) => <Card key={cardInfo._id} className="presciption-card p-0 rounded-3xl sm:min-h-[306px] sm:min-w-[450px]" bodyStyle={{ padding: "0" }}>
                                                <div className='flex flex-col justify-between sm:min-h-[332px] max-sm:h-[210px]'>
                                                    <div className="sm:text-32 text-14 font-semibold rounded-t-3xl px-4 py-1 text-white" style={footer}>
                                                        NiHowdy
                                                    </div>
                                                    <div className="px-2 sm:px-12 sm:pt-5 pt-2 flex gap-14 max-sm:leading-5">
                                                        <div>
                                                            <div >
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
                                                            <div >
                                                                <div className="text-csBG sm:text-16 text-12 font-semibold">
                                                                    Member ID
                                                                </div>
                                                                <div className="text-[#000] sm:text-20 text-16 font-thin">
                                                                    {cardInfo.member_id}
                                                                </div>
                                                                {/* <div className="text-[#000] sm:text-20 text-16 font-thin">
                                                                Sign up on nihowdy.com
                                                                <div className="text-red-300 text-12">Pharmacist, may default to 'NIHOWDY123'</div>
                                                            </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='sm:py-2 py-1 sm:px-4 px-2 text-[#000] font-thin sm:text-14 text-[10px]'>Make sure to present this membership card to your pharmacist as it is specific to you and provides access to preferred pricing and unique Bitcoin rewards.</div>
                                                    <div className="bg-csYellow sm:text-14 text-[9px] rounded-b-3xl px-5 py-1 flex justify-between items-center">
                                                        <div className="font-semibold">nihowdy.com</div>
                                                        <div>
                                                            <div>Member Support</div>
                                                            <div >(800)999-3053</div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">This is not insurance </div>
                                                            <div className="font-semibold">This card is free</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>)}
                                        </div>
                                        <div className='max-[991px]:grow'>
                                            <Card bordered className="presciption-card flex items-center sm:h-[332px] max-sm:h-[210px] sm:text-[11px] text-[8px] max-sm:leading-[9px] sm:py-2 sm:px-4 px-2 font-medium bg-csBGSmoke border-2 rounded-3xl sm:min-w-[500px]" bodyStyle={{ padding: "0px 0px" }}>
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
                                    </Slider>}
                                </div>
                            </div>
                            <div>
                                {!isLoading && !isError && profileSavingCardDetail?.length > 0 && <Row gutter={[20, 20]} justify='center' align='middle' className="py-2">
                                    <Col><CsButton type="sc" loading={sendEmailLoading} onClick={emailSavingCard} className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={email} />}><span className="text-csBG text-16">Email</span></CsButton></Col>
                                    <Col><CsButton type="sc" onClick={handlePrint} className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={Print} />}><span className="text-csBG text-16">Print</span></CsButton></Col>
                                    <Col><CsButton type="sc" onClick={() => exportAsImage(componentRef.current, "NiHowdy Prescription Savings Card")} loading={loading} className="text-16 font-normal text-csBG" icon={<ReactSVG className="mr-1" src={download} />}><span className="text-csBG text-16">Download</span></CsButton></Col>
                                </Row>}
                            </div>
                        </div>
                        {visible.isVisible && <Modal visible={visible} setVisible={setVisible} />}
                    </div>
                </div>
                {/* </div> */}
            </CsSpin>
        </ProtectedWrapper>
    )
}

export default SavedCard
