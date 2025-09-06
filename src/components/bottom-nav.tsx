"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User, Activity, Plus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md text-center border-t border-gray-200 dark:border-gray-800 backdrop-blur-md z-50 rounded-t-2xl">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
          "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          )}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
        );
      })}
      </div>
    </div>
  );
}
