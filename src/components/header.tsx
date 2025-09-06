"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquareIcon, 
  BarChart3Icon, 
  SettingsIcon, 
  LogOutIcon, 
  UserIcon,
  BellIcon,
  MenuIcon
} from "lucide-react";
import { useState } from "react";

interface SplitMateHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    notifications?: number;
  };
  onSignIn?: () => void;
  onSignOut?: () => void;
  onToggleChat?: () => void;
  currentView: 'dashboard' | 'chat';
}

export function SplitMateHeader({ 
  user, 
  onSignIn, 
  onSignOut, 
  onToggleChat,
  currentView 
}: SplitMateHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">₹</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SplitMate</h1>
                <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Expense Splitting</p>
              </div>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* View Toggle */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onToggleChat?.()}
                    className="gap-2"
                  >
                    <BarChart3Icon className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={currentView === 'chat' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onToggleChat?.()}
                    className="gap-2"
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    AI Chat
                  </Button>
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <BellIcon className="h-5 w-5" />
                  {user.notifications && user.notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {user.notifications > 9 ? '9+' : user.notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSignOut}>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={onSignIn} className="gap-2">
                <UserIcon className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && user && (
          <div className="md:hidden mt-4 pt-4 border-t space-y-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                onToggleChat?.();
                setShowMobileMenu(false);
              }}
              className="w-full justify-start gap-2"
            >
              <BarChart3Icon className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={currentView === 'chat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                onToggleChat?.();
                setShowMobileMenu(false);
              }}
              className="w-full justify-start gap-2"
            >
              <MessageSquareIcon className="h-4 w-4" />
              AI Chat
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
