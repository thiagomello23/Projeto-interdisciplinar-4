import {  useState } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Search from '../../components/Search'
import { useStore } from "../../store"
import { useForm } from "react-hook-form"
import useSWR from 'swr'
import fetcher, { api } from '../../lib/axios'
import ProcessoRender from '../../components/ProcessoRender'
import { useNavigate } from 'react-router-dom'
import { localStorageKey } from '../../globals'
import ErrorMessage from '../../components/ErrorMessage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* 
  Bug na exclusão do procedimento, quando abre a modal os dados antigos são mostrados
  (Problema esta no react hook forms)
*/
export default function Procedimento() {

  // State
  const modal = useStore(store => store.modal)
  const setModal = useStore(store => store.setModal)
  const modalData = useStore(store => store.modalData)
  const setModalData = useStore(store => store.setModalData)

  const [searchData, setSearchData] = useState<ProcedimentoData[]>()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)
  const [modalLoaders, setModalLoaders] = useState({
    edit: false,
    exclude: false
  })

  const navigate = useNavigate()
 
  const { register, handleSubmit } = useForm<ProcedimentoSubmit>()
  const { register: registerSearch, handleSubmit: handleSearch } = useForm()

  // INITIAL DATA
  const { data, error, mutate } = useSWR('/procedimento', fetcher)

  if(error) {
    navigate('/login')
  }

  if(!data) {
    return null;
  }
  // INITIAL DATA

  const onCadastroSubmit = async (d: ProcedimentoSubmit) => {
    setLoader(true)

    // Validação minima de dados
    if(
      d.nomeProcesso.trim().length === 0 ||
      d.valor.trim().length === 0 
    ) {
      setErrorMessage("Por favor preencha todos os campos!")
      setLoader(false)
      return;
    }

    // Tratamento de valor
    const valorFormatado = d.valor.toString().replace(",", ".")

    if(!(+valorFormatado > 0)) {
      setErrorMessage("O campo valor não pode ser negativo!")
      setLoader(false)
      return;
    }

    // Enviar os dados para API
    const { status } = await api.post('/procedimento', {
      nome: d.nomeProcesso,
      valor: valorFormatado
    }, {
      headers: {
        Authorization: localStorage.getItem(localStorageKey)
      }
    })

    // Validar o envio
    if(status >= 400) {
      // error handler de procedimento já cadastrado
      setErrorMessage("Falha ao cadastrar o procedimento!")
    } else {
      // Toasty dizendo que cadastrou com sucesso
      toast.success('Procedimento cadastrado com sucesso!')
      // Atualização na rota de API
      mutate()
      // Clear de dados
      setErrorMessage('')
    }

    setLoader(false)
  }

  const onSearchSubmit = (d: any) => {
    setSearchData(
      data.filter((item: ProcedimentoData) => {
        if(item.nome.startsWith(d.search)) {
          return item;
        }
      })
    )
  }

  const onEditProcesso = async (e: React.FormEvent) => {
    e.preventDefault()
    // Botar um error handling especifico para modal
    // Botar um loader especifico para modal tanto edit quant oexclusão
    setModalLoaders({edit: true, exclude: false})

    // Pegando o ID do processo
    const processoId = modalData.id

    // Validação minima de dados
    if(
      modalData.processo.trim().length === 0 ||
      modalData.valor.toString().trim().length === 0 
    ) {
      setModalErrorMessage("Por favor preencha todos os campos!")
      setModalLoaders({edit: false, exclude: false})
      return;
    }

    if(!(+modalData.valor > 0)) {
      setModalErrorMessage("O campo valor não pode ser negativo!")
      setModalLoaders({edit: false, exclude: false})
      return;
    }

    // Enviando a requisição de atualização dos dados
    const { status } = await api.put('/procedimento', {
      id: processoId,
      nome: modalData.processo,
      valor: modalData.valor
    }, {
      headers: {
        Authorization: localStorage.getItem(localStorageKey)
      }
    })

    // Validando a resposta da requisição
    if(status >= 400) {
      // Mensagem de erro na modal
    } else {  
      // Toasty de sucesso
      toast.success("Procedimento atualizado com sucesso!")
      // Fecha a modal
      setModal(false)
      // Atualiza os dados
      mutate()
    }
    setModalLoaders({edit: false, exclude: false})
  }

  const onExcludeProcess = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Pega o ID
    const processId = modalData.id

    // Enviar para a requisição da API
    const { status } = await api.delete(`/procedimento/${processId}`, {
      headers: {
        Authorization: localStorage.getItem(localStorageKey)
      }
    })
    
    // Valida a resposta da requisição
    if(status >= 400) {
      setModalErrorMessage("Falha ao excluir o procedimento, tente novamente!")
    } else {
      mutate()
      setModalErrorMessage("")
      setModal(false)
      toast.success("Procedimento deletado com sucesso!")
    }
  }

  return (
    <div className='w-[80%] m-auto'>
      <ToastContainer />
      {/* Cadastrar procedimento */}
      <h1 className='text-primary-color text-3xl mb-10 mt-5 font-bold uppercase'>
        Cadastrar novo procedimento
      </h1>
      <form className='mb-28' onSubmit={handleSubmit(onCadastroSubmit)}>
        <div className='flex justify-between'>
          <div className='w-[60%]'>
            <FormElement label='Procedimento' placeholder='Digite o nome do procedimento' metadata='nomeProcesso' register={register} />
          </div>
          <div className='w-[35%]'>
            <FormElement label='Valor' placeholder='ex: 2330,00' metadata='valor' register={register} />
          </div>
        </div>
        {errorMessage && (
          <div className='mt-10'>
            <ErrorMessage error={errorMessage} />
          </div>
        )}
        <div className='text-center w-[50%] m-auto'>
          <Button text='Cadastrar' loading={loader} />
        </div>
      </form>
      {/* Mostrar procedimentos cadastrados */}
      <div className='w-[40%]'>
        <form action="" onSubmit={handleSearch(onSearchSubmit)}>
          <button type='submit'>
            <Search metadata='search' register={registerSearch} />
          </button>
        </form>
      </div>
      {/* Renderização dos processos */}
      <div className='w-full bg-primary-color p-2 mt-5 flex flex-col gap-2'>
        {searchData ? <ProcessoRender renderItem={searchData} /> : <ProcessoRender renderItem={data} />}
      </div>
      {modal && (
        <div className='absolute top-1/2 left-1/2 translate-x-[-45%] translate-y-[-50%] z-30 bg-white w-[600px] p-10'>
          <form action="" className='flex flex-col gap-6'>
            {/* Re renderizando os componentes na mão por bug de state do react */}
            <div className='flex flex-col w-full'>
              <label htmlFor={"Nome"} className='text-xl text-primary-color mb-3 font-bold'>Nome</label>
              <input 
                // key={modalData.processo}
                placeholder={"Digite o nome do processo!"} 
                id={"Nome"}
                className='shadow-md p-3 outline-none' 
                value={modalData.processo}
                onChange={(e) => setModalData({valor: modalData.valor, processo: e.target.value, id: modalData.id})}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor={"Valor"} className='text-xl text-primary-color mb-3 font-bold'>Valor</label>
              <input 
                // key={modalData.valor.toString()}
                placeholder={"Digite o valor do processo!"} 
                id={"Valor"} 
                className='shadow-md p-3 outline-none' 
                value={modalData.valor.toString()}
                onChange={(e) => setModalData({valor: e.target.value, processo: modalData.processo, id: modalData.id})}
              />
            </div>
            {modalErrorMessage && (
              <ErrorMessage error={modalErrorMessage} />
            )}
            <div className=' flex flex-1 justify-between'>
              <div className='w-[200px]'>
                <Button text='Editar' loading={modalLoaders.edit} onClick={onEditProcesso} /></div>
              <div className='w-[200px]'>
                <Button text='Excluir' loading={modalLoaders.exclude} exclude={true} onClick={onExcludeProcess} /></div>
            </div>
          </form>
        </div>
      )}
      <div 
        className='absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-20'
        style={{display: modal ? "block" : "none"}}
        onClick={() => {
          setModalErrorMessage("")
          setModal(false)
        }}
      ></div>
    </div>
  )
}