import { useState } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Select from '../../components/Select'
import { useForm } from "react-hook-form"
import dayjs from "dayjs"
import fetcher, { api } from '../../lib/axios'
import { localStorageKey } from '../../globals'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import InputMask from 'react-input-mask';

/* 
  Problemas:
    -- Componentizar o elemento "Error"
    -- Validar os procedimentos (data.procedimento !== "0"  ||)
*/
export default function Cadastro() {

  const navigate = useNavigate()

  const { register, handleSubmit, reset, control } = useForm<CadastroForm>()

  const [error, setError] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)

  // INITIAL DATA (procedimentos)
  const { data, error: procErr } = useSWR<ProcedimentoData[]>("/procedimento", fetcher)

  if(procErr) {
    navigate("/login")
  }

  if(!data) {
    return null
  }
  // INITIAL DATA (procedimentos)

  const onSubmit = async (data: CadastroForm) => {
    setLoader(true)
    setError("")

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
      setError("Por favor preencha todos os campos!")
      setLoader(false)
      return;
    }

    // Tratamento de Data
    const newDate = data.data.split("/") // Pega em sequencia, Dia, Mes e Ano
    const engFormat = `${newDate[1]}-${newDate[0]}-${newDate[2]}`;
    const dataFormatada = dayjs(engFormat).toISOString()

    // Envio para a API
    const { status } = await api.post('/paciente', 
      {
        ...data, 
        horario: +data.horario, 
        idade: +data.idade,
        data: dataFormatada
      }, {
        headers: {
          Authorization: localStorage.getItem(localStorageKey)
        }
      }
    )

    // Resposta
    if(status >= 400) {
      setError("Campos invalidos!")
    } else {
      toast.success("Usuário cadastrado com sucesso!")
      reset()
    }

    setLoader(false)
  }

  return (
    <div className='w-[85%] m-auto'>
      <ToastContainer />
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
          control={control}
          mask='(99) 99999-9999'
        />
        <FormElement 
          label='Idade' 
          placeholder='Digite a idade do paciente' 
          metadata='idade'
          mask='999'
          register={register}
          control={control}
          type='text'
        />
        <div className='flex items-center justify-between text-white'>
          <div className='w-[350px]'>
            <Select 
              label='Procedimento' 
              options={data.map(item => {
                return item.nome
              })}
              {...register("procedimento")}
            />
          </div>
          <div className='shadow-md p-3 cursor-pointer'>
            <InputMask 
              type="text"
              className='outline-none p-1 text-black' 
              placeholder='21/10/1974'
              maskChar={null}
              mask={"99/99/9999"}
              {...register("data")}
            />
          </div>
          <div>
            <InputMask 
              type="text" 
              placeholder='ex:21:00' 
              className='outline-none shadow-lg p-3 text-black'
              mask={"99"}
              maskChar={null}
              {...register("horario")}
            />
          </div>
        </div>
        {error && (
          <p className='text-sm text-red-500 text-center font-bold'>{error}</p>
        )}
        <div className='w-[35%] m-auto'>
          <Button text='Cadastrar' loading={loader} />
        </div>
      </form>
    </div>
  )
}