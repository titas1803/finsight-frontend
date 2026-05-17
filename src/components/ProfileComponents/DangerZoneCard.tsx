import { AlertTriangle, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

export const DangerZoneCard: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  async function handleLogout() {
    await logout();
    navigate(RoutePaths.LOGIN);
  }

  return (
    <div className="bg-[#1A1D27] border border-red-500/20 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-red-500/20">
        <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center">
          <AlertTriangle size={13} className="text-red-400" />
        </div>
        <h2 className="text-sm font-bold text-[#F1F5F9]">Account Actions</h2>
      </div>

      <div className="px-6 py-5 space-y-3">
        {/* Sign out row */}
        <div className="flex items-center justify-between py-3 border-b border-[#2A2D3E]">
          <div>
            <p className="text-sm font-medium text-[#F1F5F9]">Sign out</p>
            <p className="text-xs text-[#64748B] mt-0.5">
              Clears your session cookie and logs you out on this device
            </p>
          </div>
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2D3E] text-xs font-medium text-[#64748B] hover:text-red-400 hover:border-red-500/30 transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#64748B]">Sure?</p>
              <button
                onClick={() => setConfirming(false)}
                className="px-3 py-1.5 rounded-lg border border-[#2A2D3E] text-xs font-medium text-[#64748B] hover:text-[#F1F5F9] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Role */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-[#F1F5F9]">Account type</p>
            <p className="text-xs text-[#64748B] mt-0.5">Your current role</p>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-[#6C63FF]/15 border border-[#6C63FF]/30 text-xs font-semibold text-[#6C63FF] uppercase tracking-wider">
            {user?.role ?? "User"}
          </span>
        </div>
      </div>
    </div>
  );
};
