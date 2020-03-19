import { gql } from 'apollo-boost'

const fetchAllCompanies = gql`
  {
    companies {
      id
      name
      values
      applications {
        id
        position
      }
    }
  }
`

export const fetchAllCompanyNames = gql`
  {
    companies {
      id
      name
    }
  }
`

const CompanyQueries = {
  fetchAll: fetchAllCompanies,
  fetchAllNames: fetchAllCompanyNames
}

export default CompanyQueries
