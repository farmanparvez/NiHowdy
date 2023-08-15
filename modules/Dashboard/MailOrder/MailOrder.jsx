import ProtectedWrapper from "../../../utils/ProtectedWrapper"
import { Form, Radio, Select } from "antd";
import { getState } from "../../../store/actions/accountAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select

const MailOrder = () => {
  const { state } = useSelector(({ account }) => account)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getState())
  }, [dispatch])

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <ProtectedWrapper>
      <div className="w-[100%] min-h-[400px] mx-auto bg-white p-5">
        <div className=" bg-white">
          <div className="text-20 font-bold text-csTextColor-10 ">
            Mail Order
          </div>
          <div>
            <div className="py-3">We're in the process of developing a free mail-order solution. Would you like to stay updated? Also, may we know which state you are located in?</div>
            <div>
              <Form className="csRadioGroup"
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="State"
                  label={<span >State</span>}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Select className="w-full h-10" placeholder="State">
                    {state?.map((res, index) => <Option key={index} value={res?.name}>{res?.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="allergies"
                  label={<span >Are you interested?</span>}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Radio.Group className="rounded-2xl flex" >
                    <Radio.Button className="w-20 bg-csTextColor-9 text-white flex justify-center" value="a">Yes</Radio.Button>
                    <Radio.Button className="w-20 bg-csTextColor-9 text-white flex justify-center" value="B">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div >
    </ProtectedWrapper>
  )
}

export default MailOrder