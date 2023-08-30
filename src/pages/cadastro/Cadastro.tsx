import {} from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Select from '../../components/Select'

export default function Cadastro() {
  return (
    <div className='w-[85%] m-auto'>
      <h1 className='text-3xl uppercase mt-6 font-bold'>
        Cadastrar Novo Paciente
      </h1>
      <form className='mt-10 flex flex-col gap-6'>
        <FormElement label='Nome' placeholder='Digite o nome do paciente' />
        <FormElement label='Sobrenome' placeholder='Digite o sobrenome do paciente' />
        <FormElement label='Telefone' placeholder='Digite o telefone do paciente' />
        <FormElement label='Idade' placeholder='Digite a idade do paciente' />
        <div className='flex items-center justify-between text-white'>
          <div className='w-[350px]'><Select label='Procedimento' options={[]} /></div>
          <div className='bg-secondary-color p-3 cursor-pointer'>
            Escolha uma data
          </div>
          <div>
            <input type="text" placeholder='ex:21:00' className='outline-none shadow-lg p-3 text-black' />
          </div>
        </div>
        <Button text='Cadastrar' />
      </form>
    </div>
  )
}