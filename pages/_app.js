import '../styles/index.css'
import { TodosProvider } from '../contexts/TodosContext';

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-3xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp
