
import { Form, Select } from "antd";
import { CsButton, CsInput, CsInputNumber } from "../../../components/ui";
import { withDrawBitcoin } from "../../../store/actions/bitcoinReward";
import { useDispatch } from "react-redux";
import { useState } from "react";
const { Option } = Select

const WithDrawBitcoin = (rewards) => {
    const dispatch = useDispatch()
    const [state, setState] = useState("")
    const { isWithdrawLoading, reward } = rewards

    const onFinish = (values) => {
        const data = { "earned_rewards": reward[0]?.earned_rewards, ...values }
        dispatch(withDrawBitcoin(data))
    };
    const handleChange = (value) => setState(value);

    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <div className="csSelect">
                    <Form.Item
                        label={<span className="text-white">Please select account type:</span>}
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: "Required",
                            },
                        ]}
                    >
                        <Select onChange={handleChange} className="w-full h-10" placeholder="Select" >
                            <Option value="email">Email</Option>
                            <Option value="address">Address</Option>
                        </Select>
                    </Form.Item>
                </div>
                {state === 'email' && <Form.Item
                    label={<span className="text-white">Email</span>}
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: "Required",
                        },
                    ]}
                >
                    <CsInput placeholder="Email" />
                </Form.Item>}
                {state === 'address' && <Form.Item
                    label={<span className="text-white">Address</span>}
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Required",
                        },
                    ]}
                >
                    <CsInput placeholder="Address" />
                </Form.Item>}
                <Form.Item
                    label={<span className="text-white">Amount</span>}
                    name="amount"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names) {
                                    return Promise.reject(new Error('Required'));
                                } else if (names <= 0) {
                                    return Promise.reject(new Error('Please enter a valid amount'));
                                } else if (names > reward[0]?.earned_rewards) {
                                    return Promise.reject(new Error('Amount enter is more than your  earn reward'));
                                }
                            },
                        },
                    ]}
                >
                    <CsInputNumber controls={false} style={{ width: "100%" }} placeholder="Amount" />
                </Form.Item>
                <Form.Item className="flex justify-center w-full mb-0">
                    <CsButton loading={isWithdrawLoading} type="pr" htmlType="submit"
                        className='flex justify-center min-w-[90%] sm:w-80 h-10'>
                        Withdraw
                    </CsButton>
                </Form.Item>
            </Form>
        </>
    )
}

export default WithDrawBitcoin