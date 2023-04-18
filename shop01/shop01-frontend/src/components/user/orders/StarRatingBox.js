import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { IoStar } from 'react-icons/io5';

const StarRatingBoxBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;

const StarsIconBox = styled.div`
  svg {
    color: ${palette.gray[5]};
    cursor: pointer;

    &.checked {
      color: ${palette.indigo[7]};
    }
  }
`;

const StarRatingBox = ({ starRating, onClick }) => {
  return (
    <StarRatingBoxBlock>
      <StarsIconBox>
        {[...Array(5)].map((item, index) => (
          <IoStar
            key={`star-icon-${index}`}
            size="2rem"
            className={cn({ checked: index + 1 <= starRating })}
            onClick={(e) => onClick(e, index)}
          />
        ))}
      </StarsIconBox>
      <div>{starRating}점</div>
    </StarRatingBoxBlock>
  );
};

export default StarRatingBox;
