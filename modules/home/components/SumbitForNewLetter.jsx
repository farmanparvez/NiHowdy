import { Row, Col, Input, Form } from "antd";
import { newsletterEmail } from "../../../store/actions/homeMedicineAction";
import { useDispatch, useSelector } from "react-redux";
import { CsButton } from "../../../components/ui";
import { Trans } from 'next-i18next'

const SumbitForNewLetter = (props) => {
  const { t } = props
  const { isLoading } = useSelector(({ home }) => home)
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(newsletterEmail({ email: values.email }))
  };

  return (
    <Row justify="center" align="center">
      <Col className="bg-csBG text-center text-white md:p-10 py-8 px-5 footer-search" span={24}>
        <h1 className="md:text-[40px] text-[32px] font-semibold">
          <Trans i18nKey="Interested in learning more about Bitcoin and medications" components={{ 1: <br /> }} >
            <code>Interested in learning more about Bitcoin and medications</code>
          </Trans>
          {/* Interested in learning more about <br /> Bitcoin and medications */}
        </h1>
        <h1 className="text-[20px] font-semibold">
          {t('Sign up to receive our weekly newsletter')}
        </h1>
        <h1 className="text-[14px] py-2">
          {t('Don’t worry, you can cancel or pause at any time')}
        </h1>
        <Form
          className="mt-3"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex justify-center items-center">
            <div className="w-[40%]">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input valid email!'
                  },
                ]}
              >
                <Input className="w-[100%] rounded-tl-[4px] rounded-bl-[4px] rounded-tr-[0px] rounded-br-[0px]" size="large" placeholder={t("Enter your email address")} />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <CsButton htmlType="submit" loading={isLoading} className='!rounded-br-[0px] !rounded-tr-[0px]' size="large" type='pr'>{t('Sign Up Now')}</CsButton>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SumbitForNewLetter;
