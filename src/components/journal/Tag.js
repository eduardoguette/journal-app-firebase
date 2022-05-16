import React from 'react'

export const Tag = ({ list }) => { 
  return <div className='flex items-center gap-2'>{<span className='text-xs text-gray-500 rounded-md '>{list}</span>}</div>
}
