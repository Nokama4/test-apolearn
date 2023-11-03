import { getClient } from './graphql/apolloClient';
import { GET_TODOS } from './graphql/query';
import TodoList from './components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default async function RootPage() {
  const { data } = await getClient().query({
    query: GET_TODOS,
  });


  return (
    <TodoList tasks={data?.todos} />
  );
}
