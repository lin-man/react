import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
function Updateform(props) {
  const [form] = Form.useForm(); //实例化表单对象
  //   console.log(form);
  useEffect(() => {
    form.setFieldsValue({
      categoryName: props.categoryName,
    });
    // 调用一下父亲传递过来的方法，把整个表单对象(form实例)传递给父组件
    props.setForm(form);
  }, [props.categoryName]);
  return (
    <Form form={form}>
      <Form.Item
        label="分类名称"
        name="categoryName"
        rules={[{ required: true, message: "名称必须" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default Updateform;
