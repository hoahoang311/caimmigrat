import Image from "next/image";

interface ICBMLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function ICBMLogo({
  className = "",
  size = "md",
}: ICBMLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-32 w-auto",
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <Image
        src="/official_logo.jpeg"
        alt="ICBM Law Logo"
        fill
        className="object-contain !relative"
      />
    </div>
  );
}
