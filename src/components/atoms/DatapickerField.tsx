/* eslint-disable no-nested-ternary */
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

type DataPickerType = {
  invalid?: boolean;
};

export const DataPickerField = styled(ReactDatePicker)<DataPickerType>`
  width: 190px;
  height: 35px;
  border-radius: 10px;
  background: #eaeaea;
  border: ${({ theme }) => `1px solid ${theme.green}`};
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  padding: 10px;
  text-align: center;
  letter-spacing: -0.5px;
  border-color: ${({ invalid, disabled }) =>
    invalid ? '#cc0000' : disabled ? '#b9b8b8' : '#afbf36'};
  transition: 0.4s;
  &:active,
  &:focus {
    box-shadow: inset 0px -17px 15px -25px rgb(66 68 90);
  }
  &::placeholder {
    color: #b9b8b8;
  }
`;
