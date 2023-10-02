import { useEffect, useState } from 'react'
import { pacienteTableHeads } from '../../globals'
import Select from '../../components/Select'
import Search from '../../components/Search'
import { BiEdit } from "react-icons/bi"
import { IconContext } from 'react-icons/'
import { useForm } from "react-hook-form"
import useSWR from 'swr'
import fetcher from '../../lib/axios'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import TableRender from '../../components/TableRender'

/* 
  Problemas: 
    -- Mostrar o valor de cada consulta
    -- Tamanho da tela não esta suportando 1024px sem quebrar
    -- Colocar uma mascara no input de data
    -- Filtro e ordenação não funcionam
    -- Puxar por data especifica não funciona
*/
export default function Dashboard() {

  // STATES
  const [searchData, setSearchData] = useState<DashboardData[]| null>(null)

  // NAVIGATE
  const navigate = useNavigate()

  // FORMS
  const { register, getValues, watch, handleSubmit } = useForm()

  useEffect(() => {
    // Toda vez que o filtro ou a ordenação mudar
    console.log(getValues())
  }, [watch(['filtro', 'ordenacao']), getValues])

  // INITIAL FETCHER
  const { data: tableData, error: tableError } = useSWR('/paciente', fetcher)

  if(tableError) {
    navigate('/login')
  }

  if(!tableData) {
    return null
  }
  // INITIAL FETCHER

  // HANDLERS
  const onDataSubmit = (data: any) => {
    console.log(data)
  }

  const onSearchSubmit = (data: any) => {
    setSearchData(
      tableData.filter((item: DashboardData) => {
        if(item.nome.startsWith(data.search)) {
          return item;
        }
      })
    )
  }

  return (
    <div className='w-[90%] m-auto'>
      <div>
        <h1 className=' text-3xl font-bold mt-8'>
          53 PACIENTES CADASTRADOS PARA HOJE!
        </h1>
        <div className='w-full flex justify-between items-center mt-16 mb-5'>

          {/* Change Data */}
          <IconContext.Provider value={{className: "w-[23px]"}}>
          <div
            className='text-lg flex items-center pl-2 shadow-md text-black'
          >
            <input 
              type="text" 
              className='outline-none'
              placeholder={dayjs().format("D/M/YYYY")}
              {...register("data")}
            />
            <div className='p-3 ml-2 bg-secondary-color text-white cursor-pointer'>
              {/* Form especifico para Submit de Data */}
              <form onSubmit={handleSubmit(onDataSubmit)}>
                <button type='submit'>
                  <BiEdit />
                </button>
              </form>
            </div>
          </div>
          </IconContext.Provider>

          {/* Filters */}
          <div className='w-[350px]'>
            {/* Form especifico para submit de Busca */}
            <form action="" onSubmit={handleSubmit(onSearchSubmit)}>
              <button type='submit' className='w-[330px]'>
                <Search register={register} metadata='search' />
              </button>
            </form>
          </div>
          <div className='w-[300px]'>
            <Select 
              label='Selecione um filtro' 
              options={pacienteTableHeads}
              {...register("filtro")}
            />
          </div>
          <div className='w-[100px]'>
            <Select 
              label='ASC' 
              options={['ASC', 'DESC']}
              {...register("ordenacao")}
            />
          </div>
        </div>
        {/* Table */}
        <table className='w-full shadow-lg'>
          <thead className='bg-secondary-color text-white p-3 w-full'>
            <tr>
              {pacienteTableHeads.map(item => (
                <th className='text-center font-bold p-4 text-xl'>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table Render */}
            {searchData ? (
              <TableRender renderItem={searchData} />
            ) : (
              <TableRender renderItem={tableData} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}