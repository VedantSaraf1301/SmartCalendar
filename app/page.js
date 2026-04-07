import { WallCalendar } from "@/modules/actions/wallCalendar";

export default function Home() {
  return (
    <main className="min-h-screen  bg-gray-100 flex items-center justify-center p-8 dark:bg-gray-900">
      <WallCalendar />
    </main>
  );
}