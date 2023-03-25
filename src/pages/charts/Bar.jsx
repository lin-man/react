import React, { useEffect } from "react";
import * as echarts from "echarts";
function Bar() {
  // 基于准备好的dom，初始化echarts实例
  let bar = () => {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });
  };
  useEffect(() => {
    bar();
  }, []);
  return (
    <>
      <div
        id="main"
        style={{
          width: "800px",
          height: "500px",
        }}
      ></div>
    </>
  );
}

export default Bar;
