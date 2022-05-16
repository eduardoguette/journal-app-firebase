import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes'
import iconAttachment from '../../assets/icons/attach.svg'
import { ButtonImportant } from './ButtonImportant'
import { DateNote } from './DateNote'
import { Tag } from './Tag'

export const Note = ({ id, title, date, body, url, done, important, steps, category, list, setViewJournal, viewJournal }) => {
  const dispatch = useDispatch()
  const { active } = useSelector((state) => state.notes)

  const [complete, setComplete] = useState(0) // cuenta los números de steps completados

  const handleNoteClick = (e) => {
    e.preventDefault(e)
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
    )
    setViewJournal(true)
    // dispatch(startNewNote());
  }
  useEffect(() => {
    setComplete(0)
    steps.forEach((step) => {
      if (step.done) setComplete((v) => v + 1) // va sumando los steps completados
    })
  }, [steps])

  return (
    <>
      <article className={`px-4 py-2 border-b cursor-pointer hover:bg-indigo-100 flex justify-between items-center ${id === active?.id && viewJournal && 'bg-indigo-50'}`}>
        <div className='w-full' onClick={handleNoteClick}>
          <div className='py-1 '>
            <p className={`${done && 'text-gray-500 line-through'}`}>{title === '' ? 'Nota sin titulo' : title}</p>
          </div>
          <footer className='flex flex-wrap items-center gap-1'>
            <DateNote date={date} />
            {url && (
              <>
                <span className='text-gray-500'>·</span>
                <div className='flex items-center text-xs'>
                  <img src={iconAttachment} alt='Icon attachment' className='w-4 h-4' />
                  Attached files
                </div>
              </>
            )}
            <span className='text-gray-500'>·</span>
            {<Tag list={list} />}
            {steps?.length > 0 && (
              <>
                <span className='text-gray-500'>·</span>
                <div className='text-xs'>
                  <span>{complete}</span> of <span>{steps.length}</span>
                </div>
              </>
            )}
          </footer>
        </div>
        <ButtonImportant note={{id, title, date, body, url, done, important, steps, category, list}} />
      </article>
    </>
  )
}
