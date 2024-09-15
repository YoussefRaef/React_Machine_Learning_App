import React from 'react';

export default function Transcribing(props) {
   const { downloading } = props;

   return (
      <div className='flex text-center items-center flex-col justify-center
       gap-10 md:gap-14 py-28
       ]/ p-4'>
         <div className='flex flex-col gap-2 sm:gap-4'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>
               <span className='text-slate-500 bold'>Transcribing</span>
            </h1>
            <p className='mx-auto'>{!downloading ? 'Warming up cylinders' : 'Core cylinders engaged'}</p>
         </div>

         <div className='flex flex-col gap-2 sm:gap-4
          max-w-[400px] mx-auto w-full'>
            {[0, 1, 2].map(val => (
               <div
                  key={val}
                  className={`rounded-full h-2 sm:h-3
                     bg-slate-400 loading loading${val}`}
               ></div>
            ))}
         </div>
      </div>
   );
}
