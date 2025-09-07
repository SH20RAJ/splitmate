"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';

interface MenuItem {
  title: string;
  url: string;
}

interface Navbar1Props {
 logo?: {
   url: string;
   src: string;
   alt: string;
   title: string;
 };
 menu?: MenuItem[];
 auth?: {
   login: {
     text: string;
     url: string;
   };
   signup: {
     text: string;
     url: string;
   };
 };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "SplitMate Logo",
    title: "SplitMate",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Dashboard", url: "/dashboard" },
    { title: "Groups", url: "/groups" },
    { title: "Analytics", url: "/analytics" },
    { title: "AI Assistant", url: "/chat" },
  ],
  auth = {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 pl-5 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between lg:justify-between">
        {/* Logo */}
        <Link href={logo.url} className="flex items-center gap-2 lg:flex-shrink-0">
          <Image src={logo.src || "/logo.png"} alt={logo.alt || "Logo"} width={32} height={32} />
          <span className="text-xl font-bold">{logo.title}</span>
        </Link>

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex gap-2 flex-shrink-0">
          <Button asChild variant="outline" size="sm">
            <Link href={auth.login.url}>{auth.login.text}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={auth.signup.url}>{auth.signup.text}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="block font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline">
                  <Link href={auth.login.url}>{auth.login.text}</Link>
                </Button>
                <Button asChild>
                  <Link href={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar1 };