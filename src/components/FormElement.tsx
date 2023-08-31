import {} from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

export default function FormElement(
  {label, placeholder, register, metadata}: 
  {label: string, placeholder: string, register: UseFormRegister<FieldValues>, metadata: string}
) {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        id={label} 
        className='shadow-md p-3 outline-none' 
        {...register(metadata)}
      />
    </div>
  )
}