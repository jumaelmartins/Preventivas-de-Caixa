import React, { useRef, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ categories, data, title }) => {
  const options = {
    chart: {
      type: "bar",
    },
    // title: {
    //   text: "Top 5 Categorias",
    //   align: "center",
    //   style: {
    //     fontSize: "20px",
    //     fontWeight: "bold",
    //     color: "#263238",
    //   },
    // },
    xaxis: {
      categories: categories,
    },
    // yaxis: {
    //   title: {
    //     text: "Valores",
    //   },
    // },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      bar: {
        borderRadius: 5, // Arredonda as bordas das barras
        horizontal: true, // Torna o gráfico de barras horizontal
      },
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    colors: ["#114477"], // Cor das barras
  };

  const series = [
    {
      name: "Valor",
      data: data,
    },
  ];

  return (
    <div className="chart-container-bar">
      <h2>{title}</h2>
      <Chart options={options} series={series} height={"100%"} type="bar" />
    </div>
  );
};

export default BarChart;
