import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { NewJournal } from './NewJournal';
import { SideBar } from './SideBar';
import svgHamburger from '../../assets/icons/hamburger.svg';
import { NoteScreen } from '../notes/NoteScreen';
import { ListNotes } from './ListNotes';
import { Date } from './Date';

export const JournalScreen = () => {
  const [viewSideBar, setViewSideBar] = useState(false);
  const [viewJournal, setViewJournal] = useState(false);

  const { active } = useSelector((state) => state.notes);

  return (
    <>
      <motion.div className='flex items-start'>
        {viewSideBar && <SideBar setViewSideBar={setViewSideBar} />}
        <main className='w-full p-5'>
          <div className='flex items-center gap-2'>
            {!viewSideBar && (
              <button onClick={() => setViewSideBar(!viewSideBar)}>
                <img className='pointer-events-none' src={svgHamburger} height={24} width={24} alt='Icono menu hamburguesa' />
              </button>
            )}
            <h1 className='text-2xl'>Mi día</h1>
          </div>
          <Date />
          <div className='grid gap-2 mt-4'>
            <NewJournal />
            <ListNotes setViewJournal={setViewJournal} />
          </div>
        </main>
        <AnimatePresence>{(viewJournal) && <NoteScreen layout setViewJournal={setViewJournal} />}</AnimatePresence>
      </motion.div>
    </>
  );
};
