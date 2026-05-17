import { Check } from "lucide-react";
import { PASSWORD_RULES } from "../../utils/passwordRules";

export const PasswordStrength = ({ password }: { password: string }) => {
  if (!password) return null;
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const colors = ["#EF4444", "#F97316", "#F59E0B", "#22C55E", "#22C55E"];
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {PASSWORD_RULES.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < passed ? colors[passed - 1] : "#2A2D3E" }}
          />
        ))}
      </div>
      <p
        className="text-xs"
        style={{ color: passed > 0 ? colors[passed - 1] : "#64748B" }}
      >
        {passed > 0 ? labels[passed - 1] : ""}
      </p>
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule) => (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs transition-colors ${
              rule.test(password) ? "text-emerald-400" : "text-[#64748B]"
            }`}
          >
            <Check
              size={11}
              className={rule.test(password) ? "opacity-100" : "opacity-0"}
            />
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
