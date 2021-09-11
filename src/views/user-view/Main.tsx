import React from 'react';
import styled from 'styled-components';
import Header from '../../components/atoms/Header';
import SideNav from '../../components/molecules/SideNav';
import BookingCalender from '../../components/organisms/Calender';

const MainWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MainHeader = styled(Header)`
  width: 80%;
  margin: 40px 0;
  &:after {
    position: absolute;
    bottom: -14px;
    left: 0;
    content: '';
    border-bottom: 5px solid #afbf36;
    width: 110px;
  }
`;

export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => (
  <MainWrapper>
    <MainHeader>HARMONOGRAM REZERWACJI OBIEKTÓW</MainHeader>
    <SideNav />
    <BookingCalender />
  </MainWrapper>
);

export default Main;
