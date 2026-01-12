import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-medium py-3 px-4 rounded-button transition-all duration-200';
  
  const variants = {
    primary: 'bg-[#4A90E2] hover:bg-blue-600 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-[#50E3C2] hover:bg-teal-400 text-white shadow-sm hover:shadow-md',
    outline: 'border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

