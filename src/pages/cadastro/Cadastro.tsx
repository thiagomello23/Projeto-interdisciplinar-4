import { useState } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Select from '../../components/Select'
import { useForm } from "react-hook-form"
import dayjs from "dayjs"
import { api } from '../../lib/axios'
import { localStorageKey } from '../../globals'

/* 
  Problemas:
    -- Componentizar o elemento "Error"
    -- Validar os procedimentos (data.procedimento !== "0"  ||)
*/
export default function Cadastro() {
  const { register, handleSubmit } = useForm<CadastroForm>()

  const [error, setError] = useState<string>("")

  const onSubmit = async (data: CadastroForm) => {
    console.log(data)

    // Validação minima de dados
    if(
      !data.data ||
      !data.horario ||
      !data.idade ||
      !data.nome ||
      !data.sobrenome || 
      !data.telefone
    ) {
      //
      setError("Por favor preencha todos os campos!")
      return;
    }

    // Tratamento de Data
    const horarioFormatado = dayjs(data.data).toISOString()

    // Envio para a API
    const { status } = await api.post('', {...data, horario: horarioFormatado}, {
      headers: {
        Authorization: localStorage.getItem(localStorageKey)
      }
    })

    // Resposta
    if(status >= 400) {
      //
      setError("Campos invalidos!")
    } else {
      //
    }
  }

  return (
    <div className='w-[85%] m-auto'>
      <h1 className='text-3xl uppercase mt-6 font-bold'>
        Cadastrar Novo Paciente
      </h1>
      <form className='mt-10 flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <FormElement 
          label='Nome' 
          placeholder='Digite o nome do paciente'
          metadata='nome'
          register={register}
        />
        <FormElement 
          label='Sobrenome' 
          placeholder='Digite o sobrenome do paciente'
          metadata='sobrenome'
          register={register}
        />
        <FormElement 
          label='Telefone' 
          placeholder='Digite o telefone do paciente' 
          metadata='telefone'
          register={register}
        />
        <FormElement 
          label='Idade' 
          placeholder='Digite a idade do paciente' 
          metadata='idade'
          register={register}
        />
        <div className='flex items-center justify-between text-white'>
          <div className='w-[350px]'>
            <Select 
              label='Procedimento' 
              options={[]}
              {...register("procedimento")}
            />
          </div>
          <div className='shadow-md p-3 cursor-pointer'>
            <input 
              type="text"
              className='outline-none p-1 text-black' 
              placeholder='21/10/1974'
              {...register("data")}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder='ex:21:00' 
              className='outline-none shadow-lg p-3 text-black'
              {...register("horario")}
            />
          </div>
        </div>
        {error && (
          <p className='text-sm text-red-500 text-center font-bold'>{error}</p>
        )}
        <div className='w-[35%] m-auto'>
          <Button text='Cadastrar' />
        </div>
      </form>
    </div>
  )
}