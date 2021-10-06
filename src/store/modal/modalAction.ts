import { IModalAction } from 'models';
import { MODAL_STATE, MODAL_TYPES } from 'utils';

const openModal = (type: MODAL_TYPES): IModalAction => ({
  type: MODAL_STATE.DISPLAY,
  payload: {
    isOpen: true,
    type
  }
});

const closeModal = (): IModalAction => ({
  type: MODAL_STATE.INITIAL,
  payload: {
    isOpen: false,
    type: MODAL_TYPES.EMPTY
  }
});

export { closeModal, openModal };
