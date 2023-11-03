'use client'
import { useCallback, useState, useEffect, MouseEvent } from 'react';
import Box from '@mui/system/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useCreateTodo, useDeleteTodo, useUpdateTodoComplete } from '../graphql';
import TodoHeader from '../components/Header';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
  
export default function TodoList({ tasks }: { tasks: Todo[]}) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { createTodo } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { updateTodoComplete } = useUpdateTodoComplete();

  //Create one blank todo
  const handleClickCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // setTodos((prev) => [...prev, { id: prev.length + 1, title: '', completed: false }]);
  }

  // Update Title
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => (index: number) => {
    const { value } = event.target;
    // setTodos((prev) => [...prev, { id: prev.length + 1, title: value, completed: false }]);
  }

  // Save Todo
  const handleSaveTodo = (index: number) => {
    createTodo({
      variables: {
        title: todos[index].title,
      },
    })
  }

  // Completed todo
  const handleCheckboxClick = useCallback(async (index: number) => {
    await updateTodoComplete({ variables: { id: todos[index].id } })
    // update todos state
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos([...newTodos]);
  }, [updateTodoComplete, todos, setTodos]);

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

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {todos.map(({ id, completed, title }, index) => (
            <FormControlLabel
            key={id}
            control={<Checkbox
                checked={completed}
                onChange={()=> handleCheckboxClick(index)}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
            label={title}
          />
            
        ))}
        </Box>
    </div>
  );
}
