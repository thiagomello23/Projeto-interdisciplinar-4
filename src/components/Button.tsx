import React, {} from 'react'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {text: string, exclude?: boolean},
) {
  return (
    <button type='submit' className={`bg-secondary-color p-3 w-full text-lg text-white rounded-full hover:bg-primary-color transition-all duration-200 mt-10 ${props.exclude ? 'bg-exclude' : 'bg-secondary-color'}`} {...props}>
      {props.text}
    </button>
  )
}