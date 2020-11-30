import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useContext } from 'react';

import Navbar from '../components/Navbar'
import Todo from '../components/Todo';
import auth0 from './api/utils/auth0';

import { table, minifyRecords } from './api/utils/Airtable';

import { TodosContext } from '../contexts/TodosContext';
import { initAuth0 } from '@auth0/nextjs-auth0';

export default function Home({ initialTodos, user }) {

  const {todos, setTodos} = useContext(TodosContext);
  console.log(user);

  useEffect(() => {
    setTodos(initialTodos)
  }, [])
  console.log(`TO-DO: ${initialTodos}`);
  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        <h1>Todo App</h1>
        <ul>
          { todos && todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null
      }
    }
  } catch (err) {
    console.log(err);
  }
}
