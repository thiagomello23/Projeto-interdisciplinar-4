import {} from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='text-white min-h-screen w-[300px] bg-primary-color relative'>
      <h1 className='bg-secondary-color text-2xl mb-28 p-4 text-center'>
        Bem vindo "Nome"
      </h1>
      <ul className='text-center flex flex-col'>
        <NavLink 
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-black/60" : ""
          }
        >
          <li className='text-lg p-5 border-b-2 border-b-black border-t-2 border-t-black cursor-pointer hover:bg-black/60 transition-all duration-200'>
            Pacientes Agendados
          </li>
        </NavLink>
        <NavLink 
          to={"/cadastro"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-black/60" : ""
          }
        >
          <li className='text-lg p-5 border-b-2 border-b-black cursor-pointer hover:bg-black/60 transition-all duration-200'>
            Cadastrar Paciente
          </li>
        </NavLink>
        <NavLink 
          to={"/relatorios"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-black/60" : ""
          }
        >
          <li className='text-lg p-5 border-b-2 border-b-black cursor-pointer hover:bg-black/60 transition-all duration-200'>
            Gerar Relatório
          </li>
        </NavLink>
        <NavLink 
          to={"/procedimentos"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-black/60" : ""
          }
        >
          <li className='text-lg p-5 border-b-2 border-b-black cursor-pointer hover:bg-black/60 transition-all duration-200'>
            Gerenciar Procedimentos
          </li>
        </NavLink>
      </ul>
      <button className='absolute bottom-0 w-full text-center p-3 bg-secondary-color hover:bg-opacity-70 text-lg transition-all duration-200'>
        Logout
      </button>
    </nav>
  )
}
