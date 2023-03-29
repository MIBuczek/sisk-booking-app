import {IModalAction} from 'models';
import {MODAL_STATE, MODAL_TYPES} from 'utils';

/**
 * Modal store action to open modal.
 * @param type
 * @param message
 * @returns {IModalAction}
 */
const openModal = (type: MODAL_TYPES, message: string = ''): IModalAction => ({
   type: MODAL_STATE.DISPLAY,
   payload: {
      isOpen: true,
      message,
      type
   }
});

/**
 * Modal store action to close modal.
 * @returns {IModalAction}
 */
const closeModal = (): IModalAction => ({
   type: MODAL_STATE.INITIAL,
   payload: {
      isOpen: false,
      type: MODAL_TYPES.EMPTY,
      message: ''
   }
});

export {closeModal, openModal};
