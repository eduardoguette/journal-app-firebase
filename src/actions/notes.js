import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { debounce } from '../helpers/debounce';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

//react-journal

export const startNewNote = (title) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: title,
      body: '',
      date: new Date().getTime(),
      url: null,
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    Swal.fire('Saved', 'Saved succesfull!');
    dispatch(activeNote(doc.id, newNote));
    dispatch(pushNote({ ...newNote, id: doc.id }));
  };
};

export const updateNote = () => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;
    const updatedNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
  };
};

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note,
    },
  };
};
export const disabledNote = () => {
  return {
    type: types.notesDisabled,
  };
};

export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const noteToFireStore = { ...note };
    console.log('SI');
    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);
      dispatch(refreshNote(note.id, noteToFireStore));
      Swal.fire('Success', note.title, 'success');
    } catch (error) {
      Swal.fire('Error', note.title, 'error');
    }
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
    dispatch(finishLoading());
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};
export const pushNote = (note) => {
  return {
    type: types.notesPush,
    payload: {
      ...note,
    },
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNotes(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};
export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});


export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})