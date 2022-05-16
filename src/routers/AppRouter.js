import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { Loader } from '../components/ui/Loader'
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

/**
 * It checks if the user is logged in, and if so, it renders the JournalScreen component. If not, it
 * renders the AuthRouter component
 */
export const AppRouter = () => {
  const dispatch = useDispatch()

  
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return <Loader />
  }

  return (
    <Router>
      <Toaster />
      <Switch>
        <PublicRoute isAuthenticated={isLoggedIn} path='/auth' component={AuthRouter} />
        <PrivateRoute isAuthenticated={isLoggedIn} exact path='/' component={JournalScreen} />
        <PrivateRoute isAuthenticated={isLoggedIn} exact path='/:id' component={JournalScreen} />
        <Redirect to='/auth/login' />
      </Switch>
    </Router>
  )
}
