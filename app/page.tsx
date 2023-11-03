import { useCallback, useState, useEffect, MouseEvent } from 'react';

import { useCreateTodo, useDeleteTodo, useUpdateTodo } from './graphql';
import { getClient } from './graphql/apolloClient';
import { GET_TODOS } from './graphql/query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { createTodo } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();

  //Create one black todo
  const handleClickCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTodos((prev) => [...prev, { id: prev.length + 1, title: '', completed: false }]);
  }

  // Update Title
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => (index: number) => {
    const { value } = event.target;
    setTodos((prev) => [...prev, { id: prev.length + 1, title: value, completed: false }]);
  }

  // Save Todo
  const handleSaveTodo = (index: number) => {
    createTodo({
      variables: {
        title: todos[index].title,
      },
    })
  }
  // Update todo
  const handleUpdateTodoTitle = (index: number, title: String) => {
    updateTodo({
      variables: {
        ...todos[index],
        title,
      },
    })
  }

  // Completed todo
  const handleCheckboxClick = (todo: Todo) => {
    updateTodo({ variables: { ...todo, completed: true } })
  }

  // Delete todo
  const handleDeleteTodo = (id: String) => {
    deleteTodo({ variables: { id } });
  }

  useEffect(() => {
    async function fetchTodos() {
      const client = getClient();
      const { data } = await client.query({
        query: GET_TODOS,
      });

      setTodos(data.todos);
    }
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onClick={()=> handleCheckboxClick(todo)} />
            <span>{todo.title}</span>

          </li>
        ))}
      </ul>
    </div>
  );
}
