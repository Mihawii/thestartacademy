import { cn } from "@/lib/utils";
import Image from "next/image";

interface PluraLogoProps {
  className?: string;
}

export const PluraLogo = ({ className }: PluraLogoProps) => {
  return (
    <div className={cn("w-20 h-20 flex items-center justify-center", className)}>
      <Image 
        src="/assets/plura/logopluracopy.png" 
        alt="Plura AI Logo" 
        width={80}
        height={80}
        className="object-contain rounded-lg"
        priority
        unoptimized
      />
    </div>
  );
};
