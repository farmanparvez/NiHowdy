import { Inter } from 'next/font/google'
import HomeModule from "../modules/home"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPopularDrugs } from '@/store/actions/homeMedicineAction'
const inter = Inter({ subsets: ['latin'] })

function Home(prop) {
  console.log(prop)
  const props = useTranslation('common')

  return (
    <main className={`${inter.className}`}>
      <HomeModule {...props} />
    </main>
  )
}


export async function getStaticProps({ locale }) {
  // const data  = 
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'translation',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default Home
