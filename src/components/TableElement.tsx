import {} from 'react'

export default function TableElement({data, id}: {data: string[], id: string}) {
  return (
    <tr className='even:bg-primary-color odd:bg-white even:text-white'>
      {data.map(el => (
        <td className='p-3 font-medium text-lg border-r-2 border-gray-400' key={el + Math.random()}>
          <a href={`/cadastro/${id}`} className='underline w-full px-3'>{el}</a>
        </td>
      ))}
    </tr>
  )
}
