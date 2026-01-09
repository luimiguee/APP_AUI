import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'warning' | 'danger';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label,
  color = 'primary'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    primary: 'bg-[#4A90E2]',
    secondary: 'bg-[#50E3C2]',
    warning: 'bg-[#F5A623]',
    danger: 'bg-[#D0021B]',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#333333] dark:text-gray-200">{label}</span>
          <span className="text-sm text-[#AAAAAA] dark:text-gray-400">{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

