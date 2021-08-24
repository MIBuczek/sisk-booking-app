import * as React from 'react';
import styled from 'styled-components';
import dots from '../../assets/images/iframe-load.gif';

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(250, 250, 250, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const LoadingAnimation = styled.img`
  width: 100px;
`;

export interface IProps {}

const Loading: React.FC<IProps> = (): JSX.Element => (
  <LoadingWrapper>
    <LoadingAnimation src={dots} alt="loading" />
  </LoadingWrapper>
);

export default Loading;
