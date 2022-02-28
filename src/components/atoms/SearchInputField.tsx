import { debounce } from 'lodash';
import { IBooking, IClient } from 'models';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import TextInputField from './TextInputField';

const SearchInputWrapper = styled.div`
  display: inline-block;
  position: relative;
  svg {
    position: absolute;
    top: 30%;
    right: 5%;
    color: #454545;
  }
`;

interface IProps {
  type: string;
  placeholder: string;
  searchContent: (IClient | IBooking)[];
  searchProperty: string;
  searchContentHandler: (searchResults: (IClient | IBooking)[]) => void;
}

const SearchInputField: React.FunctionComponent<IProps> = ({
  type,
  placeholder,
  searchContent,
  searchProperty,
  searchContentHandler
}) => {
  const [searchPhase, setSearchPhase] = React.useState('');

  const formatData = (s: string): string => s.toLocaleLowerCase().trim();

  const searchHandler = (): void => {
    if (!searchPhase) searchContentHandler(searchContent);
    else
      searchContentHandler(
        searchContent.filter((c) =>
          formatData(c[searchProperty] as string).includes(formatData(searchPhase))
        )
      );
  };

  const delayedQuery = React.useCallback(debounce(searchHandler, 300), [searchPhase]);

  React.useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [delayedQuery, searchPhase]);

  return (
    <SearchInputWrapper>
      <TextInputField
        name="search-input"
        type="text"
        id={type}
        value={searchPhase}
        placeholder={placeholder}
        onChange={(e) => setSearchPhase(e.target.value)}
      />
      <BsSearch />
    </SearchInputWrapper>
  );
};

export default SearchInputField;
