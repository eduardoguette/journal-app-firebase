import { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

export const ListName = () => {
  const [lists] = useSelector((state) => state.lists)
  const [listSelected, setListSelected] = useState(null)
  const { pathname } = useLocation()
  let history = useHistory()

  useEffect(() => {
    if (pathname === '/') {
      setListSelected('My day')
      return
    }
    if (lists) {
      const { listProfile } = lists
      const elementList = listProfile.filter((item) => item.path === pathname) 
      if (elementList.length <= 0) {
        history.push('/my-day')
        return
      }
      const [{ name }] = elementList
      setListSelected(name)
    }
  }, [listSelected, lists, pathname])
  if (!lists) return <LoaderIcon />
  return <h1 className='text-2xl '>{listSelected}</h1>
}
