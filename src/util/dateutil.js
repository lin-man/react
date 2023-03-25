export function formateDate(time) {
  //   console.log(time);
  if (!time) return "";
  let date = new Date(time);
  //   转化为时间日期格式
  return (
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
