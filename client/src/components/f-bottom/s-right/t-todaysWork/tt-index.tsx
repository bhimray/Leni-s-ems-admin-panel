import React from 'react'
import TTCreateWork from './tt-createWork'
import TTDisplayWork from './tt-displayWork'

type Props = {}

const TTindex = (props: Props) => {
  return (
    <div>
        <TTCreateWork/>
        <TTDisplayWork/>
    </div>
  )
}

export default TTindex