import fav from '../assets/icons/fav.svg'
import home from '../assets/icons/home.svg'
import sun from '../assets/icons/sun.svg'
import { db } from '../firebase/firebase-config'
import { loadLists } from '../helpers/loadLists'
import { types } from '../types/types'
import { finishLoading, startLoading } from './ui'

const listProfile = [
  {
    id: 1,
    name: 'My day',
    img: sun,
    path: '/my-day',
    altImage: 'Icono de día',
  },
  {
    id: 2,
    name: 'Important',
    img: fav,
    path: '/important',
    altImage: 'Icono de favoritos',
  },
  {
    id: 3,
    name: 'Tasks',
    img: home,
    path: '/tasks',
    altImage: 'Icono de tareas',
  },
]
export const pushList = (listProfile, id) => ({
  type: types.listsPush,
  payload: [
    {
      listProfile,
      id,
    },
  ],
})

export const setLists = (list) => ({
  type: types.listsLoad,
  payload: list,
})

export const setDeleteList = (listProfile, idList, itemId) => ({
  type: types.listsDelete,
  payload: {
    listProfile,
    idList,
    itemId,
  },
})

export const deleteList = (listProfile, idList, itemId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    dispatch(startLoading())
    await db.doc(`${uid}/journal/lists/${idList}`).update({ listProfile })
    dispatch(setDeleteList(listProfile, idList, itemId))
    dispatch(finishLoading())
  }
}

export const initLists = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    dispatch(startLoading())
    await db.collection(`${uid}/journal/lists`).add({ listProfile })
    dispatch(setLists(listProfile))
    dispatch(finishLoading())
  }
}

export const addList = (id, listProfile, newList) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    await db.doc(`${uid}/journal/lists/${id}`).update({ listProfile })
    dispatch(startLoading())
    dispatch(pushList(listProfile, id, newList))
    dispatch(finishLoading())
  }
}
export const getLists = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const lists = await loadLists(uid)
    dispatch(setLists(lists))
  }
}

export const startLists = (uid) => {
  return async (dispatch) => {
    dispatch(startLoading())
    const notes = await loadLists(uid)
    console.log(notes)
    /*    dispatch(setNotes(notes));
      dispatch(finishLoading()); */
  }
}
