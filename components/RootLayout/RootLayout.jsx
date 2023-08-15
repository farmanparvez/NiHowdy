import { Fragment } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Layout = (props) => {
    const prop = useTranslation('common')

    return (
        <Fragment>
            <Header {...prop} />
            <main className="pt-16">{props.children}</main>
            <Footer {...prop} />
        </Fragment>
    )
}

// export async function getStaticProps(context) {
//     // extract the locale identifier from the URL
//     const { locale } = context

//     return {
//         props: {
//             // pass the translation props to the page component
//             ...(await serverSideTranslations(locale), ['common', 'translation']),
//         },
//     }
// }

export default Layout