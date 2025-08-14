import { ProfileDropdown } from "../profile-dropdown";
import { ThemeSwitch } from "../theme-switch";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  IconLayoutDashboard,
  IconUserCog,
  IconUsers,
  IconHome,
  IconBriefcase,
} from "@tabler/icons-react";

export default function Navbar() {
  const { location } = useRouterState();

  const navLinks = [
    { to: "/", icon: <IconHome size={40} />, label: "Home" },
    { to: "/tickets", icon: <IconLayoutDashboard size={40} />, label: "Tickets" },
    { to: "/users", icon: <IconUsers size={40} />, label: "Users" },
    { to: "/departments", icon: <IconBriefcase size={40} />, label: "Departments" },
    { to: "/profile", icon: <IconUserCog size={40} />, label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-neutral-900">
      <div className="flex h-20 items-center justify-between mx-auto px-4">
        
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="./images/acebook-logo.png"
              alt="ACE-Book Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav className="flex items-center space-x-2">
          {navLinks.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Button
                asChild
                key={to}
                variant={isActive ? "secondary" : "ghost"}
                size="icon"
                className="rounded-lg"
              >
                <Link to={to} title={label}>
                  {icon}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Right - Controls */}
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
