"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Bell, 
  Lock, 
  Share, 
  HelpCircle, 
  LogOut,
  Edit,
  Camera,
  Settings,
  Activity
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import Link from "next/link";

export default function ProfilePage() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reminders: true,
  });

  const handleSignOut = () => {
    // Simple sign out simulation
    console.log("Signing out...");
  };

  const profileStats = [
    { label: "Total Expenses", value: "₹45,230", color: "text-blue-600" },
    { label: "Groups", value: "8", color: "text-green-600" },
    { label: "Friends", value: "24", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white text-gray-600 rounded-full p-1">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Shaswat Raj</h1>
              <p className="text-blue-100">shaswat@example.com</p>
              <p className="text-blue-100 text-sm">Member since Jan 2024</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white hover:bg-opacity-20"
              onClick={() => setShowEditProfile(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 -mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {profileStats.map((stat, index) => (
                  <div key={index}>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-4">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                ACCOUNT
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Edit Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Email Preferences</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                NOTIFICATIONS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span>Email Notifications</span>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, email: !notifications.email})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span>Payment Reminders</span>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, reminders: !notifications.reminders})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.reminders ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.reminders ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Other Options */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Link href="/activity" className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Activity History</span>
                </Link>
                <Link href="/invite" className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Share className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Invite Friends</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">Help & Support</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-left">App Settings</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="flex-1 text-left">Sign Out</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue="Shaswat Raj"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="shaswat@example.com"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowEditProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setShowEditProfile(false)}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
