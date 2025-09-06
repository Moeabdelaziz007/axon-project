"""
Python Adapter Layer for Axon Agent System
Integrates quantum-brain-Mvp agents with Next.js frontend
"""

import os
import sys
import json
import asyncio
from typing import Dict, Any, Optional, List
from pathlib import Path

# Add quantum-brain path to Python path
QUANTUM_BRAIN_PATH = Path(__file__).parent.parent.parent.parent.parent / "quantum-brain-Mvp"
sys.path.insert(0, str(QUANTUM_BRAIN_PATH))

try:
    # Import quantum-brain agents
    from ai_agents.ide_agent import IDEAgent
    from ai_agents.autonomous_chat import AutonomousAIChat
    from ai_components.fraud_detection.agent import FraudDetectionAgent
    from ai_components.pricing.agent import PricingAgent
    from ai_components.resource_forecasting.agent import ResourceForecastingAgent
    from ai_components.self_healing.agent import SelfHealingAgent
    from ai_components.security.sentinel import SecuritySentinel
    from ai_components.customer_engagement.agent import CustomerEngagementAgent
    from ai_components.anomaly_detection.agent import AnomalyDetectionAgent
    from ai_components.performance.optimizer import PerformanceOptimizer
    from ai_components.backup.guardian import BackupGuardian
    from ai_components.revenue.collector import RevenueCollector
    from ai_components.retention.agent import RetentionAgent
    from ai_components.market.adapter import MarketAdapter
    from ai_components.knowledge.synthesizer import KnowledgeSynthesizer
    from ai_components.recommendations.engine import AIRecommendationEngine
    
    QUANTUM_BRAIN_AVAILABLE = True
except ImportError as e:
    print(f"Warning: quantum-brain-Mvp not available: {e}")
    QUANTUM_BRAIN_AVAILABLE = False

