import React from 'react'

export default function TailInput({type, name, ref}) {
  return (
    <div className='w-full'>
        <input type={type} name={name}  
                ref={ref}
                className='bg-gray-50 border border-[#003675] text-gray-900 text-sm rounded-lg focus:ring-[#003675] focus:border-[#003675] block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
    </div>
  )
}
