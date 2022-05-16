import React from 'react'
import { useForm } from '../../hooks/useForm'

export const FormNewNameList = ({ titleListEdited, setShowInput, setViewBtnEditList }) => {
  const [formValues, handleInputChange] = useForm({
    titleList: titleListEdited.name,
  })
  const { titleList } = formValues

  const sendNewNameList = (e) => {
    e.preventDefault() 
    setShowInput(prev => !prev)
    setViewBtnEditList(prev => !prev)
    console.log("SAVED NAME LIST")
  }
  return (
    <form onSubmit={sendNewNameList} className='flex relative z-10 justify-between items-center w-full pl-4'>
      <input
        value={titleList}
        onChange={handleInputChange}
        name='titleList'
        placeholder='Nuevo nombre de la lista'
        required
        className='text-xs px-4 py-3 w-11/12 bg-transparent focus:outline-none focus:bg-gray-50'
      />
      <button type='submit' className='text-xs px-2 py-2 text-gray-600 absolute right-6 top-0 bottom-0 my-auto'>
        Save
      </button>
    </form>
  )
}
