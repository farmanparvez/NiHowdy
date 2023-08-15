import { Fragment } from "react"
// import Map from "../../modules/Map/Map"
import DrugPage from "../../modules/drug"
// import { wrapper } from "@/store/store"
import { useTranslation } from "next-i18next"
// import { drugDetailByName } from "@/store/actions/medicineAction"
// import { wrapper } from "@/store/store"

const Index = () => {
    const props = useTranslation("common")
    return (
        <Fragment>
            <DrugPage {...props} />
            {/* <div>map</div> */}
        </Fragment>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) =>
//     async ({ params }) => {
//         await store.dispatch(drugDetailByName({ DrugName: params.name }))

//         return {
//             props: {
//                 // ...(await serverSideTranslations(locale, [
//                 //     'common',
//                 //     'translation',
//                 // ])),
//                 // Will be passed to the page component as props
//             },
//         }
//     })

export default Index