import { cn } from "@/utils/cn";

export const OverviewSkeleton: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <div className={cn("bg-white/5 rounded-lg animate-pulse", className)} />
  );
};
