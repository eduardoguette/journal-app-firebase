import { types } from '../types/types';

/* 
  {
    notes:[],
    active:null,
    active: {
            title: title,
      body: '',
      date: new Date().getTime(),
      url: null,
      steps:[],
      important: false, 
      category: [],  
      done: false
    }
  }

*/
const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:  
      return {
        ...state,
        active: {
          ...action.payload, 
        },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesDisabled:

      return {
        ...state,
        active: null,
      };
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload.note : note)),
      };
    case types.notesPush:
 
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:

      return {
        ...state,
        active: null,
        notes: [],
      };
    default:
      return state;
  }
};
