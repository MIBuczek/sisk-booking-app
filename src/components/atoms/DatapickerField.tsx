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
  border: 1px solid #afbf36;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  padding: 10px;
  text-align: center;
  letter-spacing: -0.5px;
  border-color: ${({ invalid }) => (invalid ? '#cc0000' : '#afbf36')};
  &::placeholder {
    color: #b9b8b8;
  }
`;
