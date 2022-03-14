
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../actions/notes';
import { Loader } from '../ui/Loader';
import { Note } from './Note'; 

export const ListNotes = ({setViewJournal}) => {
  const { notes } = useSelector((state) => state.notes);
  const { loading } = useSelector((state) => state.ui);



  if (loading) return <Loader />;
  return (
    <div>
      {notes.sort((a,b) => a.date - b.date).map((note) => (
        <Note key={note.id} {...note} setViewJournal={setViewJournal}/>
      ))}
    </div>
  );
};
