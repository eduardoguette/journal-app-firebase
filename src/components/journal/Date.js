import React from 'react'
import { mymoment } from '../../helpers/mymoment'

/**
 * It returns the current date and time.
 * @returns A function that returns a paragraph with the current date.
 */
export const Date = () => { 
  return (
    <p className='mt-2 text-xs'>{mymoment()}</p>
  )
}
