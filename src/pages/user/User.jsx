import React, { useEffect, useState } from "react";
import { Button, Card, message, Modal, Table } from "antd";
import { reqAddOrUpdateUser, reqDelUser, reqUsers } from "../../Api";
import Addfrom from "./Addfrom";
import { formateDate } from "../../util/dateutil";

function User() {
  // 获取参数时 加载
  let [loading, setLoading] = useState(false);
  //   存放users
  let [users, setUsers] = useState([]);
  //   存放 roles
  let [roles, setRoles] = useState([]);
  //   控制弹窗的显示与隐藏
  let [isShow, setIsShow] = useState(false);
  //   声明一个容器 用于组件传参
  let [user, setUser] = useState({});
  //   获取角色id和角色名称组成键值对对象
  let [roleNames, setRoleNames] = useState({});
  //   存放传过来的form表单数据
  let [useForm, setUseForm] = useState(null);

  // 遍历角色列表,把id和对应的所属角色关联起来
  let initRoleNames = (roles) => {
    // 遍历角色列表,把id和对应的所属角色关联起来
    // console.log(roles);
    let roleNames = roles.reduce((pre, role) => {
      //   console.log(pre, role, 111);
      pre[role._id] = role.name;
      //   console.log(pre[role._id]);
      return pre;
    }, {});
    // console.log(roleNames);
    setRoleNames(roleNames);
  };
  // 控制弹出框的显示与隐藏
  let showAdd = () => {
    setIsShow(true);
    setUser({});
  };
  // 定义创建用户按钮
  let title = (
    <Button type="primary" onClick={showAdd}>
      创建用户
    </Button>
  );
  //   获取用户信息
  let getUser = async () => {
    setLoading(true); //先加载
    let result = await reqUsers();
    setLoading(false);
    // console.log(result);
    if (result.status == 0) {
      let { users, roles } = result.data;
      setUsers(users); //设置一下用户信息
      setRoles(roles); //组件传参使用
      initRoleNames(roles);
    }
  };
  //   点击添加或者修改
  let addOrUpdateUser = async () => {
    // 关闭弹窗
    setIsShow(false);
    // 收集表单数据
    // console.log(useForm);
    // 收集表单数据
    let user1 = useForm.getFieldsValue();
    useForm.resetFields(); //重置表单数据
    if (user._id) {
      // 判断user存在不存在 存在说明是修改不存在说明是添加
      user1._id = user._id;
    }
    let result = await reqAddOrUpdateUser(user1);
    if (result.status === 0) {
      message.success(`${user._id ? "修改" : "添加"}用户成功`);
      //   重新渲染一下
      getUser();
    }
    // console.log(user1);
  };
  //   删除数据
  let delUser = async (a) => {
    // console.log(a);
    let result = await reqDelUser(a._id);
    if (result.status === 0) {
      message.success("删除成功");
      getUser();
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  //   定义列表格式
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      render: formateDate,
    },
    {
      title: "所属角色",
      render: (user) => {
        // console.log(user);
        return <span>{roleNames[user.role_id]}</span>;
      },
    },
    {
      title: "操作",
      render: (a) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: "5px" }}
              onClick={() => {
                setIsShow(true);
                // console.log(a);
                setUser(a);
              }}
            >
              修改
            </Button>
            <Button type="primary" danger onClick={() => delUser(a)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card title={title}>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        pagination={{ defaultPageSize: 4 }}
      />
      <Modal
        title={users.id ? "修改用户" : "添加用户"}
        open={isShow}
        onCancel={() => setIsShow(false)}
        onOk={addOrUpdateUser}
      >
        <Addfrom
          user={user}
          roles={roles}
          setForm={(form) => setUseForm(form)}
        />
      </Modal>
    </Card>
  );
}

export default User;
