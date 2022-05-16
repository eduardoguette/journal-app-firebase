import React from 'react';

export const BtnNewStep = () => {
  return (
    <button type='button' className='flex items-center gap-2 mt-4 text-sm text-indigo-500'>
      <svg width='24' height='24' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M6 12H12M18 12H12M12 12V6M12 12V18' stroke='rgb(99, 102, 241)' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      Next step
    </button>
  );
};
