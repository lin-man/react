import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";
let Item = Form.Item;
let Option = Select.Option;
function Addform(props) {
  //   console.log(props);
  const [form] = Form.useForm();
  //   console.log(form);
  const { categorys, pId, setForm } = props;
  useEffect(() => {
    form.setFieldsValue({
      pId: pId,
    });
    setForm(form);
  }, [pId, categorys]);
  return (
    <Form form={form}>
      <Item label="请选择" name="pId">
        <Select value={pId}>
          <Option value="0">一级分类</Option>
          {categorys.map((item) => {
            return (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Item>
      <Item
        label="分类名称"
        name="categoryName"
        rules={[{ required: true, message: "名字必须填写" }]}
      >
        <Input />
      </Item>
    </Form>
  );
}

export default Addform;
