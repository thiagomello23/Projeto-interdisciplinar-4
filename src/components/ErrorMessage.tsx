import React from 'react'

export default function ErrorMessage({error}: {error: string}) {
  return (
    <p className='text-sm text-red-500 text-center font-bold'>{error}</p>
  )
}
