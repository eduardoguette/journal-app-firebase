import React from 'react';
import { mymoment } from '../../helpers/mymoment';

export const DateNote = ({ date }) => {
  return (
    <div className='flex items-center gap-1 text-gray-500'>
      <svg xmlns='http://www.w3.org/2000/svg' className='block w-4 h-4 aspect-square' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
      <span className='text-xs '> {mymoment(date)}</span>
    </div>
  );
};
