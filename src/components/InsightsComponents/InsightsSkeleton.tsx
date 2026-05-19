export const InsightsSkeleton: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return <div className={`bg-white/5 rounded-lg animate-pulse ${className}`} />;
};
