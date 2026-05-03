import React from "react";
import { Toaster } from "react-hot-toast";

export const ToastComp: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1A1D27",
          color: "#F1F5F9",
          border: "1px solid #2A2D3E",
        },
        success: { iconTheme: { primary: "#22C55E", secondary: "#1A1D27" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "#1A1D27" } },
      }}
    />
  );
};
