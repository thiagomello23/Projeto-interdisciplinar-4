import Button from '../../components/Button'
import dayjs from "dayjs"
import fetcher, { api } from '../../lib/axios'
import { localStorageKey } from '../../globals'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import InputMask from 'react-input-mask';
import { FormEvent, useEffect, useState } from "react"

export default function Cadastro() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [error, setError] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [formData, setFormData] = useState<CadastroForm>({
    nome: "",
    horario: "",
    data: "",
    idade: "",
    procedimento: "",
    sobrenome: "",
    telefone: ""
  })

  // INITIAL DATA (procedimentos e paciente)
  const { data, error: procErr } = useSWR<ProcedimentoData[]>("/procedimento", fetcher)
  const { data: editData } = useSWR<DashboardData>(`/paciente/single/${id}`, fetcher)

  useEffect(() => {
    if(editData) {
      setFormData({
        nome: editData!.nome,
        horario: editData!.horario,
        data: dayjs(editData.data).format("DD/MM/YYYY"),
        idade: editData!.idade,
        procedimento: editData!.procedimento,
        sobrenome: editData!.sobrenome,
        telefone: editData!.telefone
      })
    }
  }, [editData, data])

  if(procErr) {
    navigate("/login")
  }

  if(!data || !editData) {
    return null
  }
  // INITIAL DATA (procedimentos e paciente)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    setLoader(true)
    setError("")

    // Validação minima de dados
    if(
      !formData.data ||
      !formData.horario ||
      !formData.idade ||
      !formData.nome ||
      !formData.sobrenome || 
      !formData.telefone
    ) {
      setError("Por favor preencha todos os campos!")
      setLoader(false)
      return;
    }

    // Tratamento de Data
    const newDate = formData.data.split("/") // Pega em sequencia, Dia, Mes e Ano
    const engFormat = `${newDate[1]}-${newDate[0]}-${newDate[2]}`;
    const dataFormatada = dayjs(engFormat).toISOString()

    // Envio para a API
    const { status } = await api.put('/paciente', 
      {
        ...formData, 
        horario: +formData.horario, 
        idade: +formData.idade,
        data: dataFormatada,
        id: editData.id
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
    }

    setLoader(false)
  }

  return (
    <div className='w-[85%] m-auto'>
      <ToastContainer />
      <h1 className='text-3xl uppercase mt-6 font-bold'>
        Editar pacientes cadastrados
      </h1>
      <form className='mt-10 flex flex-col gap-6' onSubmit={onSubmit}>
        <div className='flex flex-col w-full'>
          <label className='text-xl text-primary-color mb-3 font-bold'>Nome</label>
          <input 
            placeholder='Digite o nome do paciente'
            className='shadow-md p-3 outline-none'
            value={formData?.nome}
            onChange={(e) => setFormData(prev => {
              return {...prev, nome: e.target.value}
            })}
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='text-xl text-primary-color mb-3 font-bold'>Sobrenome</label>
          <input 
            placeholder='Digite o sobrenome do paciente'
            className='shadow-md p-3 outline-none' 
            value={formData?.sobrenome}
            onChange={(e) => setFormData(prev => {
              return {...prev, sobrenome: e.target.value}
            })}
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='text-xl text-primary-color mb-3 font-bold'>Telefone</label>
            <InputMask 
              mask='(99) 99999-9999'
              maskChar={null}
              placeholder="Digite o telefone do paciente" 
              className='shadow-md p-3 outline-none' 
              value={formData?.telefone}
              onChange={(e) => setFormData(prev => {
                return {...prev, telefone: e.target.value}
              })}
            />
        </div>
        <div className='flex flex-col w-full'>
          <label className='text-xl text-primary-color mb-3 font-bold'>Idade</label>
            <InputMask 
              mask='999'
              maskChar={null}
              placeholder="Digite a idade do paciente" 
              className='shadow-md p-3 outline-none' 
              value={formData?.idade}
              onChange={(e) => setFormData(prev => {
                return {...prev, idade: e.target.value}
              })}
            />
        </div>
        <div className='flex items-center justify-between text-white'>
          <div className='w-[350px]'>
            <select 
              defaultValue={0} 
              className='bg-secondary-color p-3 w-full outline-none text-white'
              value={formData.procedimento}
              onChange={(e) => setFormData(prev => {
                return {...prev, procedimento: e.target.value}
              })}
            >
              <option value={0} className='first:hidden'>Procedimento</option>
              {data.map(el => (
                <option key={el.id} className='bg-white text-black'>{el.nome}</option>
              ))}
            </select>
          </div>
          <div className='shadow-md p-3 cursor-pointer'>
            <InputMask 
              type="text"
              className='outline-none p-1 text-black' 
              placeholder='21/10/1974'
              maskChar={null}
              mask={"99/99/9999"}
              value={formData?.data}
              onChange={(e) => setFormData(prev => {
                return {...prev, data: e.target.value}
              })}
            />
          </div>
          <div>
            <InputMask 
              type="text" 
              placeholder='Digite a hora que ocorrera' 
              className='outline-none shadow-lg p-3 text-black'
              mask={"99"}
              maskChar={null}
              value={formData?.horario}
              onChange={(e) => setFormData(prev => {
                return {...prev, horario: e.target.value}
              })}
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