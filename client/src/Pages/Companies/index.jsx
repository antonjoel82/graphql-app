import React from 'react'
import Container from 'react-bootstrap/Container'
import CardList from '../../Components/CardList'

import { graphql } from 'react-apollo'
import AddApplicationForm from '../../Components/AddApplicationForm'
import CompanyQueries from '../../Queries/companies'
import ApplicationDetail from '../../Components/ApplicationDetail'

export const CompaniesPageContext = React.createContext({
  setSelectedPosition: appId => {}
})

/**
 * Page component for displaying all Companies
 */
const CompaniesPage = ({ data, ...props }) => {
  const { companies, loading } = data
  const [selectedPosition, setSelectedPosition] = React.useState('')

  return (
    <Container>
      <h1>Companies</h1>
      <hr />
      <CompaniesPageContext.Provider value={{ setSelectedPosition }}>
        <CardList
          loading={loading}
          dataList={companies || []}
          cardType='company'
        />
        <hr />
        {!!selectedPosition && <ApplicationDetail appId={selectedPosition} />}
        <AddApplicationForm />
      </CompaniesPageContext.Provider>
    </Container>
  )
}

export default graphql(CompanyQueries.fetchAll)(CompaniesPage)
