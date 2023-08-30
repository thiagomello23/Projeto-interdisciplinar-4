import {} from 'react'
import FormElement from '../../components/FormElement'
import Button from '../../components/Button'
import Search from '../../components/Search'
import TableElement from '../../components/TableElement'

export default function Admin() {
  return (
    <main>
      <form action="" className='w-[60%] m-auto mt-12 mb-20'>
        <h1 className='text-4xl text-primary-color font-bold mb-5'>
          CADASTRAR USUÁRIO
        </h1>
        <div className='flex flex-col gap-5'>
          <FormElement label='Nome' placeholder='Digite o nome da conta' />
          <FormElement label='Email' placeholder='Digite o email da conta' />
          <FormElement label='Telefone' placeholder='Digite o telefone da conta' />
          <FormElement label='Senha' placeholder='Digite a senha da conta' />
        </div>
        <div className='text-center'><Button text='Cadastrar' /></div>
      </form>
      <div className='p-16 pb-32 bg-primary-color'>
        <div className='w-[450px]'>
          <Search />
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
            <TableElement data={['nome', "email", "senha"]} />
            <TableElement data={['nome', "email", "senha"]} />
            <TableElement data={['nome', "email", "senha"]} />
          </tbody>
        </table>
      </div>
    </main>
  )
}
