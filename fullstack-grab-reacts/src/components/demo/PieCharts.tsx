import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface PieChartProps {
  data: {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
