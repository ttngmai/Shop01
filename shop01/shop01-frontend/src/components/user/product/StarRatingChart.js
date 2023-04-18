import React from 'react';
import styled, { css } from 'styled-components';
import { IoStar } from 'react-icons/io5';
import palette from '../../../lib/styles/palette';

const StarRatingChartBlock = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const StarRatingChartInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-right: 1px solid ${palette.gray[3]};

  .star_rating_average {
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const StarRatingBox = styled.div`
  position: relative;
  width: 7.5rem;
  height: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const EmptyStarsIconBox = styled.div`
  position: absolute;
  width: 7.5rem;
  color: ${palette.gray[5]};
  overflow: hidden;
`;

const FillStarsIconBox = styled.div`
  position: absolute;
  width: 0;
  color: ${palette.indigo[7]};
  overflow: hidden;
  white-space: nowrap;

  ${(props) =>
    props.starRatingAverage &&
    css`
      width: ${(props.starRatingAverage / 5) * 100}%;
    `}
`;

const StarRatingChartBox = styled.dl`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
`;

const StarRatingChartItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  dt {
    display: inline-block;
    margin-right: 1rem;
  }

  dd {
    flex-grow: 1;
    display: flex;

    & > span {
      width: 3rem;
    }
  }
`;

const ChartBar = styled.div`
  flex-grow: 1;
  position: relative;
  max-width: 200px;
  border-radius: 9px;
  margin-right: 1rem;
  background-color: ${palette.gray[3]};

  &::before {
    content: '';
    ${(props) =>
      props.Percentage &&
      css`
        position: absolute;
        top: 0;
        bottom: 0;
        width: ${props.Percentage}%;
        border-radius: 9px;
        background-color: ${palette.indigo[7]};
      `}
  }
`;

const StarRatingChart = ({ starRatingChart, loading, error }) => {
  if (!starRatingChart) {
    return null;
  }

  const tempStarRatingDistribution = [
    { star_rating: 5, count: 0 },
    { star_rating: 4, count: 0 },
    { star_rating: 3, count: 0 },
    { star_rating: 2, count: 0 },
    { star_rating: 1, count: 0 },
  ];

  const { starRatingDistribution, totalCount, starRatingAverage } =
    starRatingChart;

  starRatingDistribution.forEach((item) => {
    tempStarRatingDistribution[5 - item.star_rating].count = item.count;
  });

  return (
    <StarRatingChartBlock>
      <StarRatingChartInfo>
        <em className="star_rating_average">{starRatingAverage}</em>
        <StarRatingBox>
          <EmptyStarsIconBox>
            {[...Array(5)].map((item, index) => (
              <IoStar key={`empty-star-icon-${index}`} size="1.5rem" />
            ))}
          </EmptyStarsIconBox>
          <FillStarsIconBox starRatingAverage={starRatingAverage}>
            {[...Array(5)].map((item, index) => (
              <IoStar key={`fill-star-icon-${index}`} size="1.5rem" />
            ))}
          </FillStarsIconBox>
        </StarRatingBox>
        <span>{totalCount} 리뷰</span>
      </StarRatingChartInfo>
      <StarRatingChartBox>
        {tempStarRatingDistribution.map((item, index) => (
          <StarRatingChartItem key={index}>
            <dt>{item.star_rating}점</dt>
            <dd>
              <ChartBar
                Percentage={
                  Math.floor((item.count / totalCount) * 100 * 10) / 10
                }
              ></ChartBar>
              <span>
                {Math.floor((item.count / totalCount) * 100 * 10) / 10}%
              </span>
            </dd>
          </StarRatingChartItem>
        ))}
      </StarRatingChartBox>
    </StarRatingChartBlock>
  );
};

export default StarRatingChart;
