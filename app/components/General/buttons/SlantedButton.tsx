// app/components/General/buttons/SlantedButton.tsx
import { RiArrowRightDoubleLine } from "react-icons/ri";
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
      className="relative flex items-center font-semibold text-sm text-[var(--color-primary-foreground)] cursor-pointer rounded-md overflow-hidden"
    >
      {/* Orange main area */}
      <span className="bg-[var(--color-primary)] py-3 px-5 pr-14 flex items-center">
        {text}
      </span>

      {/* Black arrow side */}
      <span className="absolute right-0 top-0 h-full w-[40px] bg-black flex items-center justify-center">
        <RiArrowRightDoubleLine className="w-5 h-5 text-[var(--color-primary-foreground)]" />
      </span>
    </button>
  );
};

export default SlantedButton;
