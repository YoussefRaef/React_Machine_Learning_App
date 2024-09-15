import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information() {
  const [tab, setTab] = useState('transcription')

  return (
    <main className='pb-40 flex-1 text-center p-4 flex flex-col gap-3 
    sm:gap-4 justify-center max-w-prose w-full mx-auto'>

      <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>
        Your<span className='text-slate-500 bold whitespace-nowrap'>
          {" "} Transcription</span>
      </h1> 

      <div className='grid grid-cols-2 items-center mx-auto rounded-lg border-slate-900 border-1 bg-white
       text-slate-800'>

        <button 
          className={`hover:text-slate-400 ${tab === 'transcription' ? 'bg-slate-600 text-white' : ''}`}
          onClick={() => setTab('transcription')}
        >
          Transcription
        </button>

        <button 
          className={`hover:text-slate-400 ${tab === 'translation' ? 'bg-slate-600 text-white' : ''}`}
          onClick={() => setTab('translation')}
        >
          Translation
        </button>

      </div>
    {tab==='transcription'?<Transcription/>:<Translation/>}

    </main>
  )
}
