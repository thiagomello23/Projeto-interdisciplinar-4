import {} from 'react'

export default function DataInput(
  {label, state, setState}: 
  {label: string, state: string, setState: (str: string) => void}
) {
  return (
    <div className='h-[60px] flex'>
      <h1 className='p-6 flex items-center justify-center text-lg bg-secondary-color text-white'>{label}</h1>
      <input 
        type="text" 
        className='w-full h-full shadow-lg p-4 outline-none' 
        placeholder='27/07/2023'
        value={state}
        onChange={(e) => {
          setState(e.target.value)
        }}
      />
    </div>
  )
}
