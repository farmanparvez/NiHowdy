import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import Kyc from "@/modules/Dashboard/Kyc"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')

    return (
        <Kyc {...props} />
    )
}

Index.getLayout = (page) => {
    return <DashboardContainer>{page}</DashboardContainer>
};

export default Index