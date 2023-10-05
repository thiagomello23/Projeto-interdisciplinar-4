import {  useState } from 'react'
import { pacienteTableHeads } from '../../globals'
// import Select from '../../components/Select'
import Search from '../../components/Search'
import { BiEdit } from "react-icons/bi"
import { IconContext } from 'react-icons/'
import { useForm } from "react-hook-form"
import useSWR from 'swr'
import fetcher from '../../lib/axios'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import TableRender from '../../components/TableRender'
import InputMask from 'react-input-mask';

/* 
  Problemas: 
    -- Tamanho da tela não esta suportando 1024px sem quebrar (responsividade ainda quebrada)
    -- Colocar uma mascara no input de data
    -- Filtro e ordenação não funcionam (Removidos por enquanto)
    -- Puxar por data especifica não funciona
*/
export default function Dashboard() {

  // STATES
  const [searchData, setSearchData] = useState<DashboardData[]| null>(null)

  // NAVIGATE
  const navigate = useNavigate()

  // FORMS
  const { register, getValues, watch, handleSubmit } = useForm()

  // Seleção de filtor e ASC|DESC
  // useEffect(() => {
  //   // Toda vez que o filtro ou a ordenação mudar
  //   console.log(getValues())
  // }, [watch(['filtro', 'ordenacao']), getValues])

  // INITIAL FETCHER
  const { data: tableData, error: tableError, isLoading } = useSWR('/paciente', fetcher)

  if(tableError) {
    navigate('/login')
  }
  // INITIAL FETCHER

  // HANDLERS
  const onDataSubmit = (data: any) => {
    const date = data.data;

    // Puxa os registros com base na data atual

    // Verifica a resposta da requisição
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
    <div className='lg:w-full xl:w-[90%] xl:m-auto'>
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
            <InputMask 
              type="text" 
              className='outline-none'
              placeholder={dayjs().format("D/M/YYYY")}
              mask={"99/99/9999"}
              maskChar={null}
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
          {/* <div className='w-[300px]'>
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
          </div> */}
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
            ) : tableData ? (
              <TableRender renderItem={tableData} />
            ) : null}
          </tbody>
        </table>
        {/* Mensagem quando nenhum registro é identificado */}
        {(tableData?.length === 0 && !isLoading) && (
            <div className='text-center mt-8'>
              <h1 className='text-2xl font-bold'>Nenhum cadastro encontrado</h1>
            </div>
        )}
      </div>
    </div>
  )
}