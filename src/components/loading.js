import React from 'react'

const Loading = () => {
  return (
    <div className="overlay-wrapper">
        <div className="overlay d-flex flex-column align-items-center">
            <i className="fas fa-3x fa-sync-alt fa-spin" />
            <div className="text-bold pt-2">Loading...</div>
        </div>
    </div>

  )
}

export default Loading
