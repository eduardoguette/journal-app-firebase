import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { deleteList } from '../../actions/list'
import { FormNewNameList } from './FormNewNameList'

export const ElementYourList = ({ item }) => {
  const [viewBtnEditList, setViewBtnEditList] = useState(false)
  const [{ listProfile, id } = {}] = useSelector((state) => state.lists)
  const [showInput, setShowInput] = useState(false)
  const titleListEdited = useRef(item)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const handleShowInput = () => {
    setShowInput(!showInput)
  }
  const handleVideMenuEditList = () => {
    if (pathname.includes('my-day') || pathname.includes('important') || pathname.includes('tasks')) {
      return
    }
    setViewBtnEditList(!viewBtnEditList)
  }

  const handleRemoveList = () => {
    // setViewBtnEditList(!viewBtnEditList)
    const newLists = listProfile.filter((list) => list.id !== item.id)
    const itemId = item.id
    dispatch(deleteList(newLists, id, itemId ))
  }
  return (
    <>
      <li key={item.id} onDoubleClick={handleVideMenuEditList} className='flex justify-between transition-all ease-linear overflow-hidden'>
        {showInput ? (
          <>
            <FormNewNameList item={item} titleListEdited={titleListEdited.current} setShowInput={setShowInput} setViewBtnEditList={setViewBtnEditList} />
            <div className=' inset-0 w-full h-full absolute' onClick={() => setViewBtnEditList((prev) => !prev)}></div>
          </>
        ) : (
          <Link to={item.path} className='flex items-center w-full gap-2 px-4 py-3 text-sm '>
            <img src={item.img} alt={item.alt} height={20} width={20} />
            {item.name}
          </Link>
        )}
        <AnimatePresence>
          {viewBtnEditList && !showInput && (
            <>
              <motion.div
                className='flex rounded-md bg-gray-100 relative z-10'
                initial={{ translateX: '100%' }}
                animate={{ translateX: 0 }}
                exit={{ translateX: '100%' }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={handleShowInput} className='text-xs text-gray-500 text-left px-2'>
                  Edit
                </button>
                <button onClick={handleRemoveList} className='text-xs text-gray-500 text-left px-2'>
                  Remove
                </button>
              </motion.div>
              <div className=' inset-0 w-full h-full absolute' onClick={() => setViewBtnEditList((prev) => !prev)}></div>
            </>
          )}
        </AnimatePresence>
      </li>
    </>
  )
}
