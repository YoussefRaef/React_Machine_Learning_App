import React from 'react'

export default function Translation(props) {
const {textElement,toLanguage,setToLanmguage,
  translating,generateTranslation}=props

  return (
    <div className='flex flex-col gap-2 max-w-[400px] mx-auto w-full'>
   {!translating && (<div className='flex flex-col'>
    <p className='text-xs sm:text-sm font-medium txet-slate-800 mr-auto '>To language</p>
   
      
      <div className='flex items-stretch gap-2'>
        <select className='flex-1 border-transparent border-2
         hover:border-slate-800 duration-200 p-2' value={toLanguage} onChange={(e)=>
          setToLanmguage(e.target.value)
        } >
          <option value={'Select Language'}>Select Lnaguage
          </option>
        {Object.entries(LANGUAGES).map(([key,value])=>
        {
          <option key={key} value={value}>{key}</option>
        })}
        </select>
        <button onClick={generateTranslation} className='specialButton px-3 py-2 rounded-lg text-slate-800
        hover:text-slate-400 '></button>
      </div>

          </div>

)}
{(textElement&& !translating)&&(
  <p>{textElement}</p>
)}

{translating&&(
  <div className='grid place-items-center'>
<i className="fa-solid fa-spinner animate-spin"></i>
  </div>
)}

    </div>
  )
}
