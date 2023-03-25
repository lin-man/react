import React from "react";
import { Card, Button, Table, Modal, Form, Select, Input, message } from "antd";
import { reqAddCategory, reqCategorys, reqUpdateCategory } from "../../Api";
import { useState, useEffect } from "react";
import Addform from "./Addform";
import Updateform from "./Updateform";

function Category() {
  //   声明一个容器存放获取的列表
  let [categorys, setCategorys] = useState([]); //一级分类
  let [subCategorys, setSubCategorys] = useState([]); //二级分类
  //   声明一个容器
  let [parentId, setParentId] = useState("0");
  //   声明一个存放当前名字的容器
  let [parentName, setParentName] = useState("");
  //   声明一个 状态来控制 modal的显示隐藏
  let [showStatus, setShowStatus] = useState(0);
  //   声明一个容器 用于接收表单对象
  let [useform, setUseform] = useState(null);
  //   点击修改时获取数据 传递给子组件
  let [categoryObj, setCategoryObj] = useState({});

  // 显示添加modal弹出框
  let showAdd = () => {
    setShowStatus(1);
  };
  //   显示修改modal弹出框
  let showUpdate = (category) => {
    setShowStatus(2);
    setCategoryObj(category); //表格设置点击时 传递的category对象
  };
  //   关闭modal 弹出框
  let handleCancel = () => {
    setShowStatus(0);
  };
  // 点击上一级时 将其全部清空
  let showCategorys = () => {
    setParentId("0");
    setSubCategorys([]);
    setParentName("");
  };
  //   添加分类
  const addCategory = async () => {
    // console.log(useform.getFieldsValue());
    let { categoryName, pId } = useform.getFieldsValue();

    // useform.getFieldsValue().categoryName = "";
    // 重置表单数据
    let result = await reqAddCategory(categoryName, pId);
    if (result.status == 0) {
      //   console.log(useform.getFieldsValue().categoryName);
      if (pId == parentId) {
        // 当前的分类下面添加子分类
        getCategorys();
      } else if (pId == "0") {
        getCategorys(0);
      }
    }
    // 关闭弹窗
    setShowStatus(0);
  };
  //   修改分类
  let updateCategory = async () => {
    // 看看能不能获取表达能数据
    // console.log(useform);
    let categoryId = categoryObj._id; //获取需要改分类的id
    let { categoryName } = useform.getFieldsValue(); //获取表单数据
    // console.log(categoryName);
    let result = await reqUpdateCategory({ categoryName, categoryId });
    // console.log(result);
    if (result.status === 0) {
      setShowStatus(0); //关闭弹窗
      getCategorys(); //重新获取一下数据
    }
  };
  let extra = (
    <Button type="primary" onClick={showAdd}>
      +添加
    </Button>
  );
  //   分类调用
  const getCategorys = async (pid) => {
    pid = pid || parentId;
    const result = await reqCategorys(pid);
    // console.log(result);
    // 判断是一级分类还是二级分类
    if (result.status == 0) {
      categorys = result.data;

      if (parentId == "0") {
        setCategorys(categorys); //一级分类
      } else {
        setSubCategorys(categorys); //二级分类
      }
    }
  };
  //   表格设置
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      render: (category) => {
        return parentId == "0" ? (
          <>
            <Button
              type="primary"
              onClick={() => showSubCategorys(category)}
              style={{ marginRight: "5px" }}
            >
              查看子分类
            </Button>
            <Button type="primary" onClick={() => showUpdate(category)}>
              修改分类
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => showUpdate(category)}>
              修改分类
            </Button>
          </>
        );
      },
    },
  ];
  //   点击查看子分类
  let showSubCategorys = (category) => {
    // console.log(category._id);
    // 设置一下parentId就行
    setParentId(category._id);
    setParentName(category.name);
  };
  //   设置名字
  const title =
    parentId == "0" ? (
      <span style={{ cursor: "pointer" }}>一级分类列表</span>
    ) : (
      <>
        <span style={{ cursor: "pointer" }} onClick={showCategorys}>
          一级分类
        </span>
        --- <span>{parentName}</span>
      </>
    );
  // 生命周期
  useEffect(() => {
    getCategorys();
  }, [parentId]);
  return (
    <>
      <Card title={title} extra={extra}></Card>
      <Table
        columns={columns}
        dataSource={parentId == "0" ? categorys : subCategorys}
        rowKey="_id"
        pagination={{ defaultPageSize: 5 }}
      />
      <Modal
        title="添加分类"
        open={showStatus == 1}
        onCancel={handleCancel}
        onOk={addCategory}
      >
        <Addform
          categorys={categorys}
          pId={parentId}
          setForm={(form) => setUseform(form)}
        />
      </Modal>
      <Modal
        title="修改分类"
        open={showStatus == 2}
        onCancel={handleCancel}
        onOk={updateCategory}
      >
        <Updateform
          categoryName={categoryObj.name}
          setForm={(form) => setUseform(form)}
        />
      </Modal>
    </>
  );
}

export default Category;
