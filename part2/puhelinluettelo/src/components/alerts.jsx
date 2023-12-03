import React from "react";

const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }

    const className = type === 'success' ? 'notification success' : 
                      type === 'error' ? 'notification error' : 
                      'notification';
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification