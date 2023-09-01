import {} from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Search({register, metadata}: {register: UseFormRegister<FieldValues>, metadata: string}) {

  return (
    <div className='w-full flex relative'>
      <input type="text" placeholder='Buscar por nome' 
        className='outline-none w-full rounded-full p-3 px-4 shadow-md'
        {...register(metadata)}
      />
      <div className='cursor-pointer p-4 absolute right-0 block bg-secondary-color text-white rounded-tr-full rounded-br-full z-10'>
        <AiOutlineSearch />
      </div>
    </div>
  )
}
