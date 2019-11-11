import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';
import { getAccessToken } from './accessToken';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    request: (operation) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            operation.setContext({
                headers: {
                    authorization: `bearer ${accessToken}`
                }
            })
        }
    }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
