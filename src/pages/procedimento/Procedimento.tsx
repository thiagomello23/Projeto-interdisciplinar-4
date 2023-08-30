import {  } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import ProcessoElement from '../../components/ProcessoElement'
import Search from '../../components/Search'
import { useStore } from "../../store"

export default function Procedimento() {
  const modal = useStore(store => store.modal)
  const setModal = useStore(store => store.setModal)

  const modalData = useStore(store => store.modalData)


  return (
    <div className='w-[80%] m-auto'>
      {/* Cadastrar procedimento */}
      <h1 className='text-primary-color text-3xl mb-10 mt-5 font-bold uppercase'>
        Cadastrar novo procedimento
      </h1>
      <form className='mb-28'>
        <div className='flex justify-between'>
          <div className='w-[60%]'>
            <FormElement label='Procedimento' placeholder='Digite o nome do procedimento' />
          </div>
          <div className='w-[35%]'>
            <FormElement label='Valor' placeholder='ex: 2330,00' />
          </div>
        </div>
        <div className='text-center w-full'>
          <Button text='Cadastrar' />
        </div>
      </form>
      {/* Mostrar procedimentos cadastrados */}
      <div className='w-[40%]'>
        <Search />
      </div>
      <div className='w-full bg-primary-color p-2 mt-5 flex flex-col gap-2'>
        <ProcessoElement name='Um novo processo' value={20} />
        <ProcessoElement name='Um novo processo' value={25} />
        <ProcessoElement name='Um novo processo' value={30} />
      </div>
      {modal && (
        <div className='absolute top-1/2 left-1/2 translate-x-[-45%] translate-y-[-50%] z-30 bg-white w-[600px] p-10'>
          <form action="" className='flex flex-col gap-6'>
            <FormElement label='Nome' placeholder='Digite o nome do processo' value={modalData.processo} />
            <FormElement label='Valor' placeholder='Digite o valor do processo' value={modalData.valor.toString()} />
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
