import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Table, Modal, message, Popconfirm } from "antd";
import { reqAddRole, reqDeleteRole, reqRoles, reqUpdateRole } from "../../Api";
import Addform from "./Addform";
import { formateDate } from "../../util/dateutil";
import Updateform from "./Updateform";
import storeutil from "../../util/storeutil";
function Role() {
  // 声明存放获取列表的数据
  let [roles, setRoles] = useState([]);
  //   声明存放被选择哪一行的数据
  let [role, setRole] = useState({});
  //   控制modal弹出框的显示
  let [isShowAdd, setIsShowAdd] = useState(false);
  //   声明存放表单数据的容器
  let [useform, setUseform] = useState(null);
  //   控制设置角色权限状态
  let [isShowAuth, setIsShowAuth] = useState(false);
  //   获取节点
  let auth = useRef();
  useEffect(() => {
    getRoles();
  }, []);
  //   点击行触发
  const onRow = (r) => {
    return {
      onClick: (event) => {
        // console.log(r);
        setRole(r);
      }, // 点击行
    };
  };
  //   获取角色列表
  let getRoles = async () => {
    let result = await reqRoles();
    // console.log(result);
    if (result.status === 0) {
      let data = result.data;
      setRoles(data);
    }
  };
  //   添加角色
  let addrole = async () => {
    // console.log(useform);
    let { roleName } = useform.getFieldsValue(); //获取表单数据
    // console.log(roleName);
    useform.resetFields();
    let result = await reqAddRole(roleName);
    console.log(result);
    if (result.status === 0) {
      // 添加角色成功
      let role = result.data;
      setRoles([...roles, role]); //添加一个新的角色
      //   getRoles();
    } else {
      message.error("添加角色失败");
    }
    setIsShowAdd(false); //关闭添加框
  };
  //   修改权限
  let updaterole = async () => {
    // console.log(auth.current.getMenus());
    let role1 = role;
    let menus = auth.current.getMenus();
    role1.menus = menus;
    role1.auth_time = new Date(); //授权时间
    role1.auth_name = storeutil.getUser().username; //授权人
    const result = await reqUpdateRole(role1);
    if (result.status == 0) {
      getRoles(); //更新roles
      setIsShowAuth(false);
    }
  };
  //   删除角色
  let deleteRole = async (a) => {
    // console.log(a);
    let result = await reqDeleteRole(a._id);
    if (result.status == 0) {
      message.success("删除成功");
      getRoles();
      setRole({});
    }
  };
  // 设置卡片的头
  let title = (
    <>
      <Button
        type="primary"
        style={{ marginRight: "5px" }}
        onClick={() => setIsShowAdd(true)}
      >
        添加角色
      </Button>
      <Button
        type="primary"
        disabled={!role._id}
        onClick={() => {
          setIsShowAuth(true);
        }}
      >
        设置角色权限
      </Button>
    </>
  );
  // 设置表格的列
  let columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: formateDate,
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      render: formateDate,
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
    },
    {
      title: "操作",
      render: (a) => {
        return (
          <>
            <Popconfirm
              title="确认要删除吗？"
              okText="狠心删除"
              cancelText="心软留下"
              onConfirm={() => deleteRole(a)}
            >
              <Button type="primary" danger>
                删除角色
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <Card title={title}>
      <Table
        dataSource={roles}
        columns={columns}
        rowKey="_id"
        pagination={{ defaultPageSize: 5 }}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [role._id],
          onSelect: (r) => {
            setRole(r);
            // console.log(r);
          },
        }}
        onRow={onRow}
      />
      <Modal
        title="添加角色"
        open={isShowAdd}
        onCancel={() => setIsShowAdd(false)}
        onOk={addrole}
      >
        <Addform setForm={(form) => setUseform(form)} />
      </Modal>
      <Modal
        title="设置角色权限"
        open={isShowAuth}
        onCancel={() => setIsShowAuth(false)}
        onOk={updaterole}
      >
        <Updateform role={role} ref={auth} />
      </Modal>
    </Card>
  );
}

export default Role;
