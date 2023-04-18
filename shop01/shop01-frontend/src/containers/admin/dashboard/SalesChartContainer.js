import React, { useState, useEffect } from 'react';
import palette from '../../../lib/styles/palette';
import { readChart } from '../../../lib/api/orders';
import SalesChart from '../../../components/admin/dashboard/SalesChart';

const SalesChartContainer = () => {
  const [chartType, setChartType] = useState('bar');
  const [chartConfig, setChartConfig] = useState();

  const readChartData = async () => {
    let chartLabels = [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ];
    let chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const { data } = await readChart({});
    console.log(data);

    for (const item of data) {
      chartData[parseInt(item.month) - 1] = parseInt(item.amount);
    }

    setChartConfig({
      bar: {
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: '매출',
              data: chartData,
              backgroundColor: 'rgba(92, 124, 250, 0.2)',
              borderColor: `${palette.indigo[7]}`,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            xAxis: {
              grid: {
                display: false,
              },
            },
            yAxis: {
              title: {
                display: true,
                align: 'end',
                font: {
                  size: 12,
                  family: "'Noto Sans KR', sans-serif",
                  weight: 400,
                },
                text: '단위: 원',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return context.parsed.y !== null
                    ? ' ' + context.parsed.y + '원'
                    : null;
                },
              },
            },
          },
          maintainAspectRatio: false,
        },
      },
      line: {
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: '매출',
              data: chartData,
              fill: false,
              backgroundColor: `${palette.indigo[7]}`,
              borderColor: 'rgba(92, 124, 250, 0.2)',
            },
          ],
        },
        options: {
          scales: {
            yAxis: {
              beginAtZero: true,
              title: {
                display: true,
                align: 'end',
                font: {
                  size: 12,
                  family: "'Noto Sans KR', sans-serif",
                  weight: 400,
                },
                text: '단위: 원',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return context.parsed.y !== null
                    ? ' ' + context.parsed.y + '원'
                    : null;
                },
              },
            },
          },
          maintainAspectRatio: false,
        },
      },
    });
  };

  useEffect(() => {
    readChartData();
  }, []);

  return (
    <SalesChart
      chartType={chartType}
      chartConfig={chartConfig}
      setChartType={setChartType}
    />
  );
};

export default SalesChartContainer;
