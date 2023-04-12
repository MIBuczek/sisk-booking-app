import {MODAL_TYPES} from '../../utils';

interface IEditHandler {
   itemIndex: number;
   isMainItem: boolean;
   subItemIndex?: number | null;
   currentPage: number;
   postPerPage: number;
   modalType: MODAL_TYPES;
}

interface IDeleteHandler {
   itemIndex: number;
   currentPage: number;
   postPerPage: number;
}

export type {IEditHandler, IDeleteHandler};
