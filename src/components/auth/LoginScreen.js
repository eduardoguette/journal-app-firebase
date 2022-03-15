import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import validator from 'validator'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import iconGoogle from '../../assets/icons/google.svg'
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()

  const { email, password } = formValues
  const { msgError, loading } = useSelector((state) => state.ui)

  const handleLogin = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false
    } else if (password.length < 5) {
      dispatch(setError('Password should be at least 6 characters'))
      return false
    }
    dispatch(removeError())
    return true
  }

  const hadleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  return (
    <article className='p-5 w-[min(400px,100%)] bg-white'>
      <h1 className='text-2xl font-semibold'>Login ✌️</h1>

      <div className='flex flex-col gap-2'>
        <div className='mt-4 mb-2'>
          <p className='font-semibold'>Login with social networks</p>
        </div>
        <button className='flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold border border-gray-200 rounded hover:bg-gray-50' onClick={hadleGoogleLogin}>
          <img src={iconGoogle} alt='Icono de google' height={24} width={24} />
          Sign in with google
        </button>
      </div>
      <div className='flex items-center my-6'>
        <span className='w-full border'></span>
        <span className='px-4 text-xs text-gray-500 whitespace-nowrap w-max'>or Sign in with Email</span>
        <span className='w-full border'></span>
      </div>

      <form className='flex flex-col gap-2 mt-5' autoComplete='off' onSubmit={handleLogin}>
        <label className='text-sm font-semibold' htmlFor='email'>
          Email
        </label>
        <input
          className='px-5 py-3 text-sm border rounded focus:outline-indigo-500'
          type='text'
          autoComplete='off'
          placeholder='Email'
          id='email'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
        <label className='mt-2 text-sm font-semibold' htmlFor='password'>
          Password
        </label>
        <input
          className='px-5 py-3 text-sm border rounded focus:outline-indigo-500'
          type='password'
          id='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
          autoComplete='off'
        />
        <Link className='text-sm font-semibold text-right text-indigo-500' to='/auth/forgot'>
          Forgot your password?
        </Link>
        <button
          disabled={loading}
          className='flex items-center justify-center px-5 py-3 mt-2 font-semibold text-white bg-indigo-500 rounded disabled:cursor-not-allowed disabled:bg-indigo-400 focus:outline-indigo-300 hover:bg-indigo-600'
          type='submit'
        >
          {!loading ? (
            <span>Login</span>
          ) : (
            <AnimatePresence>
              <motion.span initial={{ translateY: '-100%' }} animate={{ translateY: 0 }} className='flex items-center justify-center'>
                <svg className='w-5 h-5 mr-3 -ml-1 text-white animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Loading...
              </motion.span>
            </AnimatePresence>
          )}
        </button>
        {msgError && <p className='mt-4 text-sm font-semibold text-center text-red-500'>{msgError}</p>}
        <Link to='/auth/register' className='py-2 mt-5 text-sm text-center text-gray-500 hover:text-indigo-500'>
          Create new account
        </Link>
      </form>
    </article>
  )
}
