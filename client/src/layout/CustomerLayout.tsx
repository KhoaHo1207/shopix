import { CustomerNavbar } from "@/components/customer/commmon/desktop-navbar";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/*navbar */}
      <CustomerNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
