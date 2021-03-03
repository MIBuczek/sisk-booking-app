import * as React from 'react';
import styled from 'styled-components';

const NoMatchWrapper = styled.section`
  width: 100%;
  height: 100%;
`;

const NoMatch: React.SFC = (): JSX.Element => (
  <NoMatchWrapper>
    <h1>Page dont exist</h1>
  </NoMatchWrapper>
);

export default NoMatch;
