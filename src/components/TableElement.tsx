import {} from 'react'

export default function TableElement({data}: {data: string[]}) {
  return (
    <tr className='even:bg-primary-color odd:bg-white even:text-white'>
      {data.map(el => (
        <td className='p-3 font-medium text-lg border-r-2 border-gray-400' key={el + Math.random()}>
          {el}
        </td>
      ))}
    </tr>
  )
}
