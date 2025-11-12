// app/components/General/buttons/SlantedButton.tsx
import { ArrowBigRightDash } from "lucide-react";
import React from "react";

interface SlantedButtonProps {
  text?: string;
  onClick?: () => void;
}

const SlantedButton: React.FC<SlantedButtonProps> = ({
  text = "GET STARTED",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center font-semibold text-sm text-[var(--color-primary-foreground)] cursor-pointer rounded-md overflow-hidden group"
    >
      {/* Orange main area */}
      <span className="bg-[var(--color-primary)] py-3 px-5 pr-14 flex items-center">
        {text}
      </span>

      {/* Black arrow side (only arrow moves) */}
      <span className="absolute right-0 top-0 h-full w-[40px] bg-black flex items-center justify-center">
        <ArrowBigRightDash className="w-5 h-5 text-[var(--color-primary-foreground)] transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};

export default SlantedButton;
