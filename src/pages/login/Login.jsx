import React from "react";
import { Button, Form, Input, message } from "antd";
import { reqLogin } from "../../Api";
import storeutil from "../../util/storeutil";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { username, password } = values;
    const result = await reqLogin(username, password);
    console.log(result);
    if (result.status == 0) {
      storeutil.saveUser(result.data);
      message.success("登录成功");
      nav("/");
    } else {
      message.error("请认真检查");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //   登陆判断
  const user = storeutil.getUser();
  if (user && user._id) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Form
        className="login_box"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
