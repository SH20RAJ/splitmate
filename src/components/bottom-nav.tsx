"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User, Activity, Plus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/groups", icon: Users, label: "Groups" },
  { href: "/add-expense", icon: Plus, label: "Add" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Dock
        className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
        iconSize={44}
        iconMagnification={64}
        iconDistance={120}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DockIcon 
              key={item.href} 
              className={cn(
                "transition-all duration-300 ease-out",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              <Link
                href={item.href}
                className="flex items-center justify-center w-full h-full rounded-full"
                title={item.label}
              >
                <item.icon className={cn(
                  "transition-all duration-200",
                  isActive ? "h-6 w-6" : "h-5 w-5"
                )} />
              </Link>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
