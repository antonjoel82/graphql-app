import React from 'react'
import { graphql } from 'react-apollo'
import ApplicationQueries from '../../Queries/applications'
import Container from 'react-bootstrap/Container'

const ApplicationDetail = ({ data, ...props }) => {
  const { application } = data
  const { position, tags, coverLetter, company } = application || {}

  return (
    <Container className='my-3'>
      <h3>{position}</h3>
      <h5>{company ? company.name : ''}</h5>
      <div className='d-flex'>
        {(tags || []).map(value => (
          <span className='mr-2' key={`${position}-tag-${value}`}>
            {value}
          </span>
        ))}
      </div>
      <div>{coverLetter}</div>
    </Container>
  )
}
export default graphql(ApplicationQueries.getApplication, {
  options: props => {
    const appId = props.appId
    return {
      variables: {
        id: appId
      }
    }
  }
})(ApplicationDetail)
