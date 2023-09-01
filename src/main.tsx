import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './providers/Router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
// Mudar o nome do pacientesTableHeads
// Criar componente para titulo
// Fazer a tipagem de dados das telas, Colocar loaders nos botoes, 
// fazer error handlers, adicionar toasts, adicionar skeleton loaders
// Colocar tipagem dinamica nos inputs
// Bug no procedimento, botao com cor diferente e problema no submit