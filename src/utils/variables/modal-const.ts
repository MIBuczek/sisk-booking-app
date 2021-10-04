import { IModal, ModalTypes } from '../../models/modals/types-models';

const MODAL_TYPES: { [x: string]: ModalTypes } = {
  MESSAGE: 'MESSAGE',
  RESERVATION: 'RESERVATION',
  CONFIRM: 'CONFIRM',
  EMPTY: 'EMPTY',
};

const INITIAL_MODAL: IModal = {
  type: 'EMPTY',
  isOpen: false,
  callback: () => null,
};

export { INITIAL_MODAL, MODAL_TYPES };
