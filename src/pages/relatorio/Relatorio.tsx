import {} from 'react'
import DataInput from '../../components/DataInput'
import {Select2} from '../../components/Select'
import Check from '../../components/Check'
import { pacienteTableHeads } from '../../globals'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import { useForm } from "react-hook-form"

export default function Relatorio() {

  // Relatório State
  const { handleSubmit, register } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className='w-[80%] m-auto'>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-4xl text-primary-color font-bold'>Relatório</h1>
        <div className='flex justify-between items-center mb-12 mt-6'>
          <div>
            <h1 className='text-xl text-primary-color font-medium mb-2'>Data</h1>
            <div className='flex gap-8'>
              <DataInput label='De' register={register} />
              <DataInput label='Até' register={register} />
            </div>
          </div>
          <div>
            <h1 className='mb-2 text-xl text-primary-color font-medium'>Hora</h1>
            <div>
              <input
                className='shadow-lg p-4 outline-none'
                placeholder='21:00'
                {...register("hora")}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='w-[47%]'>
            <Select2
              label='Escolha um procedimento'
              options={[]}
              {...register("procedimentoSel")}
            />
          </div>
          <div className='w-[16%]'>
            <Select2
              label='Ascendente'
              options={['Ascendente', 'Descendente']}
              {...register("filtro")}
            />
          </div>
        </div>
        <div>
          <h1 className='text-4xl my-14 text-primary-color'>
            Selecione quais campos o procedimento irá ter
          </h1>
          <div className='flex gap-12 flex-wrap pl-2'>
              {pacienteTableHeads.map(item => (
                <Check text={item} key={item} register={register} />
              ))}
          </div>
        </div>
        <div className='mt-10 flex justify-between items-center'>
          <div className='w-[50%]'>
            <h1 className='text-2xl text-primary-color mb-3'>Procedimento específico</h1>
            <Select2
              label='Filtrar por procedimento específico'
              options={[]}
              {...register("procEspecifico")}
            />
          </div>
          <div className=''>
            <h1 className='text-2xl text-primary-color text-center'>Valor específico</h1>
            <div className='flex gap-5'>
              <div className='w-[120px]'>
                <FormElement
                  label=''
                  placeholder='MIN'
                  metadata='min'
                  register={register}
                />
              </div>
              <div className='w-[120px]'>
                <FormElement
                  label=''
                  placeholder='MAX'
                  metadata='max'
                  register={register}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mt-10 m-auto w-[50%]'>
          <Button text='Gerar Relatório' />
        </div>
      </form>
    </div>
  )
}