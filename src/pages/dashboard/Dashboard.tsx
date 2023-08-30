import {} from 'react'
import { pacienteTableHeads } from '../../globals'
import TableElement from '../../components/TableElement'
import TableMenu from '../../components/TableMenu'

export default function Dashboard() {
  return (
    <div className='w-[90%] m-auto'>
      <div>
        <h1 className=' text-3xl font-bold mt-8'>
          53 PACIENTES CADASTRADOS PARA HOJE!
        </h1>
        <TableMenu />
        {/* Table */}
        <table className='w-full shadow-lg'>
          <thead className='bg-secondary-color text-white p-3 w-full'>
            <tr>
              {pacienteTableHeads.map(item => (
                <th className='text-center font-bold p-4 text-xl'>{item}</th>
              ))}
            </tr>
          </thead>
          {/* Componentizar */}
          <tbody>
            <TableElement data={["teste","teste","teste","teste","teste","teste","teste"]} />
            <TableElement data={["teste","teste","teste","teste","teste","teste","teste"]} />
          </tbody>
        </table>
      </div>
    </div>
  )
}