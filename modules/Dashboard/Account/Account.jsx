// import "../styles.scss";
import { useEffect } from "react";
import { useDispatch, } from "react-redux";
import { getProfile } from "../../../store/actions/profileActions";
import { CsSpin } from "@/components/ui";

const Account = ({ profile, isLoading, t }) => {
  const dispatch = useDispatch();

  const formatPhoneNumber = (value) => {

    const phoneNumber = value?.toString()

    // Remove all non-numeric characters from the phone number
    const cleanedNumber = phoneNumber?.replace(/\D/g, '');

    // Define the regex pattern to format the phone number
    const phoneNumberPattern = /(\d{3})(\d{3})(\d{4})/;

    // Use the .replace() method to format the phone number
    const formattedNumber = cleanedNumber?.replace(phoneNumberPattern, '$1-$2-$3');

    return formattedNumber;
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <CsSpin spinning={isLoading}>
      <div className="w-[100%] min-h-[100%] mx-auto">
        <div className="p-5 bg-white">
          <div className="text-20 font-bold text-csTextColor-10">
            Personal Info
          </div>
          <div className="py-3">
            <div className="text-14 text-csTextColor-10">{t('Email')}</div>
            <div className="text-16 text-black">{profile?.email}</div>
          </div>
          <div className="py-3">
            <div className="text-14 text-csTextColor-10">{t('Password')}</div>
            <div className="text-16 text-black">**********</div>
          </div>
          <div className="flex justify-between md:w-96 w-[100%] py-3">
            <div>
              <div className="text-14 text-csTextColor-10">{t("First Name")}</div>
              <div className="text-16 text-black">{profile?.first_name}</div>
            </div>
            <div>
              <div className="text-14 text-csTextColor-10">{t("Last Name")}</div>
              <div className="text-16 text-black">{profile?.last_name}</div>
            </div>
          </div>
          <div className="py-3">
            <div className="text-14 text-csTextColor-10">{t("Date of Birth")}</div>
            <div className="text-16 text-black">{profile?.date_of_birth}</div>
          </div>
          <div className="py-3">
            <div className="text-14 text-csTextColor-10">{t("Mobile Number")}</div>
            <div className="text-16 text-black">{formatPhoneNumber(profile?.mobile_number)}</div>
          </div>
        </div>
      </div>
    </CsSpin>
  );
};

export default Account;
