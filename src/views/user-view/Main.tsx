import React from 'react';
import styled from 'styled-components';
import Header from '../../components/atoms/Header';
import SideNav from '../../components/molecules/SideNav';
import BookingCalender from '../../components/organisms/Calender';
import { fadeIn } from '../../style/animation';

const MainWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s linear;
`;

export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => (
  <MainWrapper>
    <Header>HARMONOGRAM REZERWACJI OBIEKTÓW</Header>
    <SideNav />
    <BookingCalender />
  </MainWrapper>
);

export default Main;
