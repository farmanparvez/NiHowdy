import Account from "./Account"
import { useDispatch, useSelector } from "react-redux";
import QuestionSlideOne from "../../Question/QuestionSlideOne";
import QuestionSlideTwo from "../../Question/QuestionSlideTwo";
import { NIHDYDTL } from "../../../utils/enviroment";
import ProtectedWrapper from "../../../utils/ProtectedWrapper";
import { useEffect } from "react";
import { getState } from "../../../store/actions/accountAction";

const Index = (prp) => {
    const { show } = useSelector(({ auth }) => auth)
    const props = useSelector(({ profile }) => profile)
    const dispatch = useDispatch()
    const loginDetails = localStorage.getItem(NIHDYDTL) ? JSON.parse(localStorage.getItem(NIHDYDTL)) : ""
    const prop = { ...props, ...prp }

    useEffect(() => {
        dispatch(getState())
    }, [dispatch])

    return (
        <ProtectedWrapper>
            {!loginDetails?.is_profile_updated && show === 1 && <QuestionSlideOne {...prop} />}
            {!loginDetails?.is_profile_updated && show === 2 && <QuestionSlideTwo {...prop} />}
            {loginDetails?.is_profile_updated && <Account {...prop} />}
        </ProtectedWrapper>
    )
}

export default Index