class QuantumBrainAdapter:
    """Adapter to integrate quantum-brain-Mvp agents with Axon"""
    
    def __init__(self):
        self.agents = {}
        self.chat_system = None
        self._initialize_agents()
    
    def _initialize_agents(self):
        """Initialize all quantum-brain agents"""
        if not QUANTUM_BRAIN_AVAILABLE:
            return
            
        try:
            # Initialize core agents
            self.agents = {
                'ide': IDEAgent(),
                'fraud_detection': FraudDetectionAgent(),
                'pricing': PricingAgent(),
                'resource_forecasting': ResourceForecastingAgent(),
                'self_healing': SelfHealingAgent(),
                'security': SecuritySentinel(),
                'customer_engagement': CustomerEngagementAgent(),
                'anomaly_detection': AnomalyDetectionAgent(),
                'performance': PerformanceOptimizer(),
                'backup': BackupGuardian(),
                'revenue': RevenueCollector(),
                'retention': RetentionAgent(),
                'market': MarketAdapter(),
                'knowledge': KnowledgeSynthesizer(),
                'recommendations': AIRecommendationEngine()
            }
            
            # Initialize chat system
            self.chat_system = AutonomousAIChat()
            
        except Exception as e:
            print(f"Error initializing quantum-brain agents: {e}")
    
    def run_agent(self, agent_type: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Run a specific quantum-brain agent"""
        if not QUANTUM_BRAIN_AVAILABLE:
            return {
                'ok': False,
                'error': 'quantum-brain-Mvp not available',
                'agent_type': agent_type
            }
        
        try:
            agent = self.agents.get(agent_type)
            if not agent:
                return {
                    'ok': False,
                    'error': f'Agent {agent_type} not found',
                    'agent_type': agent_type
                }
            
            # Route to appropriate agent method
            if agent_type == 'ide':
                result = self._run_ide_agent(input_data)
            elif agent_type == 'fraud_detection':
                result = agent.detect_fraud(input_data)
            elif agent_type == 'pricing':
                result = agent.calculate_dynamic_price(input_data)
            elif agent_type == 'resource_forecasting':
                result = agent.predict_resource_peak()
            elif agent_type == 'security':
                result = agent.analyze_logs(input_data.get('logs', []))
            elif agent_type == 'customer_engagement':
                result = agent.generate_engagement_plan(input_data.get('customer_data', {}))
            elif agent_type == 'anomaly_detection':
                result = agent.detect_behavior_anomalies(input_data.get('pattern', {}))
            elif agent_type == 'performance':
                result = agent.tune_system(input_data.get('metrics', {}))
            elif agent_type == 'backup':
                result = agent.verify_backups()
            elif agent_type == 'revenue':
                result = agent.collect_payment(input_data.get('transaction', {}))
            elif agent_type == 'retention':
                result = agent.analyze_customer_sentiment(input_data.get('feedback', {}))
            elif agent_type == 'market':
                result = agent.scrape_market_trends()
            elif agent_type == 'knowledge':
                result = agent.query_knowledge(input_data.get('query', ''))
            elif agent_type == 'recommendations':
                result = agent.get_recommendations(input_data.get('task_id', 'default'))
            else:
                result = {'message': f'Agent {agent_type} executed', 'data': input_data}
            
            return {
                'ok': True,
                'result': result,
                'agent_type': agent_type,
                'provider': 'quantum-brain'
            }
            
        except Exception as e:
            return {
                'ok': False,
                'error': str(e),
                'agent_type': agent_type
            }
    
    def _run_ide_agent(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Run IDE agent with task description"""
        task_description = input_data.get('prompt', 'General coding task')
        agent = IDEAgent(task_description)
        
        # Run analysis and execution
        analysis = agent.analyze_task()
        execution = agent.execute_coding_task(analysis)
        quality = agent.verify_quality(execution)
        
        return {
            'analysis': analysis,
            'execution': execution,
            'quality': quality,
            'task_description': task_description
        }
    
    def get_available_agents(self) -> List[str]:
        """Get list of available quantum-brain agents"""
        if not QUANTUM_BRAIN_AVAILABLE:
            return []
        return list(self.agents.keys())
    
    def get_agent_info(self, agent_type: str) -> Dict[str, Any]:
        """Get information about a specific agent"""
        if not QUANTUM_BRAIN_AVAILABLE:
            return {'available': False}
        
        agent_descriptions = {
            'ide': 'Intelligent IDE agent for code generation and project monitoring',
            'fraud_detection': 'Advanced fraud detection using ML patterns',
            'pricing': 'Dynamic pricing optimization agent',
            'resource_forecasting': 'Resource usage prediction and optimization',
            'self_healing': 'System self-healing and recovery agent',
            'security': 'Security monitoring and threat detection',
            'customer_engagement': 'Customer engagement and retention strategies',
            'anomaly_detection': 'Behavioral anomaly detection',
            'performance': 'System performance optimization',
            'backup': 'Automated backup and recovery management',
            'revenue': 'Revenue collection and payment processing',
            'retention': 'Customer retention analysis and strategies',
            'market': 'Market trend analysis and adaptation',
            'knowledge': 'Knowledge synthesis and query processing',
            'recommendations': 'AI-powered recommendation engine'
        }
        
        return {
            'available': agent_type in self.agents,
            'description': agent_descriptions.get(agent_type, 'Unknown agent'),
            'provider': 'quantum-brain'
        }

# Global adapter instance
quantum_adapter = QuantumBrainAdapter()

def run_quantum_agent(agent_type: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
    """Main function to run quantum-brain agents"""
    return quantum_adapter.run_agent(agent_type, input_data)

def get_quantum_agents() -> List[str]:
    """Get available quantum-brain agents"""
    return quantum_adapter.get_available_agents()

def get_quantum_agent_info(agent_type: str) -> Dict[str, Any]:
    """Get quantum-brain agent information"""
    return quantum_adapter.get_agent_info(agent_type)
