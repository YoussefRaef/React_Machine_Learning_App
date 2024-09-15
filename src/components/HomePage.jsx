import React from 'react'
import { useState,useEffect,useRef } from 'react'

export default function HomePage(props) {
    const {setAudioStream,setFile}=props

const[recordingStatus,setRecordingStatus]=useState('inactive')
const[audioChunks,setAudioChunks]=useState([])
const[duration,setDuration]=useState(0)

const mediaRecorder=useRef(null)

const mimeType='audio/webm'
 
async function startRecording() {
    let tempStream

    console.log('Start Recording')

    try{
    const streamData= await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:false
    })
    tempStream=streamData
    }
    catch(err){
     console.log(err.message)
     return
    }
    setRecordingStatus('recording')

    //create new media rcorder instance usingn the stream
    const media=new MediaRecorder(tempStream,{type:mimeType})
    mediaRecorder.current=media

    mediaRecorder.current.start()

    let localAudioChunks=[]
    mediaRecorder.current.ondataavailable=(event)=>{
        if(typeof event.data ==='undefined'){return}
        if(event.data.size === 0 ){return}
        localAudioChunks.push(event.data)
    }
    setAudioChunks(localAudioChunks)
}

async function stopRecording() {
    setRecordingStatus('inactive')
    console.log('stop recording')
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop=()=>{
        const audioBlob=new Blob(audioChunks,{type:mimeType})
        setAudioStream(audioBlob)
        setAudioChunks([])
        setDuration(0)
    }

}
    useEffect(()=>{
        if(recordingStatus==='inactive') {return}
        const interval = setInterval(() => {
            setDuration(curr=>curr +1)
        }, 1000);

        return()=>clearInterval(interval)
    })





  return (
    <main className='pb-40 flex-1 text-center p-4 flex flex-col gap-3 
    sm:gap-4  justify-center'>

       <h1 className='
       font-semibold text-5xl sm:text-6xl md:text-7xl '>
        Free<span className='text-slate-500 bold'>Scribe</span></h1>

        <h3 className='font-medium md:text-lg'>Record 
            <span className='text-slate-500'>&rarr;</span>
            Transccribe
            <span className='text-slate-500'>&rarr;</span>Translate
           
        </h3>

      <button onClick={recordingStatus==='recording'?stopRecording:startRecording} 
      className='specialButton flex items-center text-base justify-between gap-4
      mx-auto w-72 max-w-full border-2 my-4 text-slate-800 rounded-lg px-4 py-1.5 
     border-slate-700 '>
        <p className='bold'>{(recordingStatus==='inactive')?'Record':
        `Stop Recording`}</p>
        <div className='flex items-center gap-2 '>
        {duration!==0 && (
            <p className='text-sm '>{duration}seconds</p>
        )}
      <i className={`fa-solid duration-200 fa-microphone ${recordingStatus === 'recording' ? 'text-red-700' : ''}`}></i>

        </div>
      </button>

      <p className='text-base'>Or <label className='text-slate-500 cursor-pointer
     border-[1.5px] bg-slate-100 border-slate-900 rounded-md
     hover:text-slate-900 duration-200 '>Upload<input onChange={(e)=> {
        const tempFile =e.target.files[0]
        setFile(tempFile)
     }} className='hidden' type='file'
      accept='.mp3,.wave'></input></label> Mp3 file </p>
      <p className='Italic text-slate-400'>Free for use!</p>
      </main>
  )
}
