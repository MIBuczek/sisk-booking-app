import * as React from "react";
import styled from "styled-components";

const CalenderWrapper = styled.section`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface IProps {}

const Calender: React.SFC<IProps> = (): JSX.Element => (
  <CalenderWrapper></CalenderWrapper>
);

export default Calender;
