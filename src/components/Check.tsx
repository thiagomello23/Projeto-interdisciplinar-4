import {} from 'react'

export default function Check({text}: {text: string}) {
  return (
    <div className='flex gap-3'>
      <input type="checkbox" className='scale-[220%]' />
      <h2 className='text-2xl text-primary-color'>{text}</h2>
    </div>
  )
}