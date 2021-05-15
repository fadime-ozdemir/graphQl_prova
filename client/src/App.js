import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    return graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4001/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <BookList />
      <AddBook />
    </div>
    </ApolloProvider>
  );
}

export default App;
