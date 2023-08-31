import { useState, useEffect } from 'react'
import { pacienteTableHeads } from '../../globals'
import TableElement from '../../components/TableElement'
import Select from '../../components/Select'
import Search from '../../components/Search'
import { BiEdit } from "react-icons/bi"
import { IconContext } from 'react-icons/'

export default function Dashboard() {
  // Filter States
  const [date, setDate] = useState("21/03/2023")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [ordering, setOrdering] = useState("")

  useEffect(() => {
    // Toda vez que o search mudar eu atualizo os dados
  }, [search])

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
              placeholder='23/08/2023' 
              value={date} 
              onChange={(e) => setDate(e.target.value)} className='outline-none'
            />
            <div className='p-3 ml-2 bg-secondary-color text-white cursor-pointer'>
              <BiEdit />
            </div>
          </div>
          </IconContext.Provider>

          {/* Filters */}
          <div className='w-[350px]'>
            <Search state={search} setState={setSearch} />
          </div>
          <div className='w-[300px]'>
            <Select 
              label='Selecione um filtro' 
              options={pacienteTableHeads}
              state={filter}
              setState={setFilter}
            />
          </div>
          <div className='w-[100px]'>
            <Select 
              label='ASC' 
              options={['ASC', 'DESC']}
              state={ordering}
              setState={setOrdering}
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
            <TableElement data={["teste","teste","teste","teste","teste","teste","teste"]} />
            <TableElement data={["teste","teste","teste","teste","teste","teste","teste"]} />
          </tbody>
        </table>
      </div>
    </div>
  )
}