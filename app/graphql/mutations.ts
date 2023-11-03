import { gql } from "@apollo/client";

// CREATE
export const CREATE_TODO = gql`
    mutation todo($title: String!) {
        createTodo(
            variables: {
                title: $title
            }
        ) {
            id
            title
            completed
        }
    }
`;

// UPDATE
export const UPDATE_TODO = gql`
    mutation updateTodo($id: ID!, $title: String, $completed: Boolean) {
        updateTodo(
            variables: {
                id: $id
                title: $title
                completed: $completed
            }
        ) {
            id
            title
            completed
        }
    }
`;

// DELETE
export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(
            variables: {
                id: $id
            }
        ) {
            id
            title
            completed
        }
    }
`;
