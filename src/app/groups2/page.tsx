import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  PlusIcon, 
  UsersIcon, 
  DollarSignIcon,
  CalendarIcon,
  SettingsIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock data for groups
const mockGroups = [
  {
    id: '1',
    name: 'Roommates',
    description: 'Monthly shared expenses',
    members: ['You', 'Sarah', 'Mike', 'Jane'],
    totalExpenses: 12500,
    yourShare: 3125,
    lastActivity: '2 days ago',
    status: 'active'
  },
  {
    id: '2', 
    name: 'Weekend Trip',
    description: 'Goa vacation expenses',
    members: ['You', 'Rahul', 'Priya', 'Arjun', 'Nisha'],
    totalExpenses: 45000,
    yourShare: 9000,
    lastActivity: '1 week ago',
    status: 'settled'
  },
  {
    id: '3',
    name: 'Office Team',
    description: 'Team lunch & outings',
    members: ['You', 'Boss', 'Colleague1', 'Colleague2', 'Colleague3', 'Colleague4'],
    totalExpenses: 8900,
    yourShare: 1483,
    lastActivity: '5 days ago', 
    status: 'active'
  }
];

function GroupCard({ group }: { group: typeof mockGroups[0] }) {
  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </div>
            <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
              {group.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Members */}
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {group.members.slice(0, 4).map((member, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">{member.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {group.members.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground border-2 border-background">
                  +{group.members.length - 4}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground ml-2">{group.members.length} members</span>
          </div>

          {/* Financial summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1">
                <DollarSignIcon className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <p className="text-sm font-medium">₹{group.totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <DollarSignIcon className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Your share</span>
              </div>
              <p className="text-sm font-medium">₹{group.yourShare.toLocaleString()}</p>
            </div>
          </div>

          {/* Last activity */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3" />
            <span>Last activity: {group.lastActivity}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function GroupsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Groups</h1>
          <p className="text-muted-foreground">Manage your expense groups and split bills with friends</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<div>Loading groups...</div>}>
          {mockGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </Suspense>
      </div>

      {/* Empty state (if no groups) */}
      {mockGroups.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No groups yet</h3>
          <p className="text-muted-foreground mb-4">Create your first group to start splitting expenses</p>
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Create Your First Group
          </Button>
        </div>
      )}
    </div>
  );
}
