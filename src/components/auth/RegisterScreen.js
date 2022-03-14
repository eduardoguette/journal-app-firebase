import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
  const [formValues, handleInputChange, reset] = useForm({
    name: 'Eduardo',
    email: 'eduard111111o@gmail.com',
    password: '123456',
    password2: '123456',
  })
  const { name, email, password, password2 } = formValues

  const { msgError } = useSelector((state) => state.ui)

   
  const dispatch = useDispatch()
  const handleRegister = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name))
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'))
      return false
    }
    dispatch(removeError())
    return true
  }

  return (
    <article className='p-5 w-[min(400px,100%)] bg-white'>
      <h1 className='text-2xl font-semibold'>
        Create new account <span>🚀</span>
        <span className='h-2 text-5xl text-indigo-500'>.</span>
      </h1>
      <div>
        <p className='my-3 text-sm text-gray-800'>Create account to start using JournalApp</p>
      </div>

      <form onSubmit={handleRegister} className='flex flex-col gap-2 mt-8' autoComplete='off'>
        <label className='text-sm font-semibold' htmlFor='name'>
          Name
        </label>
        <input
          onChange={handleInputChange}
          value={name}
          className='px-5 py-3 text-sm border rounded-full focus:outline-indigo-500'
          type='text'
          autoComplete='off'
          placeholder='Name'
          id='name'
          name='name'
        />
        <label className='mt-2 text-sm font-semibold' htmlFor='email'>
          Email
        </label>
        <input
          onChange={handleInputChange}
          value={email}
          className='px-5 py-3 text-sm border rounded-full focus:outline-indigo-500'
          type='text'
          autoComplete='off'
          placeholder='Email'
          id='email'
          name='email'
        />
        <label className='mt-2 text-sm font-semibold' htmlFor='password'>
          Password
        </label>
        <input
          onChange={handleInputChange}
          value={password}
          className='px-5 py-3 text-sm border rounded-full focus:outline-indigo-500'
          type='password'
          id='password'
          placeholder='Password'
          name='password'
          autoComplete='off'
        />
        <label className='mt-2 text-sm font-semibold' htmlFor='password2'>
          Confirm password
        </label>
        <input
          onChange={handleInputChange}
          value={password2}
          className='px-5 py-3 text-sm border rounded-full focus:outline-indigo-500'
          type='password'
          id='password2'
          placeholder='Confirm password'
          name='password2'
          autoComplete='off'
        />
        <button className='px-5 py-3 mt-2 font-semibold text-white bg-indigo-500 rounded-full focus:outline-indigo-300 hover:bg-indigo-600' type='submit'>
          Register
        </button>
        {msgError && (
          <div className='flex items-center gap-2 px-2 py-2 mt-4 text-sm font-light text-red-500 border border-red-500 rounded bg-red-50'>
            {' '}
            <p>{msgError}</p>
          </div>
        )}
        <p className='text-sm text-center text-gray-500 mt-7'>
          Already a Member?{' '}
          <Link to='/aut/login' className='font-semibold text-indigo-500'>
            Log In
          </Link>
        </p>
      </form>
    </article>
  )
}
