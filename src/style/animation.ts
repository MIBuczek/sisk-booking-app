import {keyframes} from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity : 0;
    visibility : hidden;
  }
  to {
    opacity : 1;
    visibility: visible;
  }
`;

export const fadeInLeft = keyframes`
from {
  opacity : 0;
  visibility : hidden;
  transform : translateX(-20px)
}
to {
  opacity : 1;
  visibility: visible;
  transform : translateX(0)
}
`;
