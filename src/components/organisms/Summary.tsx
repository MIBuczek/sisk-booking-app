import Header from 'components/atoms/Header';
import * as React from 'react';
import styled from 'styled-components';

const SummaryWrapper = styled.section`
  width: 60%;
  min-height: 100%;
  height: auto;
  display: block;
  padding: 30px 0;
  z-index: 0;
`;

const SummaryHeader = styled(Header)`
  margin: 20px 0 40px 20px;
`;

const Summary = () => (
  <SummaryWrapper>
    <SummaryHeader>Podsumowanie Najmów</SummaryHeader>
  </SummaryWrapper>
);

export default Summary;
