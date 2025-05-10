import { create } from 'zustand';
import { Todo, TodoState } from 'shared/types';

const useTodoStore = create<TodoState>(set => ({
  allTodos: [],
  loading: false,
  error: null,
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Todo[] = await response.json();
      set({ allTodos: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
}));

export default useTodoStore;
