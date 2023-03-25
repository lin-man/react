import { Form, Input, Select } from "antd";
import React, { useEffect } from "react";
const Item = Form.Item;
const Option = Select.Option;
function Addfrom(props) {
  let [form] = Form.useForm(); //实话表单对象
  useEffect(() => {
    form.setFieldsValue({
      username: props.user.username,
      password: props.user.password,
      phone: props.user.phone,
      email: props.user.email,
      role_id: props.user.role_id,
    });
    props.setForm(form);
  }, [props.user, props.roles]);
  return (
    <Form form={form}>
      <Item label="用户" name="username">
        <Input />
      </Item>
      {/* 如果是修改的话不显示密码 添加显示 */}
      {props?.user?._id ? null : (
        <Item label="密码" name="password">
          <Input />
        </Item>
      )}
      <Item label="手机号" name="phone">
        <Input />
      </Item>
      <Item label="邮箱" name="email">
        <Input />
      </Item>
      <Item label="角色" name="role_id">
        <Select value={props.user.role_id}>
          {props.roles.map((role) => {
            return (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            );
          })}
        </Select>
      </Item>
    </Form>
  );
}

export default Addfrom;
