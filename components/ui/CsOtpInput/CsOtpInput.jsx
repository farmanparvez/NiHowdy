import OtpInput from 'react18-input-otp';

const Inputcs = (props) => {
  return (
    <div className="">
      <OtpInput
        {...props}
        containerStyle='min-w-[100%] flex justify-center'
        inputStyle={`bg-csTextColor-9 h-10 min-w-[40px] text-white w-[100%] ${props?.csClassName}`}
      />
    </div>
  );
};

export default Inputcs;