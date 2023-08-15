import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { CsButton } from "../../../components/ui";
import { resetPassword } from "../../../store/actions/authActions";

const ResetPasswordForm = ({ auth }) => {
  const dispatch = useDispatch();
  const { isForgotPasswordLoading, profileFormData } = auth;

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(resetPassword({ ...values, ...profileFormData }));
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
          className="prInputPassword"
          name="password"
          label={<span className="text-white">Password</span>}
          rules={[
            {
              required: true,
              message: "Please input your 8 digit password!",
              min: 8
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Password"
            className="!bg-csTextColor-9 h-10 !text-white"
          />
        </Form.Item>
        <Form.Item
          className="prInputPassword"
          name="confirm_password"
          label={<span className="text-white">Confirm Password</span>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your 8 digit password!",
              min: 8
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className="!bg-csTextColor-9 h-10 !text-white"
          />
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

export default ResetPasswordForm;
