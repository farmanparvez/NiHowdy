import { Row, Col, Collapse } from "antd"
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import Link from "next/link";
const { Panel } = Collapse;

function FrequentlyAskQuestion({ t }) {

  return (
    <Row gutter={[10, 10]} justify='center' align='middle' className="md:p-10 py-8 px-5 bg-csLight ">
      <Col xs={24} sm={24} md={22} lg={18}>
        <div className="text-32 flex items-end">
          <div className="sm:text-32 text-18  font-semibold text-csTextColor-1">{t('Frequently Asked Questions')}</div>
        </div>
      </Col>
      <Col sm={24} md={24} lg={18} className='csCollapse'>
        <Collapse className="mt-4" expandIconPosition={'end'} expandIcon={({ isActive }) => isActive ? <MinusCircleFilled style={{ color: '#333652' }} /> : <PlusCircleFilled style={{ color: '#333652' }} />} >
          {/* {text.map((det, index) => <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{det.title}</span>} key={index}> <p className="text-14  text-csTextColor-1 font-semibold">{det.desc}</p> </Panel>)} */}
          <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{t("How does NiHowdy work?")}</span>} > <p className="text-14  text-csTextColor-1 font-semibold">{t("ANSWER-1")}</p> </Panel>
          <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{t("How can I obtain NiHowdy's Prescription Savings Card?")}</span>} > <p className="text-14  text-csTextColor-1 font-semibold">{t("ANSWER-2")}</p> </Panel>
          <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{t("Can I use this prescription savings card for both generic and brand-name medications?")}</span>} > <p className="text-14  text-csTextColor-1 font-semibold">{t("ANSWER-3")}</p> </Panel>
          <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{t("Are there any fees associated with using the prescriptoin savings card?")}</span>} > <p className="text-14  text-csTextColor-1 font-semibold">{t("ANSWER-4")}</p> </Panel>
          <Panel className="bg-white mb-4" header={<span className="16 font-semibold text-csTextColor-1">{t("Can I combine NiHowdy's free Bitcoin back with other discounts or insurance benefits?")}</span>} > <p className="text-14  text-csTextColor-1 font-semibold">{t("ANSWER-5")}</p> </Panel>
        </Collapse>
      </Col>
      <Col sm={24} md={24} lg={18} className="text-right">
        <span className="font-semibold text-csTextColor-1">
          <Link href='/additional-faqs'>
            For more details, kindly refer to the additional FAQs section.
          </Link>
        </span>
      </Col>
    </Row>
  )
}

export default FrequentlyAskQuestion