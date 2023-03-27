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
import storeutil from "../../util/storeutil";

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
  // useEffect(() => {
  //   // if (location.pathname == "/home") {
  //   //   setPath("/");
  //   // } else {
  //   //   setPath(location.pathname);
  //   // }
  //   setPath(location.pathname);

  //   newItems.map((item) => {
  //     if (item.children) {
  //       // 遍历子路由跟当前的路径匹配，如果匹配就把父亲打开
  //       // 根据location.pathname去和路由表进行匹配,匹配就拿到父亲的key
  //       item.children.some((cItem) => {
  //         //   console.log(cItem);
  //         if (location.pathname.indexOf(cItem.key) === 0) {
  //           // 表示匹配成功
  //           setOpenKey([item.key]);
  //         }
  //       });
  //     }
  //   });
  // }, [location.pathname]);

  let newchildren = []; //定义一个空数组
  let newArr = []; //用于存储匹配到的菜单

  // 登陆成功的时候，role里面都有一个menus字段 ['/product','/user']

  useEffect(() => {
    setPath(location.pathname);
    // console.log(1111, menus);
    let menus = storeutil.getUser().role.menus;
    let username = storeutil.getUser().username;
    if (username == "admin") {
      // 说明是管理员
      setItems([...items]);
    } else {
      // 如果不是admin的话，需要进行匹配，也就是从items里面筛选符合条件的项
      items.map((item) => {
        // console.log(item);
        let { key } = item;
        // console.log(key);
        if (menus.indexOf(key) != -1) {
          // console.log(111, item);
          newArr.push(item);
        } else if (item.children) {
          newchildren = []; //如果该路由有二级路由的话  先清空一下newchildren数组 防止污染
          item.children.find((child) => {
            // 找到符合条件的孩子路由
            if (menus.indexOf(child.key) != -1) {
              newchildren.push(child);
            }
          });
          if (newchildren.length > 0) {
            newArr.push({ ...item, children: newchildren });
          }
        }
      });
      newArr.unshift({
        label: "首页",
        key: "/home",
        icon: <AppstoreOutlined />,
      });
      setItems(newArr);
    }
  }, [location.pathname]);
  useEffect(() => {
    items.map((item) => {
      // console.log(item);
      if (item.children) {
        item.children.some((cItem) => {
          if (location.pathname.indexOf(cItem.key) == 0) {
            setOpenKey([item.key]); //打开父亲
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
