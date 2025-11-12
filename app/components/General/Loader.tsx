interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  height?: string;
}

export default function Loader({ size = "md", color = "primary", height }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center items-center" style={{ height }}>
      <div
        className={`${sizeClasses[size]} border-${color} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}
