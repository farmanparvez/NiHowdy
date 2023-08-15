import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import BitcoinReward from "@/modules/Dashboard/BitcoinReward/BitcoinReward"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')
    return (<BitcoinReward {...props} />)
}


Index.getLayout = (page) => {
    return <DashboardContainer>
        {page}
    </DashboardContainer>
};

export default Index