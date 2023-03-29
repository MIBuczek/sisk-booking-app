import styled from 'styled-components';

type ParagraphProps = {
   small?: boolean;
   bold?: boolean;
   conflict?: boolean;
};

const Paragraph = styled.p<ParagraphProps>`
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({small}) => (small ? '14px' : '18px')};
   font-weight: ${({bold}) => (bold ? '500' : '400')};
   padding-top: ${({small}) => (small ? '0' : '15px')};
   line-height: 1.5;
   text-align: justify;
   font-family: 'Roboto', sans-serif;
   margin: 0;
`;

export default Paragraph;
