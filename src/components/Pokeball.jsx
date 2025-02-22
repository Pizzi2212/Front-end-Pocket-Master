import React from 'react'
import { motion } from 'framer-motion'

const PokeBall = () => {
  return (
    <motion.div
      style={{
        width: '100px',
        height: '100px',
        background: 'linear-gradient(to bottom, red 50%, white 50%)',
        borderRadius: '50%',
        border: '5px solid black',
        position: 'relative',
      }}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{ x: 500, y: -500, rotate: 360 }}
      exit={{ x: -500, y: 500, rotate: -360 }}
      transition={{ duration: 1 }}
    >
      <div
        style={{
          width: '30px',
          height: '30px',
          background: 'white',
          border: '5px solid black',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  )
}

export default PokeBall
