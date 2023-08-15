import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import MailOrder from "@/modules/Dashboard/MailOrder/MailOrder"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')

    return (
        <MailOrder {...props} />
    )
}

Index.getLayout = (page) => {
    return <DashboardContainer>{page}</DashboardContainer>
};

export default Index