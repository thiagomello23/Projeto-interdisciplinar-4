import {} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useSWR from 'swr'
import fetcher from '../lib/axios'
import { localStorageKey } from '../globals'
import { useNavigate } from 'react-router-dom';

export default function RootElement() {

  const navigate = useNavigate()

  // Valida se o usuário esta logado ou não
  const {  data, isLoading } = useSWR(`/auth/${localStorage.getItem(localStorageKey)}`, fetcher)

  if(!isLoading) {
    if(data) {
      if(data.cargo === 'ADMINISTRADOR')
        navigate('/admin')
    } else {
      navigate('/login')
    }
  }

  return (
    <main className='flex w-full'>
      <Navbar />
      <div className='w-full p-8'>
        <Outlet />
      </div>
    </main>
  )
}