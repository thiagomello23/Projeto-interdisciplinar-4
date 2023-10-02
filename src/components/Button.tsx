import React, {} from 'react'
import { Oval } from "react-loader-spinner"

export default function Button(
  {text, exclude, onSubmit, loading} 
  : {text: string, exclude?: boolean, onSubmit?: () => void, loading?: boolean},
) {
  
  return (
    <button type='submit' className={`p-3 w-full text-lg text-white rounded-full hover:bg-primary-color flex justify-center items-center transition-all duration-200 mt-10 ${exclude ? 'bg-exclude' : 'bg-secondary-color'}`} onSubmit={onSubmit}>
      {loading ? (
        <Oval 
          height={30}
          visible={true}
          color='black'
          secondaryColor='black'
          strokeWidth={5}
        />
      ) : text}
    </button>
  )
}