import React from 'react'

const Skeleton2 = () => {
  return (
    <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-96 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
  )
}

export default Skeleton2
