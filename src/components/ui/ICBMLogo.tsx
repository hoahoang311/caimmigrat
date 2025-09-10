interface ICBMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ICBMLogo({ className = "", size = "md" }: ICBMLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg"
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg ${className}`}>
      <span className={`${textSizes[size]} font-bold text-white tracking-tight`}>
        ICBM
      </span>
    </div>
  );
}