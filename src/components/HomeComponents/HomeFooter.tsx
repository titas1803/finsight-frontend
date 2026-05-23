import React from "react";

export const HomeFooter: React.FC = () => {
  return (
    <footer className="border-t border-solid border-border py-8 px-6">
      <div className="max-w-275 my-0 mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-[14px] font-extrabold text-white">
            F
          </div>
          <span className="text-text-muted text-[14px]">
            FinSight — smart finance tracking
          </span>
        </div>
        <div className="text-text-muted text-[14px]">
          Built by <strong>Titas Sarkar</strong>, email:{" "}
          <a href="mailto:titas.sarkar1999@gmail.com" target="_blank">
            <em>titas.sarkar1999@gmail.com</em>
          </a>
        </div>
        <div className="text-text-muted text-[13px]">
          Built with NestJS · PostgreSQL · Redis · OpenAI
        </div>
      </div>
    </footer>
  );
};
