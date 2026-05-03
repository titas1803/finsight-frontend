import { Spinner } from "react-bootstrap";

export const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center gap-4">
      <Spinner animation="grow" />
    </div>
  );
};
