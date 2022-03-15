import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { NewJournal } from './NewJournal';
import { SideBar } from './SideBar';
import svgHamburger from '../../assets/icons/hamburger.svg';
import { NoteScreen } from '../notes/NoteScreen';
import { ListNotes } from './ListNotes';
import { Date } from './Date';
import { UserMenu } from '../ui/UserMenu';

export const JournalScreen = () => {
  const [viewSideBar, setViewSideBar] = useState(false);
  const [viewJournal, setViewJournal] = useState(false);

  return (
    <>
      <motion.div className='flex items-start'>
        {viewSideBar && <SideBar {...{ setViewSideBar, viewSideBar }} />}
        <main className='w-full p-5'>
          <div className='flex items-center justify-between '>
            <div className='flex items-center gap-3'>
              {!viewSideBar && (
                <button onClick={() => setViewSideBar(!viewSideBar)}>
                  <img src={svgHamburger} className='w-5 h-5 pointer-events-none' alt='Icono menu hamburguesa' />
                </button>
              )}
              <h1 className='text-2xl '>Mi día</h1>
            </div>
            <UserMenu />
          </div>
          <Date />
          <div className='grid gap-2 mt-4'>
            <NewJournal />
            <ListNotes setViewJournal={setViewJournal} />
          </div>
        </main>
        <AnimatePresence>{viewJournal && <NoteScreen layout setViewJournal={setViewJournal} />}</AnimatePresence>
      </motion.div>
    </>
  );
};
