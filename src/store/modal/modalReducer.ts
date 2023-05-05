import {IModal, IModalAction} from 'models';
import {MODAL_STATE} from 'utils';

const INITIAL_STATE: IModal = {
   isOpen: false,
   message: '',
   type: undefined
};

/**
 * Modal general state.
 *
 * @param {IModal} state
 * @param {IModalAction} action
 * @returns {IModal}
 */
export const modal = (state = INITIAL_STATE, action: IModalAction): IModal => {
   const {type, payload} = action;
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
