import React from 'react';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

export const NewJournal = () => {
  const [formValues, handleInputChange, reset] = useForm({
    note: '',
  });
  
  const { note } = formValues;

  const dispatch = useDispatch();

  const handleAddNew = (e) => {
    e.preventDefault();
    dispatch(startNewNote(note));
    reset()
  };

  return (
    <div className='px-4 py-4 bg-gray-100 rounded-sm shadow'>
      <form onSubmit={handleAddNew}>
        <label htmlFor='journal'>
          <input 
            className='w-full px-4 py-2 text-sm font-light border-b focus:outline-none border-b-indigo-500 focus:border-b-indigo-700' 
            placeholder='Nueva tarea' 
            name="note"
            value={note} 
            onChange={handleInputChange} 
          />
        </label>
        <div className='mt-2'>
          <button type='submit' className='block px-4 py-2 ml-auto text-sm font-semibold'>
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};
