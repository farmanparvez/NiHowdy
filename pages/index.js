import { Inter } from 'next/font/google'
import HomeModule from "../modules/home"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPopularDrugs, getCardDetaiails, getRewardValueInYear } from '@/store/actions/homeMedicineAction'
// import { getPopularDrugAPI } from '@/service/homeAPI'
import { wrapper } from '@/store/store'
import RootLayout from '@/components/RootLayout/RootLayout'
// import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

function Home(prop) {
  const props = useTranslation('common')
  // console.log(data)

  return (
    <main className={`${inter.className}`}>
      <HomeModule {...props} />
    </main>
  )
}

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};


export const getStaticProps = wrapper.getStaticProps((store) =>
  async ({ locale }) => {
    // await store.dispatch(getPopularDrugs())
    // await store.dispatch(getCardDetaiails())
    // await store.dispatch(getRewardValueInYear())
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'translation',
        ])),
        // Will be passed to the page component as props
      },
    }
  })

export default Home
