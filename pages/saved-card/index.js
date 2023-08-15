import DashboardContainer from "@/components/DashboardLayout/DashboardLayout"
import SavedCard from "@/modules/Dashboard/SavedCard/SavedCard"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation('commom')

    return (
        <SavedCard {...props} />
    )
}

Index.getLayout = (page) => {
    return <DashboardContainer>
        {page}
    </DashboardContainer>

};

export default Index