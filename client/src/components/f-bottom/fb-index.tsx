import React from 'react'
import SLIndex from './s-left/sl-index'
import SRIndex from './s-right/sr-index'

type Props = {}

const FBIndex = (props: Props) => {
  return (
    <div>
      <SRIndex/>
      <SLIndex/>
    </div>
  )
}

export default FBIndex