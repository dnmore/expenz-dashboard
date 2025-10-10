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
            <ExpenzLogo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navlinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
        <form action={logout}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                variant="secondary"
                size="icon"
                className="size-8"
              >
                <span className="sr-only">Logout</span>
                <Power />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
