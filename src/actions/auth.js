import toast from 'react-hot-toast';
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from '../types/types'
import { noteLogout } from './notes'
import { finishLoading, startLoading } from './ui'


export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading())
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        dispatch(finishLoading())
        toast.error(err.message) 
      })
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        toast.error(err.message) 
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
})

export const startLogOut = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
    dispatch(logout())
    dispatch(noteLogout())
  }
}
export const logout = () => ({
  type: types.logout,
})
