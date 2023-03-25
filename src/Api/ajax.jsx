import { message } from "antd";
import axios from "axios";

// 导出一个函数 url表示路径  data表示参数 type表示类型
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type == "GET") {
      promise = axios.get(url, { params: data });
    } else if (type == "POST") {
      promise = axios.post(url, data);
    }

    // 返回
    promise
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        message.error("请求错误" + err.message);
      });
  });
}
