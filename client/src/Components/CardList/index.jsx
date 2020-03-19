import React from 'react'
import Container from 'react-bootstrap/Container'
import CompanyCard from '../CompanyCard'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from '../Loader'

export const cardTypeMap = {
  company: CompanyCard
}

const CardList = ({ dataList, cardType, loading }) => {
  const CardComp = cardTypeMap[cardType]

  return (
    <Container>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          (dataList || []).map((data, index) => (
            <Col xs={4} key={`${cardType}-${index}`}>
              <CardComp data={data} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

CardList.propTypes = {
  dataList: PropTypes.array.isRequired,
  cardType: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

export default CardList
