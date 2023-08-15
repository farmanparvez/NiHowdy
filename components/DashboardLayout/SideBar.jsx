import { useState, useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
// import { NavLink, useLocation } from "react-router-dom";
// import "./style.scss";
import { ReactSVG } from "react-svg";
import menu from "./Menu";
import { NIHDYDTL } from "../../utils/enviroment";
import { useSelector, useDispatch } from "react-redux";
import { kycStatus } from "../../store/actions/kycAction";
import { UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";
const { Sider } = Layout;

const SideBar = () => {
  const router = useRouter()
  console.log(router)
  const dispatch = useDispatch()
  const [width, setWidth] = useState(true);
  const [broken, setBroken] = useState(true);
  // const [selectedKey, setSelectedKey] = useState()
  const [selectedKey, setSelectedKey] = useState(router.pathname)
  const loginDetails = typeof window !== 'undefined' && localStorage.getItem(NIHDYDTL) ? JSON.parse(localStorage.getItem(NIHDYDTL)) : ""
  const { isProfileUpdated } = useSelector(({ auth }) => auth)
  const { isKycStatus } = useSelector(({ kyc }) => kyc)

  useEffect(() => {
    dispatch(kycStatus())
    // eslint-disable-next-line
  }, [isProfileUpdated, dispatch])

  useEffect(() => {
    setSelectedKey(router.pathname)
  }, [router.pathname])

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={width}
      width={240}
      onBreakpoint={(broken) => {
        setBroken(broken);
      }}
      onCollapse={(collapsed) => {
        setWidth(collapsed);
      }}
      className="sidebar-cs"
    >
      <div className="flex justify-center items-center h-24 flex-col">
        <div className="w-12 h-12 bg-csBG rounded-full flex justify-center items-center text-white">
          {loginDetails?.first_name ? `${loginDetails?.first_name?.charAt(0)?.toUpperCase()}${loginDetails?.last_name?.charAt(0)?.toUpperCase()}` :
            <Avatar icon={<UserOutlined />} />
          }
        </div>
        <div className={`pt-1 text-[12px] ${(isKycStatus === 3 && 'text-[green]') || (isKycStatus === 4 && 'text-[red]')}`}>KYC is <span>{(isKycStatus === 1 && 'Pending') || (isKycStatus === 2 && 'Inprogress') || (isKycStatus === 3 && 'Completed') || (isKycStatus === 4 && 'Rejcted')}</span></div>
      </div >
      <hr />
      <Menu
        style={{ padding: "0" }}
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menu()?.map((icon) => ({
          key: icon.id,
          label: (
            <>
              <Link
                // onClick={() => setWidth(broken ? true : false)}
                // style={({ isActive }) => {
                //   return {
                //     padding: "20px",
                //     color: isActive ? "#333652" : "#6C6C6C",
                //   };
                // }}
                href={icon.link}
              >
                <div className="flex relative items-center">
                  <ReactSVG className="text-purple-600 mr-2" src={icon.icon} />
                  <span className="text-16 font-semibold ">{icon.name}</span>
                </div>
              </Link>
              {/* <div style={{ borderBottom: "2px solid gray" }} /> */}
            </>
          ),
        }))}
      />
    </Sider>
  );
};

export default SideBar;
