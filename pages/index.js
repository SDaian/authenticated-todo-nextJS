import Head from 'next/head'
import Image from 'next/image'

import Navbar from '../components/Navbar'

import {table, minifyRecords} from './api/utils/Airtable';

export default function Home({initialTodos}) {
  console.log(initialTodos);
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
          Powered by{' '}
          <Image src="/vercel.svg"
            alt="Picture"
            width={500}
            height={500}
            loading={"lazy"}
          ></Image>
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
