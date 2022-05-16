import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { mymoment } from '../../helpers/mymoment'
import { Loader } from '../ui/Loader'
import { Note } from './Note'

export const ListNotes = ({ setViewJournal, viewJournal, notes }) => {
  const { loading } = useSelector((state) => state.ui)
  const { pathname } = useLocation()

  if (loading) return <Loader />

  if (pathname.includes('my-day')) {
    return (
      <div>
        {notes
          .sort((a, b) => a.date - b.date)
          .filter((note) => mymoment(note.date) === mymoment(Date.now()))
          .map((note) => (
            <Note viewJournal={viewJournal} key={note.id} {...note} setViewJournal={setViewJournal} />
          ))}
      </div>
    )
  }
  if (pathname.includes('important')) {
    return (
      <div>
        {notes
          .sort((a, b) => a.date - b.date)
          .filter((note) => mymoment(note.date) === mymoment(Date.now()))
          .filter((note) => note.important)
          .map((note) => (
            <Note viewJournal={viewJournal} key={note.id} {...note} setViewJournal={setViewJournal} />
          ))}
      </div>
    )
  }

  return (
    <div>
      {pathname.includes('tasks')
        ? notes.sort((a, b) => a.date - b.date).map((note) => <Note viewJournal={viewJournal} key={note.id} {...note} setViewJournal={setViewJournal} />)
        : notes
            .sort((a, b) => a.date - b.date)
            .filter((note) => note.list === pathname.replace('/', ''))
            .map((note) => <Note viewJournal={viewJournal} key={note.id} {...note} setViewJournal={setViewJournal} />)}
    </div>
  )
}
