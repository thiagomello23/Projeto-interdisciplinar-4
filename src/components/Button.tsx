import {} from 'react'

export default function Button({text, exclude}: {text: string, exclude?: boolean}) {
  return (
    <button className={`bg-secondary-color p-3 w-full text-lg text-white rounded-full hover:bg-primary-color transition-all duration-200 mt-10 ${exclude ? 'bg-exclude' : 'bg-secondary-color'}`}>
      {text}
    </button>
  )
}