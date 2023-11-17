import {Fragment} from 'react'
import TableElement from './TableElement'

export default function TableRender({renderItem}: {renderItem: DashboardData[]}) {
  return (
    <>
      {renderItem.map((item: DashboardData) => (
        <Fragment key={item.id}>
          <TableElement id={item.id} data={
            [
              item.nome,
              item.sobrenome,
              item.idade,
              item.procedimento,
              (item.horario + ":00"),
              item.valor,
              item.telefone
            ]
          } />
        </Fragment>
      ))}
    </>
  )
}
