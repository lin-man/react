import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ExclamationCircleOutlined,
  AppstoreOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import storeutil from "../../util/storeutil";
import { formateDate } from "../../util/dateutil";
import { Button, Modal } from "antd";

function Header() {
  //   样式
  const box = {
    backgroundColor: "#011629",
    color: "white",
  };
  const right = {
    height: "100%",
    float: "right",
    marginRight: "50px",
  };
  //   路由表
  let menuList = [
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
  ];
  // 获取localStorage中的名字
  const user = storeutil.getUser();
  let { username } = user;
  //   获取本地时间
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
  //   声明一个存放定时器的容器
  let timer = null;
  //   放置于生命周期中调用
  useEffect(() => {
    getTime();

    return () => {
      clearInterval(timer);
    };
  }, []);
  //   处理时间的秒 让其能够动态显示
  const getTime = () => {
    // 写一个定时器
    timer = setInterval(() => {
      const nowTime = Date.now();
      //   重新设定时间
      setCurrentTime(formateDate(nowTime));
    }, 1000);
  };
  //   存放useNavigate方法
  let nav = useNavigate();
  //   存放useLocation
  let location = useLocation();
  //   logout 点击按钮触发 对话框
  let logout = () => {
    Modal.confirm({
      title: "你确定要退出登录嘛",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "狠心离开",
      cancelText: "心软留下",
      onOk() {
        // 清楚localstorage中的信息
        storeutil.removeUser();
        // 跳回登录页面
        nav("/login");
      },
      onCancel() {},
    });
  };
  //   获取当前位置
  const getTitle = () => {
    const path = location.pathname;
    let title;
    // 标题有两种情况 1 一级 2 二级
    menuList.forEach((item) => {
      //   console.log(item);
      if (item.key == path) {
        // console.log(item.key);
        // 说明位置是一级菜单
        title = item.label;
        // console.log(title);
      } else if (item.children) {
        // 根据path查找孩子对象
        const childItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) == 0
        );
        if (childItem) {
          // 说明找到对应元素了
          title = childItem.label;
        }
      }
    });
    return title;
  };
  const title = getTitle();
  return (
    <div style={box}>
      <div style={right}>
        <p style={{ marginBottom: "5px" }}>欢迎：{username}</p>
        <p style={{ marginBottom: "10px" }}>当前时间：{currentTime}</p>
        <Button type="primary" onClick={logout}>
          退出登录
        </Button>
      </div>
      <div
        style={{
          width: "200px",
          marginLeft: "20px",
          fontSize: "24px",
          lineHeight: "80px",
        }}
      >
        {title}
      </div>
    </div>
  );
}

export default Header;
