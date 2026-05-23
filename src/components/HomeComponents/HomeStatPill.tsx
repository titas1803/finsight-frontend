import React from "react";
type Props = { value: string; label: string };
export const HomeStatPill: React.FC<Props> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-text-primary text-[32px]/[100%] font-extrabold font-dm-serif ">
        {value}
      </div>
      <div className="text-text-muted text-[13px] mt-1.5">{label}</div>
    </div>
  );
};
