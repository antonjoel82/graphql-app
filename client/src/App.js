import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import CompaniesPage from './Pages/Companies/index'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <header className='App-header'>
          {/* <h1>Joel's Job Application</h1> */}
          <CompaniesPage />
        </header>
      </div>
    </ApolloProvider>
  )
}

export default App
