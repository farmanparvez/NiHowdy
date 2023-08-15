import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import Account from "@/modules/Dashboard/Account/Account"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')
    return (<Account {...props} />)
}


Index.getLayout = (page) => {
    return <DashboardContainer>
        {page}
    </DashboardContainer>
};

export default Index