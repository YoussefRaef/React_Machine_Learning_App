import React from 'react'

export default function Header() {
  return (
    <header className='p-4 flex items-center justify-between
    gap-4'>

     <a href ="/"><h1 className='font-medium'>Free
        <span className='text-slate-500 bold'>Scribe</span></h1>
        </a>
   <a href ="/" className='specialButton gap-2 flex items-center 
   rounded-lg  text-slate-800 px-3 py-2
    border-slate-700 text-sm border-2'>
    <p >New</p>
   <i className="fa-solid fa-plus"></i>
   </a>
    </header>
  )
}
