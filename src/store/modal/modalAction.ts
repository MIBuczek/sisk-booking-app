import { IModalAction } from 'models';
import { MODAL_STATE, MODAL_TYPES } from 'utils';

const openModal = (type: MODAL_TYPES, message: string = ''): IModalAction => ({
  type: MODAL_STATE.DISPLAY,
  payload: {
    isOpen: true,
    message,
    type
  }
});

const closeModal = (): IModalAction => ({
  type: MODAL_STATE.INITIAL,
  payload: {
    isOpen: false,
    type: MODAL_TYPES.EMPTY,
    message: ''
  }
});

export { closeModal, openModal };
