import Head from 'next/head'
import Image from 'next/image'

import Navbar from '../components/Navbar'

import {table, minifyRecords} from './api/utils/Airtable';

export default function Home({initialTodos}) {
  console.log(`TO-DO: ${initialTodos}`);
  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Todo App</h1>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos)
      }
    }
  } catch (err) {
    console.log(err);
  }
}
