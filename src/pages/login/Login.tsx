import { useState } from 'react'
import Fundo from "../../assets/login_banner.jpeg"
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'

export default function Login() {

  // Form State
  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")

  return (
    <main className='bg-white w-full min-h-screen flex relative'>
      <h3 className='absolute top-0 left-0 text-black p-6'>
        LOGO
      </h3>
      <div className='w-full lg:w-[50%] flex justify-center items-center flex-col'>
        <div className='w-[60%] mb-20'>
          <div className='border-b-2 border-b-primary-color w-[80%] m-auto text-center mb-10'>
            <h1 className='text-6xl pb-4 text-primary-color'>Log In</h1>
          </div>
          <form action="" className='flex flex-col gap-5'>
            <FormElement 
              label='Email' 
              placeholder='Digite seu email' 
              state={email}
              setState={setEmail}
            />
            <FormElement 
              label='Senha' 
              placeholder='Digite sua senha'
              state={senha}
              setState={setSenha}
            />
            <div className='text-center'>
              <Button text='Entrar' />
            </div>
          </form>
        </div>
      </div>
      <div className='w-[50%] bg-cyan-400 hidden md:lg:block' style={{backgroundImage: `url(${Fundo})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}></div>
    </main>
  )
}