'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  message: string | null
}

export function MicroConfirm({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="micro-confirm"
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span style={{ lineHeight: 1.5 }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
