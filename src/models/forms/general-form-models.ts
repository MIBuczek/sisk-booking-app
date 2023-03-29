interface IEditHandler {
   itemIndex: number;
   isMainItem: boolean;
   subItemIndex?: number | null;
   currentPage: number;
   postPerPage: number;
}

interface IDeleteHandler {
   itemIndex: number;
   currentPage: number;
   postPerPage: number;
}

export type {IEditHandler, IDeleteHandler};
