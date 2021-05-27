import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Info from "../Icons/Info";
import Arrow from "../Icons/Arrow";
import Dods from "../Icons/Dods";

import './style.css'

const options = {
  legend: {
    position: 'right',
    align: "center",
    fontFamily: 'sans-serif',
    labels: {
      strokeStyle: 'transparent',
      lineWidth: 0,
      boxWidth: 13,
      fontSize: 13,
    },
  },
  maintainAspectRatio: false,
};

const customPlugin = {
  id: 'customPlugin',
  beforeDraw: (chartInstance) => {
    if (!chartInstance.data.datasets?.length) return;

    const { ctx, chartArea: { left, right, top, bottom} } = chartInstance;
    const text = chartInstance.data.datasets[0].total;
    const chartCenterY = (left + right)/2;

    ctx.restore();

    ctx.fillStyle = 'purple';
    ctx.font = '25px sans-serif';

    const textWidth = Math.floor(ctx.measureText(text).width);
    const Y = (top + bottom)/2;
    const X = chartCenterY - (textWidth/2);

    ctx.fillText(text,  X, Y);
    ctx.save();
  },
};

const Chart = ({dataChart, title}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!dataChart.data) return;
    const newData = {
      labels:dataChart.labels,
      datasets: [
        {
          data: dataChart.data,
          total: dataChart.data.reduce((a, c) => a + c),
          backgroundColor: [
            '#FAF1E2',
            '#FFCEC7',
            '#382C9C',
            '#C1548A',
            '#5ECCC9',
            '#94C89C',
          ],
          borderColor: 'transparent',
          borderWidth: 1,
          datalabels: {
            labels: dataChart.data,
            font: {
              family: 'sans-serif',
            },
            color: () => {
              return 'red'
            },
          }
        },
      ],
    };
    setData(newData);
  }, [dataChart]);

  return (
    <div className='chart-container'>
      <div className='chart-title'>
        <h1 className='chart-title-text'>{title} <Info className='icon-m-l'/></h1>
        <button className='dods-btn'><Dods /></button>
      </div>
      <div className='chart-content'>
        <Doughnut data={data} options={options} plugins={[ChartDataLabels, customPlugin]}/>
      </div>
      <div className='chart-footer'>
        <button className={'full-btn'}>View full report <Arrow className='icon-m-l'/></button>
      </div>
    </div>
  );
};

export default Chart;