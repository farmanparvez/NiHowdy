import React from "react";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { CsButton, CsInput } from "../../../components/ui";
import { forgetPassword } from "../../../store/actions/authActions";

const ForgotPasswordForm = ({ auth }) => {
  const dispatch = useDispatch();
  const { isForgotPasswordLoading } = auth;

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(forgetPassword(values));
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
          label={<span className="text-white">Email</span>}
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <CsInput placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <CsButton type="pr" htmlType="submit" loading={isForgotPasswordLoading}>
            Submit
          </CsButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
