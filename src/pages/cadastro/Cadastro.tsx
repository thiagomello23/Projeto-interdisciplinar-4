import { useState } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Select from '../../components/Select'

export default function Cadastro() {

  // Form States
  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [idade, setIdade] = useState("")
  const [procedimento, setProcedimento] = useState("")
  const [date, setDate] = useState("")
  const [horario, setHorario] = useState("")

  return (
    <div className='w-[85%] m-auto'>
      <h1 className='text-3xl uppercase mt-6 font-bold'>
        Cadastrar Novo Paciente
      </h1>
      <form className='mt-10 flex flex-col gap-6'>
        <FormElement 
          label='Nome' 
          placeholder='Digite o nome do paciente'
          state={nome}
          setState={setNome}
        />
        <FormElement 
          label='Sobrenome' 
          placeholder='Digite o sobrenome do paciente'
          state={sobrenome}
          setState={setSobrenome}
        />
        <FormElement 
          label='Telefone' 
          placeholder='Digite o telefone do paciente' 
          state={telefone}
          setState={setTelefone}
        />
        <FormElement 
          label='Idade' 
          placeholder='Digite a idade do paciente' 
          state={idade}
          setState={setIdade}
        />
        <div className='flex items-center justify-between text-white'>
          <div className='w-[350px]'>
            <Select label='Procedimento' options={[]} state={procedimento} setState={setProcedimento} />
          </div>
          <div className='shadow-md p-3 cursor-pointer'>
            <input 
              type="text"
              className='outline-none p-1 text-black' 
              placeholder='21/10/1974'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder='ex:21:00' 
              className='outline-none shadow-lg p-3 text-black'
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>
        </div>
        <div className='w-[35%] m-auto'>
          <Button text='Cadastrar' />
        </div>
      </form>
    </div>
  )
}