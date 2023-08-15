// import { useEffect } from "react";
import { Input, Form } from "antd";
import { CsButton } from "../../components/ui";
// import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import ForgetModal from "./ForgotPassword/ForgetModal";
import {  googleSignUp, facebookSignUp } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { setVisible, setIsLogin } from "../../store/slice/authSlice";
// import { openNotificationWithIcon } from "../../utils/notification";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignIn = ({ t }) => {
  const auth = useSelector((state) => state.auth);
  const { isLoading, visible, isLogin } = auth;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // let [searchParams, setSearchParams] = useSearchParams();
  // const parmans = searchParams.get('error')

  // useEffect(() => {
  //   const val = parmans ? window.atob(parmans) : ''
  //   if (parmans) {
  //     openNotificationWithIcon("error", val);
  //     setSearchParams('', { replace: true })
  //   }
  // }, [parmans, setSearchParams]);

  // useEffect(() => {
  //   if (isLogin) {
  //     dispatch(setIsLogin(false))
  //     navigate('/saved-card')
  //   }
  //   // return () => dispatch(reset())
  // }, [isLogin, navigate, dispatch]);

  const onFinish = async (values) => {
    // const data = { values, navigate };
    // dispatch(signIn(data));
    const result = await signIn('credentials', {
      redirect: false,
      email: values?.email,
      password: values?.password
    });
    console.log(result)
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="min-h-[92vh] w-4/5 max-xl:w-[95%] mx-auto flex flex-wrap justify-center items-center">
        <div className="basis-1/3	h-full flex justify-center flex-col grow ">
          <div className="md:min-h-[70vh] min-h-[150px] pt-10 w-[80%] min-w-[300px] mx-auto flex grow flex-col">
            <div className="text-[36px] font-semibold text-black">
              {t("Welcome Back!")}
            </div>
            <div className="text-16 text-black">
              {t("Save on prescription while earning cryptocurrency")}
            </div>
          </div>
        </div>
        <div className="basis-1/3	 h-full flex justify-center items-center grow flex-col ">
          <div className="max-sm:mb-10 py-10 sm:p-10 bg-csBG w-[100%] md:w-[90%] min-h-[70vh] rounded-[4px] sm:min-w-[450px]  shadow-sigin-card-boxShadow flex grow justify-center items-center flex-col">
            <div className="w-3/4">
              <div
                onClick={() => dispatch(googleSignUp())}
                className="bg-white p-3 my-4 h-10 rounded-sm  text-center flex justify-center items-center cursor-pointer"
              >
                <Image className="w-6 h-6 mr-2" src={Google} alt="" />
                {t("Continue with Google")}
              </div>
              <div
                onClick={() => dispatch(facebookSignUp())}
                className="bg-white  p-3 h-10 my-2 rounded-sm text-center flex justify-center items-center cursor-pointer"
              >
                <Image className="w-6 h-6 mr-2" src={facebook} alt="" />
                {t("Continue with Facebook")}
              </div>
              <div className="flex items-center my-4">
                <div className="border-b border-[#DADADA] w-3/4"></div>
                <div className="text-[#DADADA] px-2">{t("or")}</div>
                <div className="border-b border-[#DADADA] w-3/4"></div>
              </div>
              <Form
                className="signup-and-signin-for-container"
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  className="my-4"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="h-10 w-full rounded-[4px]"
                    placeholder={t("Email")}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-2"
                  name="password"
                  rules={[
                    {
                      required: true,
                      min: 8,
                      message: "Please input your 8 digit password!"
                    },
                  ]}
                >
                  <Input.Password
                    className="h-10 w-full rounded-[4px]"
                    placeholder={t("Password")}
                  />
                </Form.Item>
                <div
                  className="text-[#F8F8F8] font-semibold text-14 mb-6 cursor-pointer "
                  onClick={() => dispatch(setVisible(true))}
                >
                  {t("Forgot password?")}
                </div>
                <Form.Item className="my-4">
                  <CsButton
                    loading={isLoading}
                    className="w-full text-center flex justify-center !h-10"
                    type="pr"
                    htmlType="submit"
                  >
                    <span className="text-[14] font-semibold text-black">
                      Sign In
                    </span>
                  </CsButton>
                </Form.Item>
              </Form>
              <div className="text-[#F8F8F8] py-2 flex justify-center items-center ">
                {t("New to NiHowdy?")}
                <span className="font-semibold ml-2">
                  <Link href="/signup">{t("Join now")}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <ForgetModal auth={auth} />}
    </div>
  );
};

export default SignIn;
