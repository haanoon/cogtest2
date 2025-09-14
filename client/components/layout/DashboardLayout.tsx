import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bolt,
  CalendarClock,
  Layers3,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const location = useLocation();
  const path = location.pathname;
  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: any;
    label: string;
  }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={path === to}>
        <Link to={to} className="flex items-center gap-2">
          <Icon className="size-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="size-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold">
              FA
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Favorita Analytics</div>
              <div className="text-xs text-muted-foreground">
                Sales Forecasting
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  to="/"
                  icon={LayoutDashboard}
                  label="Weekly/Monthly Planning"
                />
                <NavItem
                  to="/operations"
                  icon={Layers3}
                  label="Day-to-Day Operations"
                />
                <NavItem
                  to="/Insights"
                  icon={ShieldCheck}
                  label="Advanced Insights"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Bolt className="size-3" /> System Status: Normal
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4">
          <SidebarTrigger />
          <div className="grid gap-0.5">
            <h1 className="text-base font-semibold leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarClock className="size-4" /> Last Updated:{" "}
            <span className="font-medium">2 min ago</span>
            <Button variant="outline" size="sm" className="ml-2">
              Alerts
            </Button>
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
