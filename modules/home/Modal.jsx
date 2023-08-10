import { CsModal, CsButton, CsInput } from "../../components/ui";
import { Form } from "antd";
import { emailDefautSavingCard } from "../../store/actions/homeMedicineAction";
import { useDispatch } from 'react-redux';
import html2canvas from "html2canvas";
import { useState } from "react";

const Otp = ({ setVisible, exportRef }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const canvas = await html2canvas(exportRef.current);
    const image = canvas.toDataURL("image/png", 1.0);
    console.log(image)
    await dispatch(emailDefautSavingCard({ email: values.email, file_data: image }))
    setLoading(false)
    setVisible(false);
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={<span className="text-white">Email</span>}
          name="email"
          rules={[
            {
              type:'email',
              required: true,
              message: "Please input your valid email!",
            },
          ]}
        >
          <CsInput placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <CsButton loading={loading} type="pr" htmlType="submit">
            Submit
          </CsButton>
        </Form.Item>
      </Form>
    </div>
  );
};

const Modal = ({ visible, setVisible, exportRef }) => {

  return (
    <CsModal
      title={visible.type === "email" && "Enter your email"}
      open={visible.isVisible}
      onOk={() => setVisible({ isVisible: false, type: '' })}
      onCancel={() => setVisible({ isVisible: false, type: '' })}
      footer={null}
    >
      {visible.type === "email" && <Otp setVisible={setVisible} exportRef={exportRef} />}
    </CsModal>
  );
};

export default Modal;
