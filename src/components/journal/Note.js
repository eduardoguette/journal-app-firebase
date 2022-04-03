import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import iconAttachment from '../../assets/icons/attach.svg';
import { mymoment } from '../../helpers/mymoment';
import { Tag } from './Tag';

export const Note = React.memo(({ id, title, date, body, url, done, important, steps, category, setViewJournal, viewJournal }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const [complete, setComplete] = useState(0);

  const handleNoteClick = (e) => {
    e.preventDefault(e);
    dispatch(
      activeNote(id, {
        id,
        title,
        body,
        date,
        url,
        done,
        important,
        steps,
        category,
      })
    );
    setViewJournal(true);
    // dispatch(startNewNote());
  };
  useEffect(() => {
    setComplete(0);
    steps.forEach((step) => {
      if (step.done) setComplete((v) => v + 1);
    });
  }, [steps]);

  return (
    <>
      <article onClick={handleNoteClick} className={`px-4 py-2 border-b cursor-pointer hover:bg-indigo-100 ${id === active?.id && viewJournal && 'bg-indigo-50'}`}>
        <div className='py-1 '>
          <p className={`${done && 'text-gray-500 line-through'}`}>{title === '' ? 'Nota sin titulo' : title}</p>
        </div>
        <footer className='flex flex-wrap items-center gap-1'>
          <div className='flex items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' className='block w-4 h-4 aspect-square' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            <span className='text-xs font-light'> {mymoment(date)}</span>
          </div>
          {url && (
            <>
              {'·'}
              <div className='flex items-center text-xs font-light'>
                <img src={iconAttachment} alt='Icon attachment' className='w-4 h-4' />
                Attached files
              </div> 
            </>
          )}
          {'·'}
          <Tag />
          {steps?.length > 0 && (
            <>
              {'·'}
              <div className='text-xs font-light'>
                <span>{complete}</span> of <span>{steps.length}</span>
              </div>
            </>
          )}
        </footer>
      </article>
    </>
  );
});
