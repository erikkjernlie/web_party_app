import React from "react";
import { useScoreBoard } from "../hooks/joinParty";
import Chart from "react-apexcharts";
import "./index.css";

const ScoreBoard = () => {
  const { scoreBoard, getting, error, promille, names } = useScoreBoard();
  console.log(scoreBoard);

  const options = {
    chart: {
      id: "apexchart-example"
    },
    xaxis: {
      categories: names
    }
  };
  const series = [
    {
      name: "series-1",
      data: promille
    }
  ];

  return (
    <div>
      <div>Scoreboard</div>
      {promille && names && (
        <div className="chart">
          <Chart series={series} options={options} type="bar" />
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
