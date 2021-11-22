import { TSelect } from 'models';

const firstLetterUpperCase = (s: string): string => s.charAt(0).toLocaleUpperCase();

const generateSelectDefaultValue = (s: string): TSelect => ({
  value: s,
  label: firstLetterUpperCase(s)
});

const pagination = (items: string[], currentPage: number, postPerPage: number): string[] => {
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
export { generateSelectDefaultValue, pagination, paginationItems };
