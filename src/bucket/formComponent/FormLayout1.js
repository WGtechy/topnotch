import React from 'react'

const FormLayout1 = (props) => {
  const {submitToServer, children} = props
  return (
    <form onSubmit ={submitToServer} className="contactFormContainer">{children}</form>
  )
}

export default FormLayout1