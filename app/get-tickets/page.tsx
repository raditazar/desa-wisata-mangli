import DayBookingView from "@/components/booking/DayBookingView";
import { apiClient } from "@/lib/api-client";

export default async function GetTicketsPage() {
  let initialApiPackages = [];
  try {
    const res = await apiClient.get<{ success: boolean; data: any[] }>('/tour-packages?is_active=true');
    if (res.success) {
      initialApiPackages = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch tour packages:", err);
  }

  return (
    <div className="min-h-screen">
      <div className="text-center mb-10">
        <h1 className="font-light text-5xl md:text-6xl text-primary leading-tight">
          Book Your <span className="font-bold">Experience</span> in Mangli
        </h1>
      </div>
      <div className="mx-auto max-w-11/12 pt-6 pb-10">
         <DayBookingView initialApiPackages={initialApiPackages} />
      </div>
    </div>
  );
}
