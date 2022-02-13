import { IBooking, IClient, TSelect } from 'models';
import { SIZE_OPTIONS, SIZE_OPTIONS_BTN } from 'utils/variables/form-const';
import { BUILDINGS_OPTIONS, SIZE_FIELD_OPTIONS } from 'utils/variables/options-const';

const firstLetterUpperCase = (s: string): string =>
  s.charAt(0).toLocaleUpperCase() + s.substring(1).toLowerCase();

const generateSelectDefaultValue = (s: string): TSelect => ({
  value: s,
  label: firstLetterUpperCase(s)
});

const createSelectedOption = (value: string, options: TSelect[]): TSelect => {
  const selectedOption = options.find((c) => c.value === value);
  if (selectedOption) return selectedOption;
  return options[0];
};

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

const selectSizeFieldOptions = (buildingValue: string, cityValue: string): SIZE_OPTIONS[] => {
  if (buildingValue && cityValue) return SIZE_FIELD_OPTIONS[buildingValue][cityValue];
  return SIZE_OPTIONS_BTN;
};

const selectBuildingOptions = (cityValue: string, building: TSelect): TSelect[] => {
  if (!cityValue) return [building];
  return BUILDINGS_OPTIONS[cityValue];
};

const selectClientOptions = (clients: IClient[]): TSelect[] => {
  if (!clients) return [];
  return clients.map((c) => ({ label: c.name, value: c.id || '' }));
};

const selectedClientIdOption = (clients: IClient[], clientId: string): TSelect | undefined =>
  selectClientOptions(clients).find((o) => o.value === clientId);

export {
  generateSelectDefaultValue,
  selectSizeFieldOptions,
  selectBuildingOptions,
  selectClientOptions,
  selectedClientIdOption,
  pagination,
  paginationItems,
  createSelectedOption,
  firstLetterUpperCase
};
