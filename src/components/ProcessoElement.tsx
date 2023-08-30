import { useStore } from "../store"

export default function ProcessoElement({name, value}: {name: string, value: string|number}) {
  const setModal = useStore(store => store.setModal)
  const setModalData = useStore(store => store.setModalData)
  
  return (
    <div className='w-full bg-white flex justify-between cursor-pointer' onClick={() => {
      setModal(true)
      setModalData({processo: name, valor: value})
    }}>
      <h1 className='p-3 text-xl font-medium'>{name}</h1>
      <div className='bg-secondary-color flex justify-center items-center p-3 w-[18%] text-white text-xl font-extrabold'>
        {value}
      </div>
    </div>
  )
}
