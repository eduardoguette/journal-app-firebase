import { useSelector } from 'react-redux';
import { Loader } from '../ui/Loader';
import { Note } from './Note';


export const ListNotes = ({ setViewJournal, viewJournal }) => {
  const { notes } = useSelector((state) => state.notes);
  const { loading } = useSelector((state) => state.ui);

  if (loading) return <Loader />;
  return (
    <div>
      {notes
        .sort((a, b) => a.date - b.date)
        .map((note) => (
          <Note viewJournal={viewJournal} key={note.id} {...note} setViewJournal={setViewJournal} />
        ))}
    </div>
  );
};
