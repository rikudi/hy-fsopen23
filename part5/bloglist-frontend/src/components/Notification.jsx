import React, { useState, useEffect } from 'react'

const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    //automatically hide the notification after a certain time (e.g., 5 seconds)
    const timeout = setTimeout(() => {
      setVisible(false)
    }, 5000)

    //aleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout)
  }, [])

  return visible ? (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  ) : null
}

export default Notification
