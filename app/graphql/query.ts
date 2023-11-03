import { gql } from '@apollo/client';

// READ
export const GET_TODOS = gql`
    query todos {
        todos {
            id
            title
            completed
        }
    }
`;

