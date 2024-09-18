import React, { useEffect, useRef, useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
  const{output}=props
  const [tab, setTab] = useState('transcription')

  const [translation,setTtranslation]=useState(null)
  const [translating,setTtranslating]=useState(null)
  const [toLanguage,setToLanguage]=useState('Select Language')

  const worker=useRef()
  useEffect(()=>{
    if(!worker.current){
      worker.current=new Worker (new URL('../translate.worker.js',
        import.meta.url),{
          type:'module'
        }
      )
    }

    const onMessageRecieved = async (e)=>{
      switch(e.data.status){
        case'initiate':
        console.log('DOWNLOADING')
        break;
        case'progress':
        console.log('LOADING')
        break;
        case'update':
        setTtranslation(e.data.output)
        break;
        case'complete':
        setTtranslating(false)
        console.log('DONE')
        break;
      }
    }
    worker.current.addEventListener('message',onMessageRecieved)
    return()=>worker.current.removeEventListener('message',onMessageRecieved)
  })

  
const textElement=tab==='transcription'?output.map(val=>val.text):translation||
'no translation'
  

  function handleCopy(){
navigator.clipboard.writeText(textElement)
  }
  function handleDownload(){
    const element=document.createElement('a')
    const file=new Blob([textElement],{type:'text/plain'})
    element.href=URL.createObjectURL(file)
    element.download=`Freescribe_${new Date().toString()}.txt`
   document.body.appendChild(element)
   element.click()
  }
function generateTranslation(){
  if(translating || toLanguage ==='Select Language' ){
    return
  }

  setTtranslating(true)
worker.current.postMessage({
  text: output.map(val=>val.text),
  src_lang:'eng_Latn',
  tgt_lang:toLanguage
})
}

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
      <div className='my-8 flex flex-col'>

    {tab==='transcription'?(<Transcription {...props} textElement={textElement}/>)
    :<Translation {...props} toLanguage={toLanguage} translating={translating}
    textElement={textElement} setTtranslation={setTtranslation} 
   setTtranslating ={setTtranslating} setToLanguage={setToLanguage}
   generateTranslation={generateTranslation} />}
      </div>
    <div onClick={handleCopy} title='copy'className='flex items-center duration-200 gap-4 mx-auto text-base'>
<button className='specialButton px-4 text-slate-800 hover:text-slate-400'>
<i className="fa-solid fa-copy"></i>
</button>
<button onClick={handleDownload} title='download' className='specialButton duration-200 px-4 text-slate-800 hover:text-slate-400'>
<i className="fa-solid fa-download"></i>
</button>
    </div>
    </main>
  )
}
