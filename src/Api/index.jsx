import ajax from "./ajax";

const BASE = "http://react.lanlianhua.work";

// 登录接口
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

//   获取列表
export const reqCategorys = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });

//   修改列表
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

//   添加列表
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

//   获取用户列表
export const reqUsers = () => ajax(BASE + "/manage/user/list");

// 添加修改用户 把添加和修改合并在一起
export let reqAddOrUpdateUser = (user) =>
  ajax(BASE + "/manage/user/" + (user._id ? "update" : "add"), user, "POST");
//   删除用户
export const reqDelUser = (userId) =>
  ajax(BASE + "/manage/user/delete", { userId }, "POST");

//   获取角色列表
export const reqRoles = () => ajax(BASE + "/manage/role/list");
// 添加角色
export const reqAddRole = (roleName) =>
  ajax(BASE + "/manage/role/add", { roleName }, "POST");

// 设置角色
export const reqUpdateRole = (role) =>
  ajax(BASE + "/manage/role/update", role, "POST");

// 删除角色
export const reqDeleteRole = (id) =>
  ajax(BASE + `/manage/role/delete?id=${id}`);
