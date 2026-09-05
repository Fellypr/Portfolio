import { DashboardContent } from "./components/dashboard-content";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export function DashboardPage() {
  return (
    <main className="min-h-screen overflow-x-auto bg-[#0b1220] font-['Inter',Arial,Helvetica,sans-serif]">
      <div className="flex w-[1687px] min-w-[1687px]">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </main>
  );
}
