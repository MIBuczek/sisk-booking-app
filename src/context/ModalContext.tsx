import React, { createContext, ReactNode, useState } from 'react';
import { IModal, IModalContext } from '../models/modals/types-models';
import { initialModal } from '../utils/modal-variables';

export const ModalContext = createContext<IModalContext>({
  modal: { ...initialModal },
  setModal: () => null,
});

export interface IProps {
  children: ReactNode;
}

const ModalContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [modal, setModal] = useState<IModal>({ ...initialModal });

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
