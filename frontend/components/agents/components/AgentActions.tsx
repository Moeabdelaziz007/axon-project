"use client";

import { motion } from 'framer-motion';

interface AgentActionsProps {
  agentType: string;
}

export function AgentActions({ agentType }: AgentActionsProps) {
  return (
    <motion.a
      href={`/agents/${agentType}`}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 text-white font-semibold shadow-xl hover:shadow-[#48FFEA66] transition"
    >
      Launch
    </motion.a>
  );
}
