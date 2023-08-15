import { Table } from "antd";
import bitcoin from "../../../assets/bitcoin.webp";
import ProtectedWrapper from "../../../utils/ProtectedWrapper";
import { useEffect } from "react";
import { getUserBitcoinTotalRewardAmount, getwithDrawHistory } from "../../../store/actions/bitcoinReward";
import { useDispatch, useSelector } from "react-redux";
import { CsSpin, CsButton } from "../../../components/ui";
import Modal from "./Modal";
import { setVisible, setPagination } from "../../../store/slice/bitcoinRewardSlice";
import { notificationHandler } from "../../../store/slice/globalSlice";
import bit from "../../../assets/bitcoin.svg"
import Image from "next/image";

const CrytoRewards = () => {
  const dispatch = useDispatch()
  const rewards = useSelector(({ reward }) => reward)
  const { isLoading, reward, isVisible, WithdrawHistoryData, pagination, isWithdrawHistoryLoading } = rewards
  const { isKycStatus } = useSelector(({ kyc }) => kyc)

  const onChange = (current, pageSize) => {
    dispatch(setPagination({ current, pageSize }));
    dispatch(getwithDrawHistory({ current, pageSize }))
  };

  useEffect(() => {
    dispatch(getwithDrawHistory(pagination))
    dispatch(getUserBitcoinTotalRewardAmount())
    //eslint-disable-next-line
  }, [dispatch])

  const checkIsKycCompleted = () => {
    if (isKycStatus !== 3) {
      dispatch(notificationHandler({ status: 'info', message: { en: 'Please complete your kyc first' } }))
    } else {
      dispatch(setVisible({ show: 1, visible: true }))
    }
  }

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: <span className="flex">Amount <img className="ml-2" src={bit} alt="" /></span>,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div>
          {new Date(record?.date)?.toISOString().substring(0, 10)}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <ProtectedWrapper>
      <CsSpin spinning={isLoading} >
        <div className="flex justify-center items-center">
          <div className="bg-white w-[100%] min-h-[400px] mx-auto pb-5">
            <div className="flex justify-between">
              <div className="w-[50%]">
                <div className="text-20 font-semibold p-4 text-csTextColor-10">
                  Bitcoin Rewards
                </div>
                <div
                  className="flex justify-between w-[90%] mx-auto items-baseline my-5 text-left"
                >
                  <div className="text-14 text-csTextColor-10 flex">Pending Rewards:</div>
                  <div className="text-16 text-black flex">{reward[0]?.pending_rewards}</div>
                </div>
                <div
                  className="flex justify-between w-[90%] mx-auto items-baseline my-5 text-left"
                >
                  <div className="text-14 text-csTextColor-10 flex">Earned Rewards:</div>
                  <div className="text-16 text-black flex">{reward[0]?.earned_rewards}</div>
                </div>
              </div>
              <div>
                <Image className="w-40 h-40" src={bitcoin} alt="" />
              </div>
            </div>
            <div>
              <div className="m-3">
                <Table
                  loading={isWithdrawHistoryLoading}
                  pagination={pagination}
                  onChange={onChange}
                  bordered
                  scroll={{ x: 500 }}
                  title={() => (
                    <div className="text-20 font-semibold text-csTextColor-10">
                      Rewards History
                    </div>
                  )}
                  dataSource={WithdrawHistoryData}
                  columns={columns}
                />
              </div>
              <div className="flex justify-center">
                <CsButton disabled={reward[0]?.earned_rewards <= 0} type="pr" onClick={checkIsKycCompleted}>Withdraw</CsButton>
              </div>
              <div className="flex justify-center p-2">
                Please note that it may take up to 30 days to receive the Bitcoin rewards in your account.            </div>
            </div>
          </div>
        </div>
        {isVisible?.visible && <Modal {...rewards} />}
      </CsSpin>
    </ProtectedWrapper >
  );
};

export default CrytoRewards;
