import React, { useState } from 'react'

const CustomTooltip = ({ children, content }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="tooltip-container">
      <div
        className="tooltip-trigger"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div className="tooltip-box">
          <div className="tooltip-content">{content}</div>
        </div>
      )}
    </div>
  )
}

export default CustomTooltip
