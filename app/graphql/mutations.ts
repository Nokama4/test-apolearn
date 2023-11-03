import { gql } from "@apollo/client";

// CREATE
export const CREATE_TODO = gql`
    mutation createTodo($createTodoInput: TodoInput!) {
        createTodo(createTodoInput: $createTodoInput
        ) {
            id
            title
            completed
        }
    }
`;

// UPDATE
export const UPDATE_TODO_COMPLETE = gql`
    mutation updateTodo($id: String!) {
        updateTodo(id: $id) {
            id
            title
            completed
        }
    }
`;

// DELETE
export const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
            id
            title
            completed
        }
    }
`;
