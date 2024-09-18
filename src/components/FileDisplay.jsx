import React from 'react'

export default function FileDisplay(props) {
    const {handleAudioReset,file,audioStream,handleFormSubmission}=props
  return (
    <main className='pb-40 flex-1 text-center p-4 flex flex-col gap-3 
    sm:gap-4  justify-center sm:w-96 w-72 max-w-full mx-auto'>

<h1 className='
       font-semibold text-4xl sm:text-5xl md:text-6xl '>
        Your<span className='text-slate-500 bold'>File</span>
       </h1>

<div className='my-4 mx-auto flex flex-col text-left'>
    <h3 className='font-semibold'>Name:</h3>
    <p>{file ? file?.name :'Custom audio'}</p>
</div>
<div className='items-center flex justify-between gap-4'>
    <button onClick={handleAudioReset} className='text-slate-500 hover:text-slate-800 duration-200
    '>Reset</button>
    <button onClick={handleFormSubmission} className='specialButton p-3 rounded-lg bold
     text-slate-800  border-2
      border-slate-900 flex items-center gap-2'>
        <p>Transcribe</p>
<i className="fa-solid fa-pen"></i>
    </button>

</div>

        </main>
  )
}
