import React, { createContext, ReactNode, useState } from 'react';
import { IModal, IModalContext } from '../models/modals/types-models';
import { INITIAL_MODAL } from '../utils/variables/modal-const';

export const ModalContext = createContext<IModalContext>({
  modal: { ...INITIAL_MODAL },
  setModal: () => null,
});

export interface IProps {
  children: ReactNode;
}

const ModalContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [modal, setModal] = useState<IModal>({ ...INITIAL_MODAL });

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
