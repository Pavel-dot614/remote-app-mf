export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  allTodos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
}
