import {} from 'react'
import DataInput from '../../components/DataInput'

export default function Relatorio() {
  return (
    <div className='w-[80%] m-auto'>
      <div className='flex justify-between items-center my-8'>
        <div>
          <h1 className='text-xl text-primary-color font-medium mb-2'>Data</h1>
          <div className='flex gap-8'>
            <DataInput label='De' />
            <DataInput label='Até' />
          </div>
        </div>
        <div>
          <h1 className='mb-2 text-xl text-primary-color font-medium'>Hora</h1>
          <div><input className='shadow-lg p-4 outline-none w-[60%]' placeholder='21:00' /></div>
        </div>
      </div>
      <div>
        <h1>teste</h1>
      </div>
    </div>
  )
}
