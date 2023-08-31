import {} from 'react'
import {UseFormRegister, FieldValues } from 'react-hook-form'

export default function Check({text, register}: {text: string, register: UseFormRegister<FieldValues>}) {
  console.log("teste")
  return (
    <div className='flex gap-3'>
      <input type="checkbox" className='scale-[220%]' {...register(text.toLowerCase())} />
      <h2 className='text-2xl text-primary-color'>{text}</h2>
    </div>
  )
}