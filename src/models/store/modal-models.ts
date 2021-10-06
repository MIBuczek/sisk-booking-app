import { MODAL_STATE, MODAL_TYPES } from 'utils';

interface IModal {
  isOpen: boolean;
  message?: string;
  type?: MODAL_TYPES;
}

interface IModalAction {
  type: MODAL_STATE;
  payload: IModal;
}

export type { IModal, IModalAction };
