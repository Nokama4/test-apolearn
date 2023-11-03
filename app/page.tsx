import { getClient } from './graphql/apolloClient';
import { GET_TODOS } from './graphql/query';
import TodoList from './components/TodoList';

export default async function RootPage() {
  const { data } = await getClient().query({
    query: GET_TODOS,
  });


  return (
    <div className='h-screen flex flex-col justify-center items-center'>
    <TodoList tasks={data?.todos} />
    </div>
  );
}
