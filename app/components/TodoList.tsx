'use client'
import { useState, useEffect, MouseEvent } from 'react';

import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '../graphql';
import TodoHeader from '../components/Header';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList({ tasks }: { tasks: Todo[]}) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { createTodo } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();

  //Create one blank todo
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
        setTodos(tasks);
    }, [tasks]);

  return (
    <div>
      <TodoHeader incompleteTasks={todos.length}/>
      <button onClick={handleClickCreate}>
            Create Task
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={()=> handleCheckboxClick(todo)} />
            <span>{todo.title}</span>

          </li>
        ))}
      </ul>
    </div>
  );
}
