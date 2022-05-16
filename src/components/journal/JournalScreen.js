import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import svgHamburger from '../../assets/icons/hamburger.svg'
import { NoteScreen } from '../notes/NoteScreen'
import { UserMenu } from '../ui/UserMenu'
import { Date } from './Date'
import { ListName } from './ListName'
import { ListNotes } from './ListNotes'
import { NewJournal } from './NewJournal'
import { SideBar } from './SideBar'

export const JournalScreen = () => {
  const { notes } = useSelector((state) => state.notes)
  const [viewSideBar, setViewSideBar] = useState(false)
  const { loading } = useSelector((state) => state.ui)
  const [viewJournal, setViewJournal] = useState(false)

  const { pathname } = useLocation()

  const showListSideBar = (e) => {
    e.preventDefault()
    setViewSideBar(!viewSideBar)
  }

  return (
    <>
      <motion.div className='flex items-start min-h-screen bg-gray-white'>
        {viewSideBar && <SideBar {...{ setViewSideBar, viewSideBar }} />}
        <main className='w-full p-5'>
          <div className='flex items-center justify-between '>
            <div className='flex items-center gap-3'>
              {!viewSideBar && !loading && (
                <button onClick={showListSideBar}>
                  <img src={svgHamburger} className='w-5 h-5 pointer-events-none' alt='Icono menu hamburguesa' />
                </button>
              )}
              <ListName />
            </div>
            <UserMenu />
          </div>
          {notes.filter((note) => note.list === pathname).length > 0}
          <>
            <Date />
            <div className='grid gap-2 mt-4'>
              <NewJournal />
              <ListNotes notes={notes} viewJournal={viewJournal} setViewJournal={setViewJournal} />
            </div>
          </>
        </main>
        <AnimatePresence>{viewJournal && <NoteScreen layout setViewJournal={setViewJournal} />}</AnimatePresence>
      </motion.div>
    </>
  )
}
