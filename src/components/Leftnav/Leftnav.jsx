import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Menu } from "antd";

function Leftnav() {
  const nav = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([
    {
      label: "首页",
      key: "/home", // 唯一标识，这里认为是路径
      icon: <AppstoreOutlined />,
    },
    {
      label: "商品",
      key: "/products", // 唯一标识，这里认为是路径
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "品类管理",
          key: "/category",
          icon: <AppstoreOutlined />,
        },
        {
          label: "商品管理",
          key: "/product",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "用户管理",
      key: "/user", // 唯一标识，这里认为是路径
      icon: <AppstoreOutlined />,
    },
    {
      label: "角色管理",
      key: "/role", // 唯一标识，这里认为是路径
      icon: <AppstoreOutlined />,
    },
    {
      label: "图形图表",
      key: "/charts", // 唯一标识，这里认为是路径
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "折线图",
          key: "/charts/line",
          icon: <AppstoreOutlined />,
        },
        {
          label: "柱状图",
          key: "/charts/bar",
          icon: <AppstoreOutlined />,
        },
        {
          label: "饼状图",
          key: "/charts/pie",
          icon: <AppstoreOutlined />,
        },
      ],
    },
  ]);
  const [openKey, setOpenKey] = useState([]);
  const [path, setPath] = useState("");
  let newItems = [...items];
  useEffect(() => {
    // if (location.pathname == "/home") {
    //   setPath("/");
    // } else {
    //   setPath(location.pathname);
    // }
    setPath(location.pathname);

    newItems.map((item) => {
      if (item.children) {
        // 遍历子路由跟当前的路径匹配，如果匹配就把父亲打开
        // 根据location.pathname去和路由表进行匹配,匹配就拿到父亲的key
        item.children.some((cItem) => {
          //   console.log(cItem);
          if (location.pathname.indexOf(cItem.key) === 0) {
            // 表示匹配成功
            setOpenKey([item.key]);
          }
        });
      }
    });
  }, [location.pathname]);
  return (
    <>
      <Menu
        style={{ marginTop: "80px" }}
        selectedKeys={[path]}
        openKeys={openKey}
        mode="inline"
        theme="dark"
        items={items}
        onClick={({ key }) => {
          nav(key);
        }}
        onOpenChange={(openKey) => {
          setOpenKey(openKey);
        }}
      />
    </>
  );
}

export default Leftnav;
