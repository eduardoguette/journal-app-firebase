import React from 'react'
import { mymoment } from '../../helpers/mymoment'

export const Date = () => { 
  return (
    <p className='mt-2 text-xs font-light'>{mymoment()}</p>
  )
}
