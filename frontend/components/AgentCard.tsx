"use client"

import { motion } from 'framer-motion'
import { memo } from 'react'

type Agent = {
  name: string
  description: string
  healthy: boolean
  type: string
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      className="relative rounded-3xl p-8 shadow-[0_0_48px_#00FFB9BB] bg-spaceGray-900/80 border border-spaceGray-800 overflow-hidden group backdrop-blur-2xl hover:shadow-[0_0_80px_#50FFEEA0] transition-all"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <div
        className="absolute right-5 top-5 w-3.5 h-3.5 rounded-full ring-2 ring-neon-500 shadow-[0_0_18px_#00FFB9] animate-pulse"
        style={{ background: agent.healthy ? '#00FFB9' : '#282C34' }}
      />
      <h2 className="font-extrabold text-2xl bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">
        {agent.name}
      </h2>
      <p className="mt-4 text-mediumGray">{agent.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-mediumGray">{agent.healthy ? 'Online' : 'Offline'}</span>
        <motion.a
          href={`/${agent.type}`}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 text-white font-semibold shadow-xl hover:shadow-[#48FFEA66] transition"
        >
          Launch
        </motion.a>
      </div>
    </motion.div>
  )
}

// Memoize AgentCard to prevent unnecessary re-renders
export default memo(AgentCard, (prevProps, nextProps) => {
  return (
    prevProps.agent.name === nextProps.agent.name &&
    prevProps.agent.description === nextProps.agent.description &&
    prevProps.agent.healthy === nextProps.agent.healthy &&
    prevProps.agent.type === nextProps.agent.type
  )
})


