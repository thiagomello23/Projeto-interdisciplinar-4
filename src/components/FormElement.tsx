import {} from 'react'

export default function FormElement({label, placeholder, value}: {label: string, placeholder: string, value?: string}) {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
      <input type="text" placeholder={placeholder} id={label} className='shadow-md p-3 outline-none' defaultValue={value} />
    </div>
  )
}