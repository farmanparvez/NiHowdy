import { useDispatch } from "react-redux";
import { CsModal } from "../../../components/ui";
import { setVisible } from "../../../store/slice/bitcoinRewardSlice";
import WithDrawBitcoin from "./WithDrawBitcoin";

const Modal = ( rewards ) => {
    const dispatch = useDispatch();
    const { isVisible } = rewards;

    return (
        <CsModal
            title="Tranfer Bitcoin"
            open={isVisible?.visible}
            onOk={() => dispatch(setVisible(false))}
            onCancel={() => dispatch(setVisible(false))}
            footer={null}
        >
            {isVisible?.show === 1 && <WithDrawBitcoin {...rewards} />}
            {/* {show === 2 && <Otp auth={auth} />} */}
            {/* {show === 3 && <ResetPasswordForm auth={auth} />} */}
        </CsModal>
    );
};

export default Modal;
