import { IModalAction } from 'models';
import { MODAL_STATE } from 'utils';

const INITIAL_STATE = {
  isOpen: false,
  message: '',
  type: ''
};

export const modal = (state = INITIAL_STATE, action: IModalAction) => {
  const { type, payload } = action;
  switch (type) {
    case MODAL_STATE.INITIAL:
    case MODAL_STATE.DISPLAY:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
