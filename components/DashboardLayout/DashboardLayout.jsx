import { Layout } from "antd";
import SideBar from "./SideBar";
import Header from "../RootLayout/Header";
import ProtectedWrapper from "@/utils/ProtectedWrapper";
import { Fragment } from "react";
const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <ProtectedWrapper>
        <Layout className="pt-16">
          <SideBar />
          <Layout >
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="border-2 h-[88vh] w-[100%] overflow-y-auto overflow-x-hidden bg-white">
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </ProtectedWrapper>
    </Fragment>
  );
};

export default DashboardLayout;
