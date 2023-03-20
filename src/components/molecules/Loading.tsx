import * as React from 'react';
import styled from 'styled-components';
import Loader from 'react-loaders';
import 'loaders.css/loaders.css';

const LoadingWrapper = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background: rgba(250, 250, 250, 0.8);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   z-index: 100;
`;

export const LoaderDots = styled(Loader)`
   .ball-pulse > div {
      background-color: ${({ theme }) => theme.green};
   }
`;

export interface IProps {}

const Loading: React.FC<IProps> = (): JSX.Element => (
   <LoadingWrapper>
      <LoaderDots type="ball-pulse" active />
   </LoadingWrapper>
);

export default Loading;
