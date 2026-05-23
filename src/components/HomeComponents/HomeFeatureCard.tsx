type Props = {
  icon: string;
  title: string;
  desc: string;
  accent: string;
};
export const HomeFeatureCard: React.FC<Props> = ({
  accent,
  desc,
  icon,
  title,
}) => {
  return (
    <div
      className="bg-surface border border-solid border-border rounded-[20px] p-7 transition-[border-color,transform] duration-200"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent + "55";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2A2D3E";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{
          background: `${accent}18`,
        }}
      >
        {icon}
      </div>
      <div className="text-text-primary text-[16px] font-semibold mb-2">
        {title}
      </div>
      <div className="text-text-muted text-sm leading-[1.6]">{desc}</div>
    </div>
  );
};
