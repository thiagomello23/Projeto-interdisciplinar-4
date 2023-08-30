import {} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function RootElement() {
  return (
    <main className='flex w-full'>
      <Navbar />
      <div className='w-full p-8'>
        <Outlet />
      </div>
    </main>
  )
}
