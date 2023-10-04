import React, { Fragment } from 'react'
import ProcessoElement from './ProcessoElement'

export default function ProcessoRender({renderItem}: {renderItem: ProcedimentoData[]}) {
  return (
    <>
      {renderItem.map(item => (
        <Fragment key={item.id}>
          <ProcessoElement name={item.nome} value={item.valor} id={item.id} />
        </Fragment>
      ))}
    </>
  )
}
