import React from 'react'
import AIndex from './Alertness/a-index'
import TTCreateWork from './t-todaysWork/tt-createWork'
import TTindex from './t-todaysWork/tt-index'

type Props = {}

const SRIndex = (props: Props) => {
  return (
    <div>
        <TTindex/>
        <AIndex/>
    </div>
  )
}

export default SRIndex