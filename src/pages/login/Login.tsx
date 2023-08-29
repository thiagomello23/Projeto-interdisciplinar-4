import {} from 'react'

export default function Login() {
  return (
    <main className='bg-white w-full min-h-screen flex'>
      <div className='w-[50%] flex justify-center items-center flex-col'>
        <div className='w-[60%] mb-20'>
          <div className='border-b-2 border-b-primary-color w-[80%] m-auto text-center mb-10'>
            <h1 className='text-6xl pb-4 text-primary-color'>Log In</h1>
          </div>
          <form action="">
            <div className='flex flex-col mt-4'>
              <label htmlFor="email" className='text-2xl mb-2 text-primary-color font-medium'>
                Email
              </label>
              <input type="text" placeholder='Digite seu email' id='email' className='shadow-md outline-none p-3' />
            </div>
            <div className='flex flex-col mt-8'>
              <label htmlFor="senha" className='text-2xl mb-2 text-primary-color font-medium'>
                Senha
              </label>
              <input type="password" id='senha' placeholder='Digite seu email' className='shadow-md outline-none p-3' />
            </div>
            <div className='text-center'>
              <button className='mt-8 bg-secondary-color text-white p-3 rounded-full w-[50%] hover:bg-primary-color transition-all duration-300 text-lg font-medium'>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='w-[50%] bg-gray-400'>

      </div>
    </main>
  )
}
