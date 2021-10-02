import { IModal, ModalTypes } from '../models/modals/types-models';

export const MODAL_TYPES: { [x: string]: ModalTypes } = {
  MESSAGE: 'MESSAGE',
  RESERVATION: 'RESERVATION',
  CONFIRM: 'CONFIRM',
  EMPTY: 'EMPTY',
};

export const initialModal: IModal = {
  type: 'EMPTY',
  isOpen: false,
  callback: () => null,
};
