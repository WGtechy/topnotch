import React from 'react'
import { IoPencil } from 'react-icons/io5'

const EditButton = ({handleClick, update}) => {
  return (
    update && <div className='editButton' onClick={handleClick}><IoPencil /></div>
  )
}

export default EditButton