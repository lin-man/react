import React, { useState, useImperativeHandle, useEffect } from "react";
import { Form, Tree, Input } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
let Item = Form.Item;
const treeData = [
  {
    title: "首页",
    key: "/",
    icon: <AppstoreAddOutlined />,
  },
  {
    title: "商品",
    key: "/products",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        title: "品类管理",
        key: "/category",
        icon: <AppstoreAddOutlined />,
      },
      {
        title: "商品管理",
        key: "/product",
        icon: <AppstoreAddOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <AppstoreAddOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <AppstoreAddOutlined />,
  },
  {
    title: "图形图表",
    key: "/charts",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        title: "折线图",
        key: "/charts/line",
        icon: <AppstoreAddOutlined />,
      },
      {
        title: "柱状图",
        key: "/charts/bar",
        icon: <AppstoreAddOutlined />,
      },
      {
        title: "饼状图",
        key: "/charts/pie",
        icon: <AppstoreAddOutlined />,
      },
    ],
  },
];
function Updateform(props, ref) {
  // 定义一下状态
  let [checkedKeys, setCheckedKeys] = useState([]);
  let { menus } = props.role; //传递过来的参数
  //   父组件通过useRef接受子组件传递的属性或方法
  useImperativeHandle(ref, () => ({
    getMenus: () => checkedKeys,
  }));
  useEffect(() => {
    setCheckedKeys(menus);
  }, [props.role, menus]);
  const onCheck = (checkedKeys) => {
    // console.log(checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  return (
    <div>
      <Item label="角色名称">
        <Input disabled value={props.role.name} />
      </Item>
      <Tree
        treeData={treeData}
        checkable
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </div>
  );
}

export default React.forwardRef(Updateform);
