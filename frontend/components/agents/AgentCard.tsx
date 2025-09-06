"use client";

import { motion } from 'framer-motion';
import { memo } from 'react';
import { AgentStatus } from './components/AgentStatus';
import { AgentInfo } from './components/AgentInfo';
import { AgentActions } from './components/AgentActions';

type Agent = {
  name: string;
  description: string;
  healthy: boolean;
  type: string;
  icon: string;
};

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      className="relative rounded-3xl p-8 shadow-[0_0_48px_#00FFB9BB] bg-spaceGray-900/80 border border-spaceGray-800 overflow-hidden group backdrop-blur-2xl hover:shadow-[0_0_80px_#50FFEEA0] transition-all"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <AgentStatus healthy={agent.healthy} />
      <AgentInfo
        name={agent.name}
        description={agent.description}
        healthy={agent.healthy}
      />
      <AgentActions agentType={agent.type} />
    </motion.div>
  );
}

// Memoize AgentCard to prevent unnecessary re-renders
export default memo(AgentCard, (prevProps, nextProps) => {
  return (
    prevProps.agent.name === nextProps.agent.name &&
    prevProps.agent.description === nextProps.agent.description &&
    prevProps.agent.healthy === nextProps.agent.healthy &&
    prevProps.agent.type === nextProps.agent.type
  );
});


