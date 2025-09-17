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
import ExpenzLogo from "./ui/expenz-logo";
import {
  LayoutGrid,
  BriefcaseBusiness,
  Menu,
  Power,
} from "lucide-react";
import Link from "next/link";

const navlinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutGrid  />,
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: <BriefcaseBusiness  />,
  },
  {
    title: "Expense",
    url: "/dashboard/expense",
    icon: <Menu  />,
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
        <Button variant="secondary" size="icon" className="size-8">
          <Power />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
