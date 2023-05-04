import styled from 'styled-components';

/**
 * Label HTML Element
 */
const Label = styled.span`
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.m};
   font-weight: ${({theme}) => theme.bold};
   margin: 8px;
`;

export default Label;
