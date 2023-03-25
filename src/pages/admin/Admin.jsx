import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
import storeutil from "../../util/storeutil";
import Leftnav from "../../components/Leftnav/Leftnav";
import Header from "../../components/header/Header";

const { Footer, Sider, Content } = Layout;

const contentStyle = {
  color: "black",
};
const siderStyle = {
  color: "#fff",
};
const footerStyle = {
  color: "#fff",
};
function Admin() {
  const user = storeutil.getUser();
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Layout>
        <Sider style={siderStyle}>
          <Leftnav />
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Admin;
