import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import 'quill/dist/quill.snow.css';
import { IoStar } from 'react-icons/io5';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import StarRatingChartContainer from '../../containers/product/StarRatingChartContainer';

const ReviewListBlock = styled(Responsive)`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const EmptyReviewList = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};
`;

const ReviewListBox = styled.div`
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};
`;

const ReviewItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.gray[3]};

  &:last-child {
    border-bottom: none;
  }
`;

const WriterInfo = styled.div`
  padding-right: 1rem;
`;

const ReviewItemHeading = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
`;

const ReviewItemContent = styled.div``;

const StarRatingBox = styled.div`
  padding-bottom: 0.5rem;

  svg {
    color: ${palette.gray[5]};

    &.checked {
      color: ${palette.indigo[7]};
    }
  }
`;

const TextBox = styled.div`
  padding: 0;
  line-height: normal;
`;

const DateCreated = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: ${palette.gray[5]};
`;

const ReviewItem = React.memo(({ review }) => {
  return (
    <ReviewItemBlock>
      <ReviewItemHeading>
        <WriterInfo>{review.User.nick}</WriterInfo>
        <DateCreated>{review.created_at}</DateCreated>
      </ReviewItemHeading>
      <ReviewItemContent>
        <StarRatingBox>
          {[...Array(5)].map((item, index) => (
            <IoStar
              key={index}
              size="1rem"
              className={cn({ checked: index + 1 <= review.star_rating })}
            />
          ))}
        </StarRatingBox>
        <TextBox
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: review.text }}
        />
      </ReviewItemContent>
    </ReviewItemBlock>
  );
});

const ReviewList = ({ reviews, loading, error }) => {
  if (error) {
    return <ReviewListBlock>에러가 발생했습니다.</ReviewListBlock>;
  }

  if (!reviews) {
    return null;
  }

  if (reviews.length === 0) {
    return (
      <ReviewListBlock>
        <h2>상품 리뷰</h2>
        <EmptyReviewList>작성된 상품 리뷰가 없습니다.</EmptyReviewList>
      </ReviewListBlock>
    );
  }

  return (
    <ReviewListBlock>
      <h2>상품 리뷰</h2>
      <StarRatingChartContainer />
      <ReviewListBox>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ReviewListBox>
    </ReviewListBlock>
  );
};

export default ReviewList;
