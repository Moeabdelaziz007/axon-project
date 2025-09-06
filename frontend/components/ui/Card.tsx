import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'quantum' | 'glass';
}

export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const variants = {
    default: 'bg-white rounded-lg shadow-md p-6 border border-gray-100',
    quantum: 'bg-carbon-900/60 backdrop-blur-xl rounded-2xl p-6 border border-spaceGray-800',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20'
  };

  return (
    <div className={clsx(variants[variant], className)}>
      {children}
    </div>
  );
};
