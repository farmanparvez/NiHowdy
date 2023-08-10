import { Fragment, useEffect } from "react"
import Hero from "./Hero"
import AvailablePharmacies from "./AvailablePharmacies"
import HowItsWorks from "./HowItsWorks"
import PresciptionCard from "./PresciptionCard"
import TopRated from "./TopRated"
import Reward from "./Reward"
import BitcoinValveSection from "./BitcoinValveSection"
import FrequentlyAskQuestion from "./FrequentlyAskQuestion"
import SumbitForNewLetter from "./SumbitForNewLetter"
import { useDispatch } from "react-redux"
import { getPopularDrugs } from "../../store/actions/homeMedicineAction";


const Home = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularDrugs())
  }, [dispatch])

  return (
    <Fragment>
      <Hero {...props} />
      <AvailablePharmacies {...props} />
      <HowItsWorks {...props} />
      <PresciptionCard {...props} />
      <TopRated {...props} />
      <Reward {...props} />
      <BitcoinValveSection {...props} />
      <FrequentlyAskQuestion {...props} />
      <SumbitForNewLetter {...props} />
    </Fragment>
  )
}

export default Home