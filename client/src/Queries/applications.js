import { gql } from 'apollo-boost'

/**
 * Mutations
 */
export const createApplication = gql`
  mutation(
    $position: String!
    $coverLetter: String
    $tags: [String]
    $companyId: ID!
  ) {
    addApplication(
      position: $position
      coverLetter: $coverLetter
      tags: $tags
      companyId: $companyId
    ) {
      id
      position
      tags
      company {
        name
      }
    }
  }
`
export const getApplication = gql`
  query($id: ID!) {
    application(id: $id) {
      position
      coverLetter
      tags
      company {
        name
      }
    }
  }
`

const ApplicationQueries = {
  getApplication,
  createApplication
}

export default ApplicationQueries
