import * as React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export interface IProps {}

const Modal: React.SFC<IProps> = (): JSX.Element => <ModalWrapper />;

export default Modal;
