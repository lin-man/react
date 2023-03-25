import { Form, Input } from "antd";
import React, { useEffect } from "react";

function Addform(props) {
  // 绑定一个表单实例
  const [form] = Form.useForm();
  useEffect(() => {
    props.setForm(form);
  }, []);
  return (
    <Form form={form}>
      <Form.Item label="角色名称" name="roleName">
        <Input placeholder="请输入角色名称" />
      </Form.Item>
    </Form>
  );
}

export default Addform;
