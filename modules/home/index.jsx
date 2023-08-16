import { Fragment, useEffect } from "react"
import Hero from "./components/Hero"
import AvailablePharmacies from "./components/AvailablePharmacies"
import HowItsWorks from "./components/HowItsWorks"
// import PresciptionCard from "./PresciptionCard"
import TopRated from "./components/TopRated"
import Reward from "./components/Reward"
import BitcoinValveSection from "./components/BitcoinValveSection"
import FrequentlyAskQuestion from "./components/FrequentlyAskQuestion"
import SumbitForNewLetter from "./components/SumbitForNewLetter"
// import { useDispatch } from "react-redux"
// import { getPopularDrugs } from "../../store/actions/homeMedicineAction";
import { useQuery } from "@tanstack/react-query"
import { getPopularDrugAPI } from "@/service/homeAPI"
import { getCurrentUserAPI } from "@/service/authAPI"

const Home = (props) => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getPopularDrugs())
  // }, [dispatch])
  const user = useQuery({ queryKey: ['user'], queryFn: getCurrentUserAPI })
  console.log(user)
  const popularDrug = useQuery({ queryKey: ['popularDrug'], queryFn: getPopularDrugAPI })
  const data = { ...props, ...popularDrug }

  return (
    <Fragment>
      <Hero {...props} />
      <AvailablePharmacies {...props} />
      <HowItsWorks {...props} />
      {/* <PresciptionCard {...props} /> */}
      <TopRated {...data} />
      <Reward {...data} />
      <BitcoinValveSection {...props} />
      <FrequentlyAskQuestion {...props} />
      <SumbitForNewLetter {...props} />
    </Fragment>
  )
}

export default Home