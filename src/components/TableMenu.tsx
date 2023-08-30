import {} from 'react'
import Search from './Search'
import Select from './Select'
import { pacienteTableHeads } from '../globals'

export default function TableMenu() {
  return (
    <div className='w-full flex justify-between items-center mt-16 mb-5'>
      <div className='bg-secondary-color p-3 text-white'>
        23/08/2023
      </div>
      <div className='w-[350px]'>
        <Search />
      </div>
      <div className='w-[300px]'>
        <Select label='Selecione um filtro' options={pacienteTableHeads} />
      </div>
      <div className='w-[100px]'>
        <Select label='ASC' options={['ASC', 'DESC']} />
      </div>
    </div>
  )
}
