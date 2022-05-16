import React from 'react';
import { useDispatch } from 'react-redux';
import { startSaveNotes } from '../../actions/notes';

export const ButtonImportant = ({note:{ id, title, date, body, url, done, important, steps, category, list } }) => {
  const dispatch = useDispatch();

  const handleUpdateImportantNote = (e) => {
    e.preventDefault(); 
    dispatch(startSaveNotes({ id, title, date, body, url, done, important: !important, steps, category, list }));
  };

  return (
    <button className='relative text-indigo-500 group' onClick={handleUpdateImportantNote}>
      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill={important ? 'currentColor' : 'none'} viewBox='0 0 24 24' stroke={!important ? 'currentColor' : 'none'} strokeWidth={1.5}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        />
      </svg>
      <div className='absolute hidden -right-1 -top-9 group-hover:block'>
        <span className='px-3 py-2 text-xs font-light bg-white border rounded shadow-2xl -top-4 -left-40 whitespace-nowrap'>Take away the importance.</span>
        <span className='absolute w-3 h-3 rotate-45 rounded-[1px] bg-white -bottom-2 right-2'></span>
      </div>
    </button>
  );
};
