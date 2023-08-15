// import bitcoin from "../../assets/bitcoin.svg";
// import plus from "../../assets/plus (2).svg";
import { useSelector } from "react-redux";
import { Empty, Form, Select, Skeleton, Result } from "antd";
import { useEffect } from "react";
import {
  getMedicinePricesByGeoCode,
  // drugImageByNdCode
} from "../../store/actions/medicineAction";
import { useDispatch } from "react-redux";
import {
  setFormField, setStrengthField, setQuantitField, resetIsUpdateState,
  // setDrugFilterData, resetPriceLoadedSuccess, setDiscountPercent
} from "../../store/slice/medicineSlice";
// import ScrollLink from "../../components/ScrollLink/ScrollLink";
// import { getCurrencyPrice } from "../../redux/actions/homeMedicineAction";
// import { Trans } from "react-i18next";
// import { DisplayMapFC } from "./DisplayMapFC";
// import Map from "./Map";
// import PharmacySearchMap from "./MapComponent";
import SearchComponent from "./SearchComponent";

const MedicineDetail = (props) => {
  const { drugDetail,
    drugDescription, isUpdate, isLoading, isError, isLoadingDrug,
    price, strengths, initialQuantity, quantity, NDCCode,
    // drugDetailList, isPriceLoading, isMecicinePriceLoadedSuccess, discountPercent 
  } = useSelector(({ medicine }) => medicine);
  // const { btcPrice, isLoading: loading, rewardPercentBasedOnPriceDetails } = useSelector(({ home }) => home)
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = props
  const pr = price[0]?.Price
  console.log(drugDetail)

  useEffect(() => {
    form.setFieldsValue({
      form: [drugDetail[0]?.types[0]?.dose],
      strength: [drugDetail[0]?.types[0]?.strength[0].Strength],
      quantity: [drugDetail[0]?.types[0]?.strength[0].Quantity[0]?.DisplayQuantity]
    })
    // eslint-disable-next-line
  }, [drugDetail])

  useEffect(() => {
    if (isUpdate) {
      getCordinate(initialQuantity, NDCCode)
    }
    return () => dispatch(resetIsUpdateState())
    // eslint-disable-next-line
  }, [dispatch, isUpdate]);

  const getCordinate = async (Quantity, ndcode) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(getMedicinePricesByGeoCode({ Latitude: position.coords.longitude, Longitude: position.coords.latitude, Quant: Quantity, NDC: ndcode }));
      },
      () => {
        console.log("Position could not be determined.");
        dispatch(getMedicinePricesByGeoCode({ Latitude: 34.0522, Longitude: -118.2437, Quant: Quantity, NDC: ndcode }));
      }
    );
  };

  const onFormChange = (value) => {
    const fil = drugDetail[0].types.filter(res => res.dose === value)
    form.setFieldsValue({ strength: fil[0].strength[0]?.Strength, quantity: fil[0]?.strength[0]?.Quantity[0]?.DisplayQuantity })
    dispatch(setFormField({ dose: fil[0]?.dose, strength: fil[0].strength, quantity: fil[0]?.strength[0]?.Quantity }))
  };

  const handleChangeStrength = (value) => {
    const fil = strengths.filter(res => res.Strength === value)
    form.setFieldsValue({ quantity: fil[0]?.Quantity[0]?.DisplayQuantity })
    dispatch(setStrengthField({ quantity: fil[0]?.Quantity, NDCCode: fil[0]?.Quantity[0]?.NDCCode }))
  };

  const handleQuantity = (value) => {
    const fil = quantity?.filter(res => res.DisplayQuantity === value)
    dispatch(setQuantitField(fil))
  }

  return (
    <div id="drugDetail">
      <div className="pt-5 bg-white">
        {isLoadingDrug && <div className="bg-white mx-5"><Skeleton avatar active size='large' paragraph={{ rows: 18, }} /></div>}
        {!isLoadingDrug && drugDescription?.length === 0 && !isError && <Empty className="h-[200px] pt-10" description={'No drug details found'} />}
        {!isLoadingDrug && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
        {!isLoadingDrug && !isError && drugDescription.length > 0 && <>
          <div className="flex max-[950px]:flex-col">
            <div className="w-[50%] max-[950px]:w-[100%]">
              <div>
                <div className="flex px-5 max-[1122px]:flex-col max-[950px]:flex-row max-[600px]:flex-col">
                  <div className="w-[100%] max-[1122px]:w-[100%]">
                    <div className="text-24 font-bold text-csTextColor-1">
                      {drugDescription[0]?.drug_name}
                    </div>
                    <div className="pb-2">
                      {drugDescription[0]?.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F8F8F8] px-5">
                <div>
                  <div className="font-24 font-semibold text-csTextColor-1 pt-5">
                    RX. <span className="text-[#616161]">Enter your presciption </span>
                  </div>
                  {isLoading && <div className="bg-white mx-5"><Skeleton avatar active size='large' paragraph={{ rows: 18, }} /></div>}
                  {!isLoading && drugDetail?.length === 0 && !isError && <Empty className="h-[200px] pt-10" description={'No drug details found'} />}
                  {!isLoading && isError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}
                  {!isLoading && !isError && drugDetail.length > 0 &&
                    <Form form={form}
                      name="horizontal_login"
                      initialValues={{
                        form: [drugDetail[0]?.types[0]?.dose],
                        strength: [drugDetail[0]?.types[0]?.strength[0].Strength],
                        quantity: [drugDetail[0]?.types[0]?.strength[0].Quantity[0]?.DisplayQuantity]
                      }}
                      className="flex gap-5 select-medicienDetails max-[420px]:flex-wrap max-[420px]:gap-1"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Form.Item className="max-[420px]:grow max-[420px]:w-[100%] w-[100%]"
                        label={<span className="text-14 text-[#616161]">{t("Form")}</span>}
                        name="form"
                        rules={[
                          {
                            required: true,
                            message: "Please input your form!",
                          },
                        ]}
                      >
                        <Select options={drugDetail[0]?.types?.map(res => { return { value: res.dose, label: res.value } })}
                          popupClassName="text-[#000]"
                          size="large"
                          onChange={onFormChange}
                          placeholder={
                            <span className="text-14 text-[#616161]">From</span>
                          }
                          className="border-[1px] rounded-md border-csBG"
                        />
                      </Form.Item>
                      <Form.Item className="max-[420px]:grow max-[420px]:w-[100%] w-[100%]"
                        label={<span className="text-14 text-[#616161]">{t("Dosage")}</span>}
                        name="strength"
                        rules={[
                          {
                            required: true,
                            message: "Please input your dosage!",
                          },
                        ]}
                      >
                        <Select onChange={handleChangeStrength}
                          size="large"
                          placeholder={
                            <span className="text-14 text-[#616161]">
                              Dosage
                            </span>
                          }
                          className="border-[1px] rounded-md border-csBG"
                          options={strengths?.map(res => { return { value: res.Strength, label: res.Strength } })}
                        />
                      </Form.Item>
                      <Form.Item className="md:!w-[35%] max-[420px]:!w-[100%]  sm:!w-[20%]"
                        label={
                          <span className="text-14 text-[#616161]">{t("Quantity")}</span>
                        }
                        name="quantity"
                        rules={[
                          {
                            required: true,
                            message: "Please input your quantity!",
                          },
                        ]}
                      >
                        <Select onChange={handleQuantity}
                          size="large"
                          placeholder={
                            <span className="text-14 text-[#616161]">{t("Quantity")}</span>
                          }
                          className="border-[1px] rounded-md border-csBG text-csBG"
                          options={quantity?.map(res => { return { value: res.DisplayQuantity, label: res.DisplayQuantity } })}
                        />
                      </Form.Item>
                    </Form>
                  }
                </div>
              </div>
              <div>
                <SearchComponent {...props} />
              </div>
            </div>
            <div className="w-[50%] max-[950px]:w-[100%] bg-[white]">
              {/* <PharmacySearchMap {...props} /> */}
            </div>
          </div>
        </>
        }
      </div>
    </div >
  );
};

export default MedicineDetail;