import * as React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 120px;
  height: 50px;
`;
export interface IProps {}

const SellectInput: React.SFC<IProps> = (): JSX.Element => <Select />;

export default SellectInput;
