import React, { useRef, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ categories, data, title }) => {
  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Dias do Mês",
      },
      labels: {
        show: true,
      },
    },
    legend: {
      position: "bottom",
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    colors: ["#114477"], // Cor da linha
  };

  const series = [
    {
      name: "Valor",
      data: data,
    },
  ];

  return (
    <div className="chart-container-line">
      <h2>{title}</h2>
      <Chart options={options} series={series} height={"100%"} type="line" />
    </div>
  );
};

export default LineChart;
