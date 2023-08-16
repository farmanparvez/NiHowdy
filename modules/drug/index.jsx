import MedicineDetail from "./MedicineDetail";
import PresciptioCard from "../home/components/PresciptionCard";
// import Footer from "../../layout/FooterBottom";
// import { Row } from "antd";
// import { useParams } from "react-router-dom";
import { drugDetailByName, drugDescriptionByName } from "../../store/actions/medicineAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEarBitcoin } from "../../store/slice/homeMedicineSlice";
import { useRouter } from "next/router";
// import { Helmet } from "react-helmet";

const Index = (props) => {
  const { query } = useRouter();
  const { name } = query
  // console.log(router.query.name)
  // const name = `${params?.name}${params['*'] ? "/" + params['*'] : ''}`

  const dispatch = useDispatch();
  useEffect(() => {
    if (name) {
      dispatch(setEarBitcoin(null))
      dispatch(drugDescriptionByName({ drug_name: name }))
      dispatch(drugDetailByName({ DrugName: name }))
    }
  }, [dispatch, name]);

  return (
    <div>
      {/* <Helmet>
        <title>Drug</title>
        <meta name="description" content="Nihowdy offers unparalleled discounts on prescribed drugs and over-the-counter drugs, while returning 3% of purchases as Bitcoin. Sign up now and supercharge your savings!" />
      </Helmet> */}
      <MedicineDetail {...props} />
      <PresciptioCard {...props} />
      {/* <Row justify="center" className="bg-white">
        <Footer {...props} />
      </Row> */}
    </div>
  );
};

export default Index;
