"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, MapPin, Building, Calendar } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import Link from "next/link";

const mockGroups = [
  {
    id: 1,
    name: "Goa Trip 2024",
    type: "Trip",
    icon: MapPin,
    members: 4,
    totalBalance: 2450,
    lastActivity: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Apartment 3B",
    type: "Flatmates",
    icon: Building,
    members: 3,
    totalBalance: -850,
    lastActivity: "1 day ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Office Lunch",
    type: "Office",
    icon: Users,
    members: 8,
    totalBalance: 320,
    lastActivity: "3 days ago",
    color: "bg-purple-500",
  },
];

export default function GroupsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen nm pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Groups</h1>
          <Button onClick={() => setShowCreateModal(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Group
          </Button>
        </div>

        <div className="space-y-4">
          {mockGroups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${group.color}`}>
                      <group.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {group.name}
                        </h3>
                        <Badge variant="secondary">{group.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.members} members
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-sm font-medium ${group.totalBalance >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                          }`}>
                          {group.totalBalance >= 0 ? "+" : ""}₹{Math.abs(group.totalBalance)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {group.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Create New Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Group name"
                  className="w-full p-3 border rounded-lg"
                />
                <select className="w-full p-3 border rounded-lg">
                  <option>Trip</option>
                  <option>Flatmates</option>
                  <option>Office</option>
                  <option>Friends</option>
                </select>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowCreateModal(false);
                      // Add success toast here
                    }}
                  >
                    Create
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
