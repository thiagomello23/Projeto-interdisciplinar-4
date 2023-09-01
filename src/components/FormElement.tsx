import {} from 'react'
import { UseFormRegister } from 'react-hook-form'

export default function FormElement(
  {label, placeholder, register, metadata, type, defaultValue}: 
  {label: string, placeholder: string, register: UseFormRegister<any>, metadata: string, type?: string, defaultValue?: string}
) {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
      <input 
        type={type ? type : "text"}
        placeholder={placeholder} 
        id={label} 
        className='shadow-md p-3 outline-none' 
        {...register(metadata)}
        defaultValue={defaultValue}
      />
    </div>
  )
}