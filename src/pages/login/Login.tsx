import { useState } from 'react'
import Fundo from "../../assets/login_banner.jpeg"
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import { useForm } from "react-hook-form"
import { api } from '../../lib/axios'
import { localStorageKey } from '../../globals'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage'

export default function Login() {

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  const [error, setError] = useState<string>("")

  const [loader, setLoader] = useState<boolean>(false)

  const onLoginSubmit = async (data: any) => {

    // Define um loading
    setLoader(true)

    // Validação minima de dados
    if(
      !(data.email.trim().length > 0) || 
      !(data.senha.trim().length > 0)
    ) {
      setLoader(false)
      setError("Por favor, preencha todos os campos!")
      return;
    }

    // Envio dos dados para a requisição
    const { data: d, status } = await api.post("/auth", data)

    // Resposta
    if(status > 400) {
      setError("Email ou senha invalidos!")
    } else {
      // Salvar no localStorage
      localStorage.setItem(localStorageKey, d.token)
      // Redirecionar
      navigate("/")
    }

    setLoader(false)
  }

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
          <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit(onLoginSubmit)}>
            <FormElement 
              label='Email' 
              placeholder='Digite seu email' 
              metadata='email'
              register={register}
            />
            <FormElement 
              label='Senha' 
              placeholder='Digite sua senha'
              metadata='senha'
              register={register}
              type='password'
            />
            {/* Error handling */}
            {error && (
              <ErrorMessage error={error} />
            )}
            <div className='text-center'>
              <Button text='Entrar' loading={loader} />
            </div>
          </form>
        </div>
      </div>
      <div className='w-[50%] bg-cyan-400 hidden md:lg:block' style={{backgroundImage: `url(${Fundo})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}></div>
    </main>
  )
}