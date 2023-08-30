import {} from 'react'

export default function Select({label, options}: {label: string, options: string[]}) {
  return (
    <select defaultValue={0} className='bg-secondary-color p-3 w-full outline-none text-white'>
      <option value="0" className='first:hidden'>{label}</option>
      {options.map(el => (
        <option value={el} key={el} className='bg-white text-black'>{el}</option>
      ))}
    </select>
  )
}