import {} from 'react'

export default function Search({state, setState}: {state: string, setState: (s: string) => void}) {

  return (
    <div className='w-full flex relative'>
      <input type="text" placeholder='Buscar por nome' 
        className='outline-none w-full rounded-full p-3 px-4 shadow-md'
        value={state}
        onChange={(e) => {
          setState(e.target.value)
        }}
      />
      <div className='cursor-pointer p-3 absolute right-0 block bg-secondary-color text-white rounded-tr-full rounded-br-full z-10'>
        lupa
      </div>
    </div>
  )
}
