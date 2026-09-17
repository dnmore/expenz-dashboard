import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full bg-sidebar rounded-xl my-2 border shadow-sm">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
