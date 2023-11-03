import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
