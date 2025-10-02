import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Sidebar</p>
          </TooltipContent>
        </Tooltip>

        {children}
      </main>
    </SidebarProvider>
  );
}
