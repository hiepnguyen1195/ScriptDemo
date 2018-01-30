import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// khai báo httplink để kết nối apollo client đến GraphQL AP, GraphQL server với cổng 4000
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

// tạo kết nối bằng apolloclient
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// Hiển thị các thành phần gốc của app
// xđ loại router sd, BrowserRouterkhi có 1 sv xử lí yêu cầu động
ReactDOM.render(
  <BrowserRouter> 
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>, document.getElementById('root')
)
registerServiceWorker()