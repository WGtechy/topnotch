import React from 'react'
import { PiUserThin } from 'react-icons/pi'

const InputComponent2 = ({type, name, required, placeholder}) => {
  return (
    <div className='formInput'>
    <input type ={type} required={required} placeholder={placeholder} className='formInputInput' />
    <label className='formInputLabel'>{name}</label>
  </div>
  )
}

export default InputComponent2