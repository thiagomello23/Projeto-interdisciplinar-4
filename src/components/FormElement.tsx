import {} from 'react'
import { Controller, UseFormRegister } from 'react-hook-form'
import InputMask from 'react-input-mask';

export default function FormElement(
  {label, placeholder, register, metadata, type, defaultValue, mask, control}: 
  {
    label: string, 
    placeholder: string, 
    register: UseFormRegister<any>, 
    metadata: string, 
    type?: string, 
    defaultValue?: string,
    mask?: string,
    control?: any
  }
) {

  if(mask) {
    return (
      // Transformar em Controller Form
      <div className='flex flex-col w-full'>
        <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
        <Controller 
          name={metadata}
          control={control}
          render={({ field }) => (
            <InputMask 
              mask={mask}
              maskChar={null}
              type={type ? type : "text"}
              placeholder={placeholder} 
              id={label} 
              className='shadow-md p-3 outline-none' 
              {...field}
            />
          )}
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
      <input 
        type={type ? type : "text"}
        placeholder={placeholder} 
        id={label} 
        value={defaultValue}
        className='shadow-md p-3 outline-none' 
        {...register(metadata)}
      />
    </div>
  )
}