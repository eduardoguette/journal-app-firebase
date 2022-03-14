import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting, startSaveNotes, startUploading } from '../../actions/notes';
import { mymoment } from '../../helpers/mymoment';
import { useForm } from '../../hooks/useForm';
import { VisorImage } from '../ui/VisorImage';

export const NoteScreen = ({ setViewJournal }) => {
  const [viewImage, setViewImage] = useState(false);
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [formValues, handleInputChange, reset] = useForm({
    title: note?.title ?? '',
    date: note?.date ?? '',
    body: note?.body ?? '',
    url: note?.url ?? '',
  });

  const noteId = useRef(note?.id);

  const { title, date, body } = formValues;

  useEffect(() => {
    if (note?.id !== noteId.current) {
      reset(note);
      noteId.current = note?.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(note?.id, { ...formValues }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const handleDisabledNote = () => { 
    setViewJournal((prev) => !prev);
  };

  const handleUpdateNote = () => {
    dispatch(startSaveNotes({ id: note.id, ...formValues, date: Date.now() }));
  };

  const handleInputImage = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      dispatch(startUploading(file));
    }
  };

  const handleOpenImage = () => {
    setViewImage((prev) => !prev);
  };

  const handleDelete = () => {
    setViewJournal((prev) => !prev);
    dispatch(startDeleting(noteId.current));
  };
  return (
    <>
      <div onClick={handleDisabledNote} className='fixed z-10 w-full h-full bg-gray-900 bg-opacity-10 lg:hidden'></div>

      <motion.aside
        layout
        className='absolute right-0 z-20 h-screen grid grid-rows-[1fr,auto] bg-gray-100 lg:relative w-[300px] md:w-[500px] lg:w-[700px]'
        initial={{ translateX: '100%' }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ translateX: '100%' }}
      >
        <div className=''>
          <form className='flex flex-col w-full py-2'>
            <div className='w-11/12 px-3 py-2 mx-auto mt-5 bg-white rounded'>
              <label className='flex items-center w-11/12 gap-2 '>
                <div className='block w-5 h-5 border border-indigo-500 rounded-full aspect-square'></div>
                <input name='title' onChange={handleInputChange} className='w-full px-4 py-2 text-sm border border-transparent rounded-sm focus:outline-none focus:border-gray-800' value={title} />
              </label>
            </div>

            <label className='flex flex-col justify-center w-11/12 gap-2 px-4 py-4 mx-auto mt-5 bg-white border border-transparent rounded focus-within:border-indigo-500'>
              <textarea rows='15' name='body' placeholder='Add note' className='w-full text-sm font-light rounded-sm focus:outline-none ' onChange={handleInputChange} value={body}></textarea>
              <p className='block mt-2 text-xs font-light'>
                Last update: <span>{mymoment(date)}</span>
              </p>
            </label>

            <div className='flex flex-col w-11/12 gap-4 p-4 mx-auto mt-5 text-gray-600 bg-white rounded hover:text-black'>
              {note?.url && (
                <div className='flex items-center gap-2 text-xs font-light '>
                  <div className='grid w-12 h-12 text-white bg-indigo-500 rounded-sm place-items-center '>
                    <img src={note.url} alt={`Imagen de la nota ${note.url}`} onClick={handleOpenImage} />
                  </div>
                </div>
              )}
              <label className='flex flex-col justify-center gap-2 '>
                <div className='flex items-center gap-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' />
                  </svg>
                  <span className='w-full text-sm font-light cursor-pointer'>{!note?.url ? 'Add file' : 'Change file'}</span>
                </div>
                <input
                  onChange={handleInputImage}
                  name='image'
                  type='file'
                  className='hidden file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                />
              </label>
            </div>
          </form>
        </div>
        <div className='flex items-center justify-between gap-4 p-5'>
          <button title='Close note' onClick={() => setViewJournal((prev) => !prev)}>
            <svg width='24' height='24' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M2 18V6C2 4.34315 3.34315 3 5 3H7C8.65685 3 10 4.34315 10 6V18C10 19.6569 8.65685 21 7 21H5C3.34315 21 2 19.6569 2 18Z' stroke='currentColor' strokeWidth='1.5' />
              <path d='M16 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H16' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
              <path d='M10 12H18M18 12L15 9M18 12L15 15' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
          <button onClick={handleUpdateNote} title='Save note' className='ml-auto'>
            <svg width='24' height='24' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z'
                stroke='currentColor'
                strokeWidth='1.5'
              />
              <path d='M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z' stroke='currentColor' strokeWidth='1.5' />
              <path d='M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z' stroke='currentColor' strokeWidth='1.5' />
            </svg>
          </button>
          <button onClick={handleDelete} title='Delete note'>
            <svg width='24' height='24' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
              <path d='M10 17V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
              <path d='M14 17V11' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
              <path d='M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        </div>
      </motion.aside>
      <AnimatePresence>{viewImage && <VisorImage imgAmpliar={note.url} setViewImage={setViewImage} />}</AnimatePresence>
    </>
  );
};
