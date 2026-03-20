import DayBookingView from "@/components/booking/DayBookingView";

export default function GetTicketsPage() {
  return (
    <div className="min-h-screen">
      <div className="text-center mb-10">
        <h1 className="font-light text-5xl md:text-6xl text-primary leading-tight">
          Book Your <span className="font-bold">Experience</span> in Mangli
        </h1>
      </div>
      <div className="mx-auto max-w-11/12 pt-6 pb-10">
         <DayBookingView />
      </div>
    </div>
  );
}
