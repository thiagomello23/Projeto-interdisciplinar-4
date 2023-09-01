import {  } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import ProcessoElement from '../../components/ProcessoElement'
import Search from '../../components/Search'
import { useStore } from "../../store"
import { useForm } from "react-hook-form"

export default function Procedimento() {
  const modal = useStore(store => store.modal)
  const setModal = useStore(store => store.setModal)
  const modalData = useStore(store => store.modalData)

  const { register, handleSubmit } = useForm()
  const { register: registerEdit, handleSubmit: handleEdit } = useForm()
  const { register: registerSearch, handleSubmit: handleSearch } = useForm()

  const onCadastroSubmit = (data: any) => {
    console.log(data)
  }

  const onSearchSubmit = (data: any) => {
    console.log(data)
  }

  const onEditProcesso = (data: any) => {
    console.log(data)
  }

  return (
    <div className='w-[80%] m-auto'>
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
        <div className='text-center w-[50%] m-auto'>
          <Button text='Cadastrar' />
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
      <div className='w-full bg-primary-color p-2 mt-5 flex flex-col gap-2'>
        <ProcessoElement name='Um novo processo' value={20} />
        <ProcessoElement name='Um novo processo' value={25} />
        <ProcessoElement name='Um novo processo' value={30} />
      </div>
      {modal && (
        <div className='absolute top-1/2 left-1/2 translate-x-[-45%] translate-y-[-50%] z-30 bg-white w-[600px] p-10'>
          <form action="" className='flex flex-col gap-6' onSubmit={handleEdit(onEditProcesso)}>
            <FormElement 
              label='Nome' 
              placeholder='Digite o nome do processo' 
              defaultValue={modalData.processo} 
              metadata='editNomeProcesso'
              register={registerEdit}
            />
            <FormElement 
              label='Valor' 
              placeholder='Digite o valor do processo' 
              defaultValue={modalData.valor.toString()} 
              metadata='editValueProcesso'
              register={registerEdit}
            />
            <div className=' flex flex-1 justify-between'>
              <Button text='Cadastrar' />
              <Button text='Excluir' exclude />
            </div>
          </form>
        </div>
      )}
      <div 
        className='absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-20'
        style={{display: modal ? "block" : "none"}}
        onClick={() => setModal(false)}
      ></div>
    </div>
  )
}