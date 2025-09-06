export const AGENTS = [
  {
    id: 'content',
    name: 'Content Agent',
    type: 'content',
    description: 'AI-powered content generation with Gemini',
    healthy: true,
    icon: '📝'
  },
  {
    id: 'code',
    name: 'Code Agent', 
    type: 'code',
    description: 'AI code generation assistant',
    healthy: true,
    icon: '💻'
  },
  {
    id: 'research',
    name: 'Research Agent',
    type: 'research',
    description: 'Advanced research and analysis',
    healthy: true,
    icon: '🔍'
  },
  {
    id: 'design',
    name: 'Design Agent',
    type: 'design',
    description: 'UI/UX design and prototyping',
    healthy: true,
    icon: '🎨'
  }
];

export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  healthy: boolean;
  icon: string;
}
