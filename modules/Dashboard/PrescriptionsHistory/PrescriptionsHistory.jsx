import bitcoinLogo from "../../../assets/bitcoin 1.png";
import ProtectedWrapper from "../../../utils/ProtectedWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CsSpin, CsButton } from "../../../components/ui"
import { getRawTransaction } from "../../../store/actions/prescriptionHistoryAction";
import { reset } from "../../../store/slice/prescriptionHistorySlice";
import { Empty, Result, Pagination } from "antd";
import { setPagination } from "../../../store/slice/prescriptionHistorySlice";
import { NIHDYDTL } from "../../../utils/enviroment";
import { useRouter } from "next/router";

const Orders = () => {
  const { isLoading, RawTransactionDetails, pagination, isError } = useSelector(({ history }) => history)
  const dispatch = useDispatch()
  const navigate = useRouter()
  const loginDetails = localStorage.getItem(NIHDYDTL) ? JSON.parse(localStorage.getItem(NIHDYDTL)) : ""

  const profileNotUpdated = <Result
    title='Please ensure that you provide your personal information in the " My Account" section to access your transaction history, view your eligible bitcoin rewards, and make withdrawals of your bitcoin rewards.'
    extra={
      <div div className="flex justify-center items-center mx-auto" >
        <CsButton onClick={() => navigate.push('/account')} type="pr">
          <span className="max-sm:text-[12px]">
            Go to Account section and update you profile
          </span>
        </CsButton>
      </div >
    }
  />

  const onChange = (current, pageSize) => {
    dispatch(setPagination({ current, pageSize }));
    dispatch(getRawTransaction({ current, pageSize }))
  };

  useEffect(() => {
    dispatch(getRawTransaction(pagination))
    return () => dispatch(reset())
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <ProtectedWrapper>
      <CsSpin spinning={isLoading}>
        <div className="w-[100%] min-h-[400px] bg-white mx-auto">
          <div className="text-20 font-semibold p-4 text-csTextColor-10">Prescriptions History</div>
          <hr />
          {!isLoading && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
          {!isLoading && !isError && loginDetails?.is_profile_updated && RawTransactionDetails.length === 0 && <Empty />}
          {!isLoading && !isError && !loginDetails?.is_profile_updated && profileNotUpdated}
          {!isLoading && !isError && loginDetails?.is_profile_updated && RawTransactionDetails.length > 0 && RawTransactionDetails?.map(res =>
            <div className="border-b-2 p-5 flex items-center flex-wrap mb-2">
              {/* <div className="pr-2 ">
              <img src={img} alt="" />
            </div> */}
              <div className="flex items-center justify-between flex-wrap grow">
                <div>
                  <div className="text-20 font-semibold text-csTextColor-1">{res?.Drug_Name}</div>
                  <div className="flex flex-wrap py-1 gap-1 text-csTextColor-2">
                    <div className="pr-2">Form: <span className="font-semibold text-csTextColor-1">{res?.form || "--"}</span> </div>
                    <div>Dosage: <span className="font-semibold pr-2 text-csTextColor-1">{res?.Drug_Strength || "--"}</span></div>
                    <div>Quantity: <span className="font-semibold text-csTextColor-1">{res?.Drug_Quantity || "--"}</span> </div>
                  </div>
                  <div className="py-1 flex items-center text-csTextColor-1">
                    Price: <span className="font-bold mx-1">$ {res?.Patient_Amount}</span>
                  </div>
                  <div className="py-1 flex items-center text-csTextColor-1">
                    Bitcoin Rewards Earned: <span className="font-bold mx-1">{res?.BTC_earned_rewards}</span> <img src={bitcoinLogo} alt="" />
                  </div>
                  <div className="py-1 flex items-center text-csTextColor-1">
                    Pharmacy Name: <span className="font-bold mx-1">{res?.Pharmacy_Name} </span>
                  </div>
                  <div className="py-1 flex items-center text-csTextColor-1">
                    Pharmacy Address: <span className="font-bold mx-1">{res?.Pharmacy_Address1} </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center items-center py-5">
            {!isLoading && !isError && loginDetails?.is_profile_updated && <Pagination current={pagination.current} pageSize={10} onChange={onChange} total={pagination.totalCount} />}
          </div>
        </div>
      </CsSpin>
    </ProtectedWrapper>
  );
};

export default Orders;