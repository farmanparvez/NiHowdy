import { Form } from "antd";
import { CsButton, CsOtpInput } from "../../../components/ui";
import { useDispatch } from "react-redux";
import { verifyOtpForgotPassword } from "../../../store/actions/authActions";

const Otp = ({ auth }) => {
  const dispatch = useDispatch();
  const { isForgotPasswordLoading, profileFormData } = auth;

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(verifyOtpForgotPassword({ ...values, ...profileFormData }));
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={<span className="text-white">OTP</span>}
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP!",
            },
          ]}
        >
          <CsOtpInput isInputNum={true} numInputs={6} placeholder="OTP" separator={<span className="text-white mx-3 text-[#FAD02C]">-</span>} />
        </Form.Item>
        <Form.Item>
          <CsButton
            type="pr"
            htmlType="submit"
            loading={isForgotPasswordLoading}
          >
            Submit
          </CsButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Otp;
