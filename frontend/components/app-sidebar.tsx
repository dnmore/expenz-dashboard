import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ExpenzLogo from "./ui/expenz-logo";
import {
  LayoutGrid,
  BriefcaseBusiness,
  ReceiptText,
  Power,
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/auth";
import { ModeToggle } from "./ui/mode-toggle";

const navlinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutGrid />,
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: <BriefcaseBusiness />,
  },
  {
    title: "Expense",
    url: "/dashboard/expense",
    icon: <ReceiptText />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex gap-16 items-center">
              <ExpenzLogo />
              <ModeToggle />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navlinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="text-sm"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <form action={logout} className="flex items-center gap-2">
          <Button type="submit" size="icon">
            <Power />
          </Button>
          <span className="text-muted-foreground text-sm">Logout</span>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
