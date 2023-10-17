import { useState } from 'react'
import DataInput from '../../components/DataInput'
import Select from '../../components/Select'
import Check from '../../components/Check'
import { localStorageKey, pacienteTableHeads } from '../../globals'
import Button from '../../components/Button'
import { useForm } from "react-hook-form"
import InputMask from 'react-input-mask';
import { api } from '../../lib/axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import generatePdfHeader from '../../lib/generatePdfHeader'
import generatePdfBody from '../../lib/generatePdfBody'
import ErrorMessage from '../../components/ErrorMessage'

// Loading no botão e error handling
export default function Relatorio() {

  // Relatório State
  const { handleSubmit, register } = useForm()

  const [loader, setLoader] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (d: any) => {
    // Inicia o loader do botão
    setLoader(true)

    // Validar os dados
    if(d["De"].length === 0 || d["Até"].length === 0) {
      setLoader(false)
      setErrorMessage('Valores de data são necessários para gerar um relatório!')
      return;
    }

    // Define os campos que foram selecionados
    const selectedFields = {
      nome: d.nome,
      sobrenome: d.sobrenome,
      idade: d.idade,
      procedimento: d.procedimento,
      horario: d.horario,
      valor: d.valor,
      telefone: d.telefone,
    }

    // Formatando as datas
    const dataInicialSplit = d["De"].split("/")
    const dataFinalSplit = d["Até"].split("/")
    
    // Enviar os dados para a API
    const { data: dRelatorio, status } = await api.post('/usuario/relatorio', {
      dataInicial: `${dataInicialSplit[1]}-${dataInicialSplit[0]}-${dataInicialSplit[2]}`,
      dataFinal: `${dataFinalSplit[1]}-${dataFinalSplit[0]}-${dataFinalSplit[2]}`,
      filtroSel: d.filtroSel === '0' ? '': d.filtroSel ,
      filtro: d.filtro,
      hora: d.hora,
      ...selectedFields
    }, {
      headers: {
        Authorization: localStorage.getItem(localStorageKey)
      }
    })

    // Error handling
    if(status >= 400) {
      setErrorMessage('Falha ao gerar o relatório, por favor confira os campos e tente novamente!')
      setLoader(false)
      return;
    }

    // Setup do PDF
    const doc = new jsPDF({
      orientation: "landscape"
    })

    // Gerando o header
    const header = generatePdfHeader(selectedFields)

    // Gerando o body do pdf
    const body = generatePdfBody(dRelatorio)

    // Gerando o PDF
    autoTable(doc, {
      head: [
        header
      ],
      body: [
        ...body
      ]
    })

    setLoader(false)
    setErrorMessage('')
    doc.save("relatorio.pdf")
  }

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
              <InputMask
                className='shadow-lg p-4 outline-none'
                placeholder='21:00'
                {...register("hora")}
                mask={"99"}
                maskChar={null}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='w-[47%]'>
            <Select
              label='Escolha um filtro'
              options={[
                "nome",
                "sobrenome",
                "idade",
                "procedimento",
                "horario",
                "valor",
                "telefone"
              ]}
              {...register("filtroSel")}
            />
          </div>
          <div className='w-[16%]'>
            <Select
              label='Ascendente'
              options={['Ascendente', 'Descendente']}
              {...register("filtro")}
            />
          </div>
        </div>
        <div className='mb-16'>
          <h1 className='text-4xl my-14 text-primary-color'>
            Selecione quais campos o relatório irá possuir
          </h1>
          <div className='flex gap-12 flex-wrap pl-2'>
              {pacienteTableHeads.map(item => (
                <Check text={item} key={item} register={register} />
              ))}
          </div>
        </div>    
        <ErrorMessage error={errorMessage} />
        <div className='text-center m-auto w-[50%]'>
          <Button text='Gerar Relatório' loading={loader} />
        </div>
      </form>
    </div>
  )
}

/* 
<div className='mt-10 flex justify-between items-center'>
  <div className='w-[50%]'>
    <h1 className='text-2xl text-primary-color mb-3'>Procedimento específico</h1>
    <Select
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
*/

// INITIAL DATA
// const { data, error, isLoading } =  useSWR("/procedimento", fetcher)

// if(isLoading) {
//   return null;
// }

// if(error) {
//   navigate("/login")
// }
// INITIAL DATA