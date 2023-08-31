import { useState } from 'react'
import DataInput from '../../components/DataInput'
import Select from '../../components/Select'
import Check from '../../components/Check'
import { pacienteTableHeads } from '../../globals'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import { useForm } from "react-hook-form"

export default function Relatorio() {

  // Relatório State
  const [minData, setMinData] = useState<string>("")
  const [maxData, setMaxData] = useState<string>("")
  const [hora, setHora] = useState<string>("")
  const [procedimento, setProcedimento] = useState<string>("")
  const [order, setOrder] = useState<string>("")

  const { handleSubmit } = useForm()

  return (
    <div className='w-[80%] m-auto'>
      <h1 className='text-4xl text-primary-color font-bold'>Relatório</h1>
      <div className='flex justify-between items-center mb-12 mt-6'>
        <div>
          <h1 className='text-xl text-primary-color font-medium mb-2'>Data</h1>
          <div className='flex gap-8'>
            <DataInput label='De' state={minData} setState={setMinData} />
            <DataInput label='Até' state={maxData} setState={setMaxData} />
          </div>
        </div>
        <div>
          <h1 className='mb-2 text-xl text-primary-color font-medium'>Hora</h1>
          <div>
            <input 
              className='shadow-lg p-4 outline-none' 
              placeholder='21:00'
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center w-full'>
        <div className='w-[47%]'>
          <Select 
            label='Escolha um procedimento' 
            options={[]}
            state={procedimento}
            setState={setProcedimento}
          />
        </div>
        <div className='w-[16%]'>
          <Select 
            label='Ascendente' 
            options={['Ascendente', 'Descendente']} 
            state={order}
            setState={setOrder}
          />
        </div>
      </div>
      <div>
        <h1 className='text-4xl my-14 text-primary-color'>
          Selecione quais campos o procedimento irá ter
        </h1>
        <div className='flex gap-12 flex-wrap pl-2'>
            {pacienteTableHeads.map(item => (
              <Check text={item} key={item} />
            ))}
        </div>
      </div>
      <div className='mt-10 flex justify-between items-center'>
        <div className='w-[50%]'>
          <h1 className='text-2xl text-primary-color mb-3'>Procedimento específico</h1>
          <Select 
            label='Filtrar por procedimento específico' 
            options={[]} 
          />
        </div>
        <div className=''>
          <h1 className='text-2xl text-primary-color text-center'>Valor específico</h1>
          <div className='flex gap-5'>
            <div className='w-[120px]'>
              <FormElement 
                label='' 
                placeholder='MIN' 
              />
            </div>
            <div className='w-[120px]'>
              <FormElement 
                label='' 
                placeholder='MAX' 
              />
            </div>
          </div>
        </div>
      </div>
      <div className='text-center mt-10 m-auto w-[50%]'><Button text='Gerar Relatório' /></div>
    </div>
  )
}