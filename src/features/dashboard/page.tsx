import { DashboardContent } from "./components/dashboard-content";

export function DashboardPage() {
  return (
    <main className="h-screen overflow-x-hidden overflow-y-auto bg-[#0b1220] font-['Inter',Arial,Helvetica,sans-serif]">
      <div className="w-full">
        <DashboardContent />
      </div>
    </main>
  );
}
