import close from '../../assets/icons/close.svg';
export const HeaderNoteScreen = ({ handleDelete, setViewJournal, handleUpdateNote }) => {
  return (
    <div className='flex items-center gap-3 p-5 pb-2'>
      <button title='Close note' onClick={() => setViewJournal((prev) => !prev)}>
        <img src={close} alt='Icon close' className='w-6 h-6' />
      </button>
      <button onClick={handleUpdateNote} title='Save note' className='p-2 bg-indigo-100 rounded-full hover:bg-indigo-200'>
        <svg className='w-4 h-4' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z'
            stroke='currentColor'
            strokeWidth='1.5'
          />
          <path d='M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z' stroke='currentColor' strokeWidth='1.5' />
          <path d='M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z' stroke='currentColor' strokeWidth='1.5' />
        </svg>
      </button>
      <button className='p-2 bg-indigo-100 rounded-full hover:bg-indigo-200' onClick={handleDelete} title='Delete note'>
        <svg className='w-4 h-4' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M10 17V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M14 17V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>
    </div>
  );
};
