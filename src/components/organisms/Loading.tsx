import * as React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  width: 250px;
  height: 150px;
`;

export interface IProps {}

const Loading: React.SFC<IProps> = (): JSX.Element => <LoadingWrapper />;

export default Loading;
