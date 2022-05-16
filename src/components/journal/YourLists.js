import React from 'react'
import { ElementYourList } from './ElementYourList'

export const YourLists = ({ listProfile }) => { 
  return (
    <>
      {listProfile.map((item) => (
       <ElementYourList key={item.id} item={item}/>
      ))}
    </>
  )
}
