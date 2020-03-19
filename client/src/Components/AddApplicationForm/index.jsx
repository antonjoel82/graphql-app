import React from 'react'
import { graphql } from 'react-apollo'
import compose from 'lodash.flowright'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CompanyQueries from '../../Queries/companies'
import ApplicationQueries from './../../Queries/applications'
import { useInput } from './../../Hooks/useInput'

const AddApplicationForm = ({ fetchAllNames, createApplication, ...props }) => {
  const { companies, loading } = fetchAllNames

  const {
    value: position,
    bind: bindPosition,
    reset: resetPosition
  } = useInput('')

  const {
    value: companyId,
    bind: bindCompanyId,
    reset: resetCompanyId
  } = useInput('')

  const { value: tagStr, bind: bindTags, reset: resetTags } = useInput('')

  const {
    value: coverLetter,
    bind: bindCoverLetter,
    reset: resetCoverLetter
  } = useInput('')

  const [validated, setValidated] = React.useState(false)

  // reset all fields
  function resetFormFields() {
    resetPosition()
    resetCompanyId()
    resetCoverLetter()
    resetTags()
  }

  // function validate() {
  //   const errors = []

  //   if (!position) {
  //     errors.push(`Position is a required field.`)
  //   }

  //   if (!companyId) {
  //     errors.push(`Company is a required field.`)
  //   }

  //   return errors
  // }

  function handleSubmit(e) {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return
      // return
    }

    // }

    // const errors = validate()
    // if (!errors || errors.length === 0) {
    //   alert(errors.join('\n'))
    //   return
    // }

    const tags = tagStr.split(',').map(tag => tag.trim())

    createApplication({
      variables: {
        position,
        coverLetter,
        tags,
        companyId
      },
      refetchQueries: [{ query: CompanyQueries.fetchAll }]
    })

    //Prevent re-validation that will fail once the form is reset
    e.preventDefault()
    e.stopPropagation()

    resetFormFields()
  }

  return (
    <div>
      <Form
        className='p-3'
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <Form.Group controlId='application-position-input'>
          <Form.Label>Position / Title</Form.Label>
          <Form.Control
            name='positionInput'
            type='text'
            required
            placeholder='Position / Title'
            {...bindPosition}
          />
          <Form.Control.Feedback type='invalid'>
            Position / Title is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='application-company-select'>
          <Form.Label>Company</Form.Label>
          <Form.Control
            as='select'
            required
            {...bindCompanyId}
            name='companySelect'
          >
            <option value=''>
              {!loading ? 'Select a Company...' : 'Loading...'}
            </option>
            {(companies || []).map(company => (
              <option key={`company-select-${company.name}`} value={company.id}>
                {company.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type='invalid'>
            Company is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='application-tags-input'>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            {...bindTags}
            type='text'
            placeholder='Enter tags separated by a comma (i.e. "frontend, senior, remote")'
          />
        </Form.Group>
        {/* <Form.Group controlId='application-company-input'>
          <Form.Label>Position / Title</Form.Label>
          <Form.Control type='text' />
        </Form.Group> */}
        <Form.Group controlId='application-cover-letter-textarea'>
          <Form.Label>Cover Letter</Form.Label>
          <Form.Control
            as='textarea'
            rows='10'
            placeholder='Cover Letter'
            {...bindCoverLetter}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default compose(
  graphql(CompanyQueries.fetchAllNames, { name: 'fetchAllNames' }),
  graphql(ApplicationQueries.createApplication, { name: 'createApplication' })
)(AddApplicationForm)
