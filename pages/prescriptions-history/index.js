import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import RootLayout from "@/components/RootLayout/RootLayout"
import PrescriptionsHistory from "@/modules/Dashboard/PrescriptionsHistory/PrescriptionsHistory"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')

    return (
        <PrescriptionsHistory {...props} />
    )
}

Index.getLayout = (page) => {
    return <DashboardContainer>{page}</DashboardContainer>
};

export default Index