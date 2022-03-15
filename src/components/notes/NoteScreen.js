import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting, startSaveNotes, startUploading } from '../../actions/notes';
import { mymoment } from '../../helpers/mymoment';
import { useForm } from '../../hooks/useForm';
import { VisorImage } from '../ui/VisorImage';
import { HeaderNoteScreen } from './HeaderNoteScreen';

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        className='absolute right-0 z-20 min-h-screen grid grid-rows-[auto,1fr] bg-gray-100 lg:relative w-[300px] md:w-[500px] lg:w-[700px] pb-5'
        initial={{ translateX: '100%' }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ translateX: '100%' }}
      >
        <HeaderNoteScreen {...{ handleDelete, setViewJournal, handleUpdateNote }} />
        <div className=''>
          <form className='flex flex-col w-full' onSubmit={handleSubmit}>
            <div className='w-11/12 px-3 py-2 mx-auto mt-2 bg-white rounded'>
              <label className='flex items-center w-full gap-2 '>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-cloud-upload'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1'></path>
                    <polyline points='9 15 12 12 15 15'></polyline>
                    <line x1='12' y1='12' x2='12' y2='21'></line>
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
      </motion.aside>
      <AnimatePresence>{viewImage && <VisorImage imgAmpliar={note.url} setViewImage={setViewImage} />}</AnimatePresence>
    </>
  );
};
