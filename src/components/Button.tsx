import {} from 'react'

export default function ConfirmButton({text, exclude}: {text: string, exclude?: boolean}) {
  return (
    <button className={`bg-secondary-color w-[35%] m-auto p-3 text-lg text-white rounded-full hover:bg-opacity-70 transition-all duration-200 mt-10 ${exclude ? 'bg-exclude' : 'bg-secondary-color'}`}>
      {text}
    </button>
  )
}
