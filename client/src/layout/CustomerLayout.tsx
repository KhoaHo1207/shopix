import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/*navbar */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
