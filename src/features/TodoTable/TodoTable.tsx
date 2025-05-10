import { FC, useEffect, useState, useRef, useCallback } from 'react';

import { Todo } from 'shared/types';
import useTodoStore from 'app/store/useTodoStore';

import {
  StyledSearchInput,
  StyledTable,
  StyledTableContainer,
  StyledTableHeader,
  TableWrapper,
} from './TodoTable.styles';

const TodoTable: FC = () => {
  const { allTodos, loading, error, fetchTodos } = useTodoStore();
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;
  const initialVisibleItems = 20;
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(initialVisibleItems);
  const [offset, setOffset] = useState(0);
  const totalTodos = 200;

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (allTodos.length > 0) {
      const filteredTodos = allTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const initialVisibleTodos = filteredTodos.slice(0, initialVisibleItems);
      setVisibleTodos(initialVisibleTodos);
      setLoadedCount(initialVisibleItems);
    }
  }, [allTodos, searchTerm]);

  const handleScroll = useCallback(() => {
    if (!tableContainerRef.current || loading) {
      return;
    }

    const scrollTop = tableContainerRef.current.scrollTop;
    const tableHeight = tableContainerRef.current.offsetHeight;
    const scrollHeight = tableContainerRef.current.scrollHeight;

    if (scrollTop + tableHeight >= scrollHeight - 50) {
      const filteredTodos = allTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (loadedCount < totalTodos && filteredTodos.length > 0) {
        const newTodos = filteredTodos.slice(
          loadedCount,
          Math.min(loadedCount + itemsPerPage, totalTodos),
        );
        setVisibleTodos(prevVisibleTodos => [...prevVisibleTodos, ...newTodos]);
        setLoadedCount(prevLoadedCount =>
          Math.min(prevLoadedCount + itemsPerPage, totalTodos),
        );
      } else if (loadedCount >= totalTodos && filteredTodos.length > 0) {
        setOffset(
          prevOffset => (prevOffset + itemsPerPage) % filteredTodos.length,
        );
        setVisibleTodos(prevVisibleTodos => {
          const newTodos = [];
          for (let i = 0; i < itemsPerPage; i++) {
            const index = (i + prevVisibleTodos.length) % filteredTodos.length;
            newTodos.push(filteredTodos[index]);
          }
          return [...prevVisibleTodos, ...newTodos];
        });
      }
    }
  }, [allTodos, itemsPerPage, loadedCount, loading, totalTodos, searchTerm]);

  useEffect(() => {
    if (tableContainerRef.current) {
      const container = tableContainerRef.current;
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableWrapper>
      <StyledTableContainer ref={tableContainerRef}>
        <StyledTable>
          <StyledTableHeader>
            <tr>
              <th>User ID</th>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </StyledTableHeader>
          <tbody>
            {visibleTodos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.userId}</td>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
      <StyledSearchInput
        type="text"
        placeholder="Поиск по заголовку..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </TableWrapper>
  );
};

export default TodoTable;
