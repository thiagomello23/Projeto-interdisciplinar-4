import { useState } from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Search from '../../components/Search'
import TableElement from '../../components/TableElement'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import useSWR from "swr"
import fetcher from '../../lib/axios'
import { api } from '../../lib/axios'
import ErrorMessage from '../../components/ErrorMessage'

export default function Admin() {

  const navigate = useNavigate()
  const { register, handleSubmit, control } = useForm()

  const [loader, setLoader] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchData, setSearchData] = useState([])

  // Valida o token de acesso e puxa os dados da tabela
  const { data, error, isLoading, mutate } = useSWR("/usuario/all", fetcher)

  if(error) {
    navigate('/login')
  }

  if(isLoading || !data) {
    return null;
  }

  const onSubmit = async (d: any) => {
    setLoader(true)

    // Validação minima de dados
    if(!d.nome || !d.email || !d.telefone || !d.senha)
    {
      setErrorMessage('Por favor preencha todos os campos antes de continuar!')
      setLoader(false)
      return;
    }

    // Envio para a API
    const { status } = await api.post('/usuario/createUser', {
      nome: d.nome,
      email: d.email,
      telefone: d.telefone,
      senha: d.senha
    })

    // Error handlers e loaders
    if(status >= 400) {
      setErrorMessage('Falha ao cadastrar o usuário, tente novamente!')
      setLoader(false)
      return;
    }

    // Atualizar os dados dos usuários cadastrados na tabela
    setLoader(false)
    mutate()
  }

  const onSearchSubmit = (d: any) => {
    setSearchData(
      data!.filter((item: any) => {
        if(item.nome.startsWith(d.search)) {
          return item;
        }
      })
    )
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <main className='relative'>
      {/* LOGOUT */}
      <div className='absolute top-0 right-24'>
        <button
          onClick={logout} 
          className='bg-exclude p-4 w-[150px] text-white outline-none cursor-pointer font-bold'
        >
          Logout  
        </button>  
      </div>
      <div className='w-[60%] m-auto mt-12 mb-20'>
        <h1 className='text-4xl text-primary-color font-bold mb-5'>
          CADASTRAR USUÁRIO
        </h1>
        {/* Cadastro Submit */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5'>
            <FormElement label='Nome' placeholder='Digite o nome da conta' metadata='nome' register={register} />
            <FormElement label='Email' placeholder='Digite o email da conta' metadata='email' register={register} />
            <FormElement label='Telefone' control={control} mask='(99) 99999-9999' placeholder='Digite o telefone da conta' metadata='telefone' register={register} />
            <FormElement label='Senha' type='password'  placeholder='Digite a senha da conta' metadata='senha' register={register} />
          </div>
          <div className='py-3'>
            <ErrorMessage error={errorMessage} />
          </div>
          <div className='text-center'><Button text='Cadastrar' loading={loader} /></div>
        </form>
      </div>
      <div className='p-16 pb-32 bg-primary-color'>
        <div className='w-[450px]'>
          {/* Search Submit */}
          <form action="" onSubmit={handleSubmit(onSearchSubmit)}>
            <button type='submit'>
              <Search metadata='search' register={register}/>
            </button>
          </form>
        </div>
        <table className='w-full mt-5'>
          <thead className='bg-secondary-color text-white'>
            <tr>
              <th className='p-4'>Nome</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {searchData.length !== 0 ? searchData.map((el: any) => (
              <TableElement data={[el.nome, el.email, el.telefone]} />
            )) : data.map((el: any) => (
              <TableElement data={[el.nome, el.email, el.telefone]} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}