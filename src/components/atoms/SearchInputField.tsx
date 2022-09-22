import { debounce } from 'lodash';
import { IBooking, IClient } from 'models';
import * as React from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';
import styled from 'styled-components';
import TextInputField from './TextInputField';
import { searchSelectedContent } from '../../utils';
import Button from './Button';

const SearchInputWrapper = styled.div`
  display: inline-block;
  position: relative;

  svg {
    position: absolute;
    top: 30%;
    left: 260px;
    color: #454545;
  }
`;

const ClearBtn = styled(Button)`
  position: absolute;
  margin: 0;
  right: 0;
  padding: 3px 5px;
  height: 35px;
  width: 35px;

  svg {
    position: static;
  }
`;

interface IProps {
  type: string;
  placeholder: string;
  searchContent: (IClient | IBooking)[];
  searchProperty: string;
  searchContentHandler: (searchResults: (IClient | IBooking)[], searchPhase: string) => void;
}

const SearchInputField: React.FunctionComponent<IProps> = ({
  type,
  placeholder,
  searchContent,
  searchProperty,
  searchContentHandler
}) => {
  const [searchPhase, setSearchPhase] = React.useState('');

  const searchHandler = (): void => {
    if (!searchPhase) searchContentHandler(searchContent, '');
    else
      searchContentHandler(
        searchSelectedContent(searchContent, searchProperty, searchPhase),
        searchPhase
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
      {searchPhase ? (
        <ClearBtn type="button" onClick={() => setSearchPhase('')}>
          <BsXLg />
        </ClearBtn>
      ) : (
        <BsSearch />
      )}
    </SearchInputWrapper>
  );
};

export default SearchInputField;
