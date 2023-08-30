import {} from 'react'

export default function Search() {
  return (
    <div className='w-full flex relative'>
      <input type="text" placeholder='Buscar por nome' 
        className='outline-none w-full rounded-full p-3 px-4 shadow-md'
      />
      <div className='p-3 absolute right-0 block bg-secondary-color text-white rounded-tr-full rounded-br-full z-10'>
        lupa
      </div>
    </div>
  )
}
