import { IBooking, IBuilding, IClient, TSelect } from 'models';

const firstLetterUpperCase = (s: string): string =>
  s.charAt(0).toLocaleUpperCase() + s.substring(1).toLowerCase();

const generateSelectDefaultValue = (s: string): TSelect => ({
  value: s,
  label: firstLetterUpperCase(s)
});

const createSelectedOption = (value: string, options: TSelect[]): TSelect | undefined =>
  options.find((c) => c.value === value);

const pagination = (
  items: (IClient | IBooking)[],
  currentPage: number,
  postPerPage: number
): (IClient | IBooking)[] => {
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  return items.slice(indexOfFirstPost, indexOfLastPost);
};

const paginationItems = (totalPost: number, postPerPage: number) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export {
  generateSelectDefaultValue,
  pagination,
  paginationItems,
  createSelectedOption,
  firstLetterUpperCase
};
