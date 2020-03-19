import React from 'react'

import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { CompaniesPageContext } from './../../Pages/Companies/index'

const CompanyCard = props => {
  const { name, values, applications } = props.data
  const { setSelectedPosition } = React.useContext(CompaniesPageContext)

  return (
    <Card>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <div className='d-flex'>
          {values.map(value => (
            <span className='mr-2' key={`${name}-value-${value}`}>
              {value}
            </span>
          ))}
        </div>
      </Card.Header>
      <Card.Body>
        <h6>Applications</h6>
        {applications.map(app => (
          <div
            onClick={() => {
              setSelectedPosition(app.id)
            }}
            key={`${name}-position-${app.position}`}
          >
            {app.position}
          </div>
        ))}
      </Card.Body>
      <Card.Footer>Footer!</Card.Footer>
    </Card>
  )
}

CompanyCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default CompanyCard
