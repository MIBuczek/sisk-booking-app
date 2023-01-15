import * as React from 'react';
import styled from 'styled-components';
import { paginationItems } from 'utils';

const PaginationWrapper = styled.div`
  width: 70%;
  min-height: 30px;
  height: auto;
  display: flex;
  margin: 0.5rem auto;
  align-items: center;
`;

const PaginationBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 0.8rem;
  font-weight: 300;
  color: #3c3c3c;
  background: none;
  border: 1px solid white;

  &:hover {
    border-left: ${({ theme }) => `1px solid ${theme.middleGray}`};
    border-right: ${({ theme }) => `1px solid ${theme.middleGray}`};
  }

  &.active,
  &:focus {
    border-left: ${({ theme }) => `1px solid ${theme.green}`};
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
    outline: none;
    font-weight: 800;
  }
`;

interface PaginationProps {
  currentPage: number;
  postPerPage: number;
  totalPost: number;
  nextPage: (num: number) => void;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({
  currentPage,
  postPerPage,
  totalPost,
  nextPage
}) => (
  <PaginationWrapper>
    {paginationItems(totalPost, postPerPage).map((number) => (
      <PaginationBtn
        type="button"
        key={number}
        onClick={() => nextPage(number)}
        className={`${number === currentPage ? 'active' : ''}`}>
        {number}
      </PaginationBtn>
    ))}
  </PaginationWrapper>
);

export default Pagination;
