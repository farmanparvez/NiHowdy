import Otp from "./Otp";
import { useDispatch } from "react-redux";
import { CsModal } from "../../../components/ui";
import ResetPasswordForm from "./ResetPasswordForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { setVisible } from "../../../store/slice/authSlice";

const ForgetModal = ({ auth }) => {
  const dispatch = useDispatch();
  const { show, visible } = auth;

  return (
    <CsModal
      title="Forget Password"
      open={visible}
      onOk={() => dispatch(setVisible(false))}
      onCancel={() => dispatch(setVisible(false))}
      footer={null}
    >
      {show === 1 && <ForgotPasswordForm auth={auth} />}
      {show === 2 && <Otp auth={auth} />}
      {show === 3 && <ResetPasswordForm auth={auth} />}
    </CsModal>
  );
};

export default ForgetModal;
