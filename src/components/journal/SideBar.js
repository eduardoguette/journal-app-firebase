import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '../../actions/list'
import hamburger from '../../assets/icons/hamburger.svg'
import iconList from '../../assets/icons/iconlist.svg'
import plus from '../../assets/icons/plus.svg'
import { useForm } from '../../hooks/useForm'
import { YourLists } from './YourLists'

export const SideBar = ({ setViewSideBar, viewSideBar }) => {
  const [newList, setNewList] = useState(false)

  const [{ listProfile, id } = {}] = useSelector((state) => state.lists)

  const dispatch = useDispatch()
  const [formValues, handleInputChange, reset] = useForm({
    new_list: '',
  })

  const { new_list } = formValues

  const handleInputNewList = () => {
    setNewList((v) => !v)
  }

  const handleAddNewList = (e) => {
    e.preventDefault()
    const newList = { name: new_list, path: `/${new_list}`, id: Date.now(), altImage: 'Icono list default', img: iconList }
    dispatch(addList(id, [...listProfile, newList], newList))
    setNewList((v) => !v)
    reset()
  }

  return (
    <>
      <div className='fixed top-0 z-10 w-full min-h-screen bg-gray-900 bg-opacity-50 md:hidden '></div>
      <motion.aside
        className='shadow-md pt-3 left-0 top-0 min-h-screen z-20 bg-gray-100 min-w-[200px] md:min-w-[250px]  absolute lg:relative'
        initial={{ translateX: '-100%' }}
        animate={{ translateX: '0%' }}
        transition={{ type: 'spring', duration: 0.4 }}
        exit={{ translateX: '0' }}
      >
        <header className='flex items-center justify-between p-5 '>
          <button onClick={() => setViewSideBar((prev) => !prev)}>{viewSideBar && <img src={hamburger} alt='Icono de luna' className='w-6 h-6 -ml-1' />}</button>
        </header>
        <nav className=''>
          <ul className='flex flex-col'>
            <YourLists listProfile={listProfile} />
          </ul>
          {!newList ? (
            <button onClick={handleInputNewList} className='flex items-center w-full px-4 py-3 text-sm text-indigo-500 transition-all ease-linear'>
              <img src={plus} alt='Icono sol' height={20} width={20} />
              <span className='px-2 text-indigo-500'>New list</span>
            </button>
          ) : (
            <form className='grid grid-cols-[auto,1fr]' onSubmit={handleAddNewList}>
              <button type='submit' className='flex items-center py-3 pl-4 text-sm text-gray-400 transition-all ease-linear'>
                <svg width='24' height='24' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M6 12H12M18 12H12M12 12V6M12 12V18' stroke='currentColor' className='text-gray-400' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
              <input name='new_list' value={new_list} onChange={handleInputChange} className='inline-flex w-full px-2 text-sm bg-transparent focus:outline-none' placeholder='Enter name a new list' />
            </form>
          )}
        </nav>
      </motion.aside>
    </>
  )
}
