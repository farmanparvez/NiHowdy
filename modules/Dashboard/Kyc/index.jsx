import ProtectedWrapper from "../../../utils/ProtectedWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { CsSpin, CsButton } from "../../../components/ui";
import { kycStatus } from "../../../store/actions/kycAction";
import Steps from "./Step";
import { NIHDYDTL } from "../../../utils/enviroment";
import { Result } from "antd";
import { useRouter } from "next/router";

const Index = () => {
    const props = useSelector(({ kyc }) => kyc)
    const dispatch = useDispatch()
    const navigate = useRouter()
    const loginDetails = localStorage.getItem(NIHDYDTL) ? JSON.parse(localStorage.getItem(NIHDYDTL)) : ""

    useEffect(() => {
        dispatch(kycStatus())
        // dispatch(getSdKToken())
    }, [dispatch]);

    const profileNotUpdated = <Result
        title="Profile not updated. Please update your profile first"
        extra={
            <div className="flex justify-center items-center mx-auto">
                <CsButton onClick={() => navigate.push('/account')} type="pr">
                    <span className="max-sm:text-[12px]">
                        Go to Account section and update you profile
                    </span>
                </CsButton>
            </div>
        }
    />
    return (
        <ProtectedWrapper>
            <CsSpin spinning={props.isLoading}>
                <div className='p-5'>
                    <div className="text-20 font-bold text-csTextColor-10 pb-3">
                        KYC
                    </div>
                    {loginDetails?.is_profile_updated ? <Steps {...props} /> : profileNotUpdated}
                </div>
            </CsSpin>
        </ProtectedWrapper>
    )
}

export default Index
