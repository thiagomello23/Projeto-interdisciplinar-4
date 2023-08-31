import {} from 'react'

export default function Select(
  {label, options, state, setState}: 
  {label: string, options: string[], state: string, setState: (st: string) => void}
) {
  return (
    <select defaultValue={0} value={state} onChange={(e) => {setState(e.target.value)}} className='bg-secondary-color p-3 w-full outline-none text-white'>
      <option value={0} className='first:hidden'>{label}</option>
      {options.map(el => (
        <option value={el} key={el} className='bg-white text-black'>{el}</option>
      ))}
    </select>
  )
}