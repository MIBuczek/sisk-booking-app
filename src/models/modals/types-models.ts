import { Dispatch, SetStateAction } from 'react';

export type ModalTypes = 'EMPTY' | 'MESSAGE' | 'RESERVATION' | string;

export interface IModal {
  type: ModalTypes;
  isOpen: boolean;
  callback: () => void;
}

export interface IModalContext {
  modal: IModal;
  setModal: Dispatch<SetStateAction<IModal>>;
}
