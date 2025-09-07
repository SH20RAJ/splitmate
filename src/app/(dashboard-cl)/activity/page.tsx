"use client";
export const runtime = 'edge';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Users, Plus, Minus, Loader2, Filter } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { AppContainer } from "@/components/app-container";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Activity {
  _id: string;
  groupId: {
    _id: string;
    name: string;
  } | string;
  userId: {
    _id: string;
    displayName?: string;
    email: string;
  } | string;
  type: 'group_created' | 'member_added' | 'member_removed' | 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'payment_received' | 'group_updated';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
  amount?: number;
}

interface ApiResponse {
  success: boolean;
  data?: Activity[];
  error?: string;
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'expense_added':
      return { icon: Plus, color: 'text-blue-600 dark:text-blue-400' };
    case 'payment_made':
      return { icon: ArrowUpRight, color: 'text-red-600 dark:text-red-400' };
    case 'payment_received':
      return { icon: ArrowDownLeft, color: 'text-green-600 dark:text-green-400' };
    case 'group_created':
      return { icon: Users, color: 'text-purple-600 dark:text-purple-400' };
    case 'expense_updated':
      return { icon: Plus, color: 'text-blue-600 dark:text-blue-400' };
    case 'expense_deleted':
      return { icon: Minus, color: 'text-gray-600 dark:text-gray-400' };
    case 'member_added':
      return { icon: Users, color: 'text-purple-600 dark:text-purple-400' };
    case 'member_removed':
      return { icon: Minus, color: 'text-gray-600 dark:text-gray-400' };
    case 'group_updated':
      return { icon: Users, color: 'text-purple-600 dark:text-purple-400' };
    default:
      return { icon: Plus, color: 'text-blue-600 dark:text-blue-400' };
  }
};

const getActivityMessage = (activity: Activity, currentUser: any) => {
  const userName = typeof activity.userId === 'object' 
    ? (activity.userId.displayName || activity.userId.email.split('@')[0])
    : 'Unknown User';
  
  const isCurrentUser = typeof activity.userId === 'object' && activity.userId._id === currentUser?.id;

  switch (activity.type) {
    case 'expense_added':
      return isCurrentUser 
        ? `You added "${activity.description}"`
        : `${userName} added "${activity.description}"`;
    case 'payment_made':
      return isCurrentUser 
        ? `You paid ${activity.metadata?.toUser || 'someone'}`
        : `${userName} paid ${activity.metadata?.toUser || 'someone'}`;
    case 'payment_received':
      return isCurrentUser 
        ? `You received payment from ${activity.metadata?.fromUser || 'someone'}`
        : `${userName} received payment from ${activity.metadata?.fromUser || 'someone'}`;
    case 'group_created':
      const groupName = typeof activity.groupId === 'object' ? activity.groupId.name : 'Unknown Group';
      return isCurrentUser 
        ? `You created group "${groupName}"`
        : `${userName} created group "${groupName}"`;
    case 'expense_updated':
      return isCurrentUser 
        ? `You updated "${activity.description}"`
        : `${userName} updated "${activity.description}"`;
    case 'expense_deleted':
      return isCurrentUser 
        ? `You deleted "${activity.description}"`
        : `${userName} deleted "${activity.description}"`;
    case 'member_added':
      return isCurrentUser 
        ? `You were added to a group`
        : `${userName} was added to a group`;
    case 'member_removed':
      return isCurrentUser 
        ? `You were removed from a group`
        : `${userName} was removed from a group`;
    case 'group_updated':
      const updatedGroupName = typeof activity.groupId === 'object' ? activity.groupId.name : 'Unknown Group';
      return isCurrentUser 
        ? `You updated group "${updatedGroupName}"`
        : `${userName} updated group "${updatedGroupName}"`;
    default:
      return activity.description;
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return `1 year ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  if (interval === 1) return `1 month ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  if (interval === 1) return `1 day ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  if (interval === 1) return `1 hour ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return `1 minute ago`;
  
  return `${Math.floor(seconds)} seconds ago`;
};

const activityTypes = [
  { value: 'all', label: 'All Activities' },
  { value: 'expense_added', label: 'Expenses Added' },
  { value: 'expense_updated', label: 'Expenses Updated' },
  { value: 'expense_deleted', label: 'Expenses Deleted' },
  { value: 'payment_made', label: 'Payments Made' },
  { value: 'payment_received', label: 'Payments Received' },
  { value: 'group_created', label: 'Groups Created' },
 { value: 'group_updated', label: 'Groups Updated' },
  { value: 'member_added', label: 'Members Added' },
  { value: 'member_removed', label: 'Members Removed' },
];

export default function ActivityPage() {
  const user = useUser();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activityType, setActivityType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [openCalendar, setOpenCalendar] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const params = new URLSearchParams();
        params.append('limit', '30');
        
        const response = await fetch(`/api/users/${user.id}/activities?${params.toString()}`);
        const result: ApiResponse = await response.json();
        
        if (result.success && result.data) {
          setActivities(result.data);
        } else {
          setError(result.error || 'Failed to fetch activities');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const filteredActivities = activities.filter(activity => {
    // Filter by activity type
    if (activityType !== 'all' && activity.type !== activityType) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.from || dateRange.to) {
      const activityDate = new Date(activity.createdAt);
      if (dateRange.from && activityDate < dateRange.from) {
        return false;
      }
      if (dateRange.to && activityDate > dateRange.to) {
        return false;
      }
    }
    
    return true;
  });

  if (!user) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 h-full">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-gray-500 dark:text-gray-400">Please sign in to view your activity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 h-full">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Recent Activity</h1>
                <p className="text-muted-foreground">Track all your recent actions and transactions</p>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !dateRange.from && !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Filter by date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        });
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>
                  {filteredActivities.length > 0 
                    ? `Showing ${filteredActivities.length} activities` 
                    : "No activities found"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="text-red-600 dark:text-red-400 mb-2">Error loading activities</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
                    </div>
                  </div>
                ) : filteredActivities.length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500 dark:text-gray-400">
                      {activities.length === 0 
                        ? "No activities found" 
                        : "No activities match the selected filters"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredActivities.map((activity) => {
                      const { icon: Icon, color } = getActivityIcon(activity.type);
                      const groupName = typeof activity.groupId === 'object' ? activity.groupId.name : 'Unknown Group';
                      
                      return (
                        <Card key={activity._id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {getActivityMessage(activity, user)}
                                  </p>
                                  {activity.metadata?.amount && (
                                    <span className={`text-sm font-semibold ml-2 ${activity.type === "payment_received"
                                        ? "text-green-600 dark:text-green-400"
                                        : activity.type === "payment_made"
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-gray-900 dark:text-white"
                                      }`}>
                                      {activity.type === "payment_received" ? "+" :
                                        activity.type === "payment_made" ? "-" : ""}
                                      ₹{parseInt(activity.metadata.amount).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {groupName}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(activity.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Load More */}
          {filteredActivities.length > 0 && !loading && (
            <div className="px-4 lg:px-6">
              <div className="text-center">
                <Button variant="outline" className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Load more activities
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}