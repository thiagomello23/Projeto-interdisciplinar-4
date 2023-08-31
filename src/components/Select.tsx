import React, {} from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

// label, options[]
export default function Select(
  {label, options}: 
  {label: string, options: string[], register: UseFormRegister<FieldValues>}
) {
  return (
    <select  
      className='bg-secondary-color p-3 w-full outline-none text-white'
    >
      <option value={0} className='first:hidden'>{label}</option>
      {options.map(el => (
        <option value={el} key={el} className='bg-white text-black'>{el}</option>
      ))}
    </select>
  )
}

export const Select2 = React.forwardRef<
  HTMLSelectElement, 
  {label: string, options: string[]} 
  & ReturnType<UseFormRegister<FieldValues>>
>(({label, options, onChange, name, onBlur}, ref) => {

  return (
    <select 
      defaultValue={0} 
      className='bg-secondary-color p-3 w-full outline-none text-white'
      ref={ref}
      onChange={onChange}
      name={name}
      onBlur={onBlur}
    >
      <option value={0} className='first:hidden'>{label}</option>
      {options.map(el => (
        <option value={el} key={el} className='bg-white text-black'>{el}</option>
      ))}
    </select>
  )
})

// export default function teste() {}