import { useQuery, useMutation } from '@apollo/client'

import { GET_TODOS } from './query'
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO_COMPLETE } from './mutations'

export const useGetTodos = () => {
    const { data, loading, error } = useQuery(GET_TODOS)

    return {
        data,
        loading,
        error
    }
}

export const useCreateTodo = () => {
    const [createTodo] = useMutation(CREATE_TODO, {
        refetchQueries: [{ query: GET_TODOS }]
    })

    return {
        createTodo
    }
}

export const useUpdateTodoComplete = () => {
    const [updateTodoComplete] = useMutation(UPDATE_TODO_COMPLETE, {
        refetchQueries: [{ query: GET_TODOS }]
    })

    return {
        updateTodoComplete
    }
}


export const useDeleteTodo = () => {
    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_TODOS }]
    })

    return {
        deleteTodo
    }
}


