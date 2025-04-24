import styled from 'styled-components';

export const StyledTableContainer = styled.div`
  height: 70vh;
  max-width: 80%;
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

export const StyledTableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
`;

export const StyledSearchInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-top: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
