import store from "store";
const USER_KEY = "user_key";

export default {
  // 把信息保存在localStorage里面
  saveUser(user) {
    store.set(USER_KEY, user);
  },
  //   获取localstorage 里面的数据
  getUser() {
    return store.get(USER_KEY) || {};
  },
  //   清空localstorage里面的数据
  removeUser() {
    store.remove(USER_KEY);
  },
};
