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
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-32",
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className} `}>
      <Image
        src="/official_logo.jpeg"
        alt="ICBM Law Logo"
        fill
        className="object-contain !relative !w-auto"
      />
    </div>
  );
}
