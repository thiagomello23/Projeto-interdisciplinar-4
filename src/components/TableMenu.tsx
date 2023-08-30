import {} from 'react'
import Search from './Search'

export default function TableMenu() {
  return (
    <div className='w-full flex justify-between items-center mt-16 mb-5'>
      <div className='bg-secondary-color p-3 text-white'>
        23/08/2023
      </div>
      <div className='w-[350px]'>
        <Search />
      </div>
      <select defaultValue={0} className='text-white bg-secondary-color p-3 outline-none w-[300px]'>
        <option value="0" className='first:hidden bg-white text-black'>Selecione o filtro</option>
        <option value="1" className='bg-white text-black'>Selecione o filtro</option>
        <option value="2" className='bg-white text-black'>Selecione o filtro</option>
      </select>
      <select className='text-white bg-secondary-color p-3 outline-none'>
        <option value="ASC" className='bg-white text-black'>ASC</option>
        <option value="DESC" className='bg-white text-black'>DESC</option>
      </select>
    </div>
  )
}
