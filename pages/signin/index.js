import SignIn from "@/modules/SignIn/SignIn"
import { useTranslation } from "next-i18next"

const Index = () => {
    const props = useTranslation("common")
    return (
        <SignIn {...props} />
    )
}


export default Index