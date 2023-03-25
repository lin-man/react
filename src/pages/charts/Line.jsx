import React, { useEffect } from "react";
import * as echarts from "echarts";
function Line() {
  let line = () => {
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
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    });
  };
  useEffect(() => {
    line();
  }, []);
  return (
    <>
      <div id="main" style={{ width: "1000px", height: "600px" }}></div>
    </>
  );
}

export default Line;
