import { Spinner } from "react-bootstrap";

export const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center gap-4">
      <Spinner animation="grow" />
    </div>
  );
};

export const SectionSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-7 h-7 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
