import { useQuery, useMutation } from '@apollo/client'

import { GET_TODOS } from './query'
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from './mutations'

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

export const useUpdateTodo = () => {
    const [updateTodo] = useMutation(UPDATE_TODO, {
        refetchQueries: [{ query: GET_TODOS }]
    })

    return {
        updateTodo
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


