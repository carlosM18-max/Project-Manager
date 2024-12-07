import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/', // Reemplaza 'URL_DEL_BACKEND_GRAPHQL' con la URL de tu servidor GraphQL
});

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('token'); // Utilizando localStorage para el token

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;