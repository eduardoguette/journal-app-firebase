import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { startNewNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import home from '././../../assets/icons/home.svg';

export const NewJournal = () => {
  const [formValues, handleInputChange, reset] = useForm({
    title: '',
  });

  const { title } = formValues;
  const { pathname } = useLocation();
  const [list, setList] = useState(pathname.replaceAll("/",""));
  const isImportant = pathname === '/important' ? true : false;
  useEffect(() => {
    // const [list] = identifyList(pathname, lists);
    if (!isImportant) setList(list);
  }, [pathname, isImportant, list]);

  const dispatch = useDispatch();

  const handleAddNew = (e) => {
    e.preventDefault();
    if (isImportant) {
      setList({
        id: 3,
        name: 'Tasks',
        img: home,
        path: '/tasks',
        altImage: 'Icono de tareas',
      });
    } 
    dispatch(startNewNote({ title, list, important: isImportant }));
    reset();
  };

  return (
    <div className='px-4 py-4 bg-gray-100 rounded-sm shadow'>
      <form onSubmit={handleAddNew}>
        <label htmlFor='journal'>
          <input
            className='w-full px-4 py-2 text-sm border-b focus:outline-none border-b-indigo-500 focus:border-b-indigo-700'
            placeholder='Add a task'
            name='title'
            value={title}
            onChange={handleInputChange}
          />
        </label>
        <div className='mt-2'>
          <button type='submit' className='block px-4 py-2 ml-auto text-sm font-semibold'>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
