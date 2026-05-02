import React from "react";
import "./App.scss";
import { CircularProgress } from "@mui/material";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center gap-4">
      <CircularProgress aria-label="Loading…" />
      <section className="text-primary">
        <h3>
          <strong>Work in progress</strong>
        </h3>
        <p>Please come back after few days.</p>
      </section>
    </div>
  );
};

export default App;
