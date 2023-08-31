import {} from 'react'

export default function FormElement(
  {label, placeholder, value, state, setState}: 
  {label: string, placeholder: string, value?: string, state: string, setState: (str: string) => void}
) {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='text-xl text-primary-color mb-3 font-bold'>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        id={label} 
        className='shadow-md p-3 outline-none' 
        defaultValue={value} 
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  )
}