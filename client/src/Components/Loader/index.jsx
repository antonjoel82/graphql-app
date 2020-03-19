import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = props => {
  return (
    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
      <Spinner variant='primary' animation='border' />
    </div>
  )
}
export default Loader
