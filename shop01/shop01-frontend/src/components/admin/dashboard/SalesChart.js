import React from 'react';
import styled from 'styled-components';
import IconButton from '../../common/IconButton';
import { Bar, Line } from 'react-chartjs-2';
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai';

const ChartBlock = styled.div``;

const ChartBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
`;

const ButtonsBox = styled.div`
  margin-bottom: 1rem;
`;

const SalesChart = ({ chartType, chartConfig, setChartType }) => {
  const handleToggle = () => {
    if (chartType === 'bar') {
      setChartType('line');
    } else {
      setChartType('bar');
    }
  };

  if (!chartConfig) {
    return null;
  }

  return (
    <ChartBlock>
      <ButtonsBox>
        <IconButton type="button" size="large" onClick={handleToggle}>
          {chartType === 'bar' && <AiOutlineLineChart />}
          {chartType === 'line' && <AiOutlineBarChart />}
        </IconButton>
      </ButtonsBox>
      <ChartBox>
        {chartType === 'bar' && (
          <Bar
            data={chartConfig[chartType].data}
            options={chartConfig[chartType].options}
          />
        )}
        {chartType === 'line' && (
          <Line
            data={chartConfig[chartType].data}
            options={chartConfig[chartType].options}
          />
        )}
      </ChartBox>
    </ChartBlock>
  );
};

export default SalesChart;
