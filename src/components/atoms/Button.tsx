import * as React from "react";
import styled from "styled-components";

export interface ButtonProps {}

const Btn = styled.button`
  width: 120px;
  height: 50px;
`;
const Button: React.SFC<ButtonProps> = (): JSX.Element => <Btn />;

export default Button;
