import React from 'react';
import styled from 'styled-components';
import WhiteBox from '../../common/WhiteBox';
import SalesChartContainer from '../../../containers/admin/dashboard/SalesChartContainer';

const AdminMainBlock = styled.div``;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const AdminMain = () => {
  return (
    <AdminMainBlock>
      <Heading>매출 차트</Heading>
      <WhiteBox>
        <SalesChartContainer />
      </WhiteBox>
    </AdminMainBlock>
  );
};

export default AdminMain;
