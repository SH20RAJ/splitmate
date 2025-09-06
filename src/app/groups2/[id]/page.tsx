import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeftIcon,
  PlusIcon, 
  UsersIcon, 
  DollarSignIcon,
  CalendarIcon,
  SettingsIcon,
  ReceiptIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react';
import Link from 'next/link';

export const runtime = 'edge';

// Mock data for individual groups
const mockGroupsData = {
  '1': {
    id: '1',
    name: 'Roommates',
    description: 'Monthly shared expenses',
    members: [
      { name: 'You', id: 'you', balance: -500, avatar: 'Y' },
      { name: 'Sarah', id: 'sarah', balance: 200, avatar: 'S' },
      { name: 'Mike', id: 'mike', balance: 150, avatar: 'M' },
      { name: 'Jane', id: 'jane', balance: 150, avatar: 'J' }
    ],
    totalExpenses: 12500,
    yourShare: 3125,
    createdAt: '2025-08-15',
    status: 'active',
    expenses: [
      {
        id: 1,
        description: 'Electricity Bill',
        amount: 3200,
        paidBy: 'You',
        date: '2025-09-05',
        category: 'Utilities',
        participants: ['You', 'Sarah', 'Mike', 'Jane']
      },
      {
        id: 2,
        description: 'Groceries - Weekly',
        amount: 2800,
        paidBy: 'Sarah',
        date: '2025-09-03',
        category: 'Food',
        participants: ['You', 'Sarah', 'Mike', 'Jane']
      },
      {
        id: 3,
        description: 'Internet Bill',
        amount: 1500,
        paidBy: 'Mike',
        date: '2025-09-01',
        category: 'Utilities',
        participants: ['You', 'Sarah', 'Mike', 'Jane']
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Weekend Trip',
    description: 'Goa vacation expenses',
    members: [
      { name: 'You', id: 'you', balance: 0, avatar: 'Y' },
      { name: 'Rahul', id: 'rahul', balance: 0, avatar: 'R' },
      { name: 'Priya', id: 'priya', balance: 0, avatar: 'P' },
      { name: 'Arjun', id: 'arjun', balance: 0, avatar: 'A' },
      { name: 'Nisha', id: 'nisha', balance: 0, avatar: 'N' }
    ],
    totalExpenses: 45000,
    yourShare: 9000,
    createdAt: '2025-08-20',
    status: 'settled',
    expenses: [
      {
        id: 1,
        description: 'Hotel Booking',
        amount: 25000,
        paidBy: 'You',
        date: '2025-08-25',
        category: 'Accommodation',
        participants: ['You', 'Rahul', 'Priya', 'Arjun', 'Nisha']
      },
      {
        id: 2,
        description: 'Flight Tickets',
        amount: 1500,
        paidBy: 'Rahul',
        date: '2025-08-22',
        category: 'Transport',
        participants: ['You', 'Rahul', 'Priya', 'Arjun', 'Nisha']
      },
      {
        id: 3,
        description: 'Food & Dining',
        amount: 5000,
        paidBy: 'Priya',
        date: '2025-08-26',
        category: 'Food',
        participants: ['You', 'Rahul', 'Priya', 'Arjun', 'Nisha']
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Office Team',
    description: 'Team lunch & outings',
    members: [
      { name: 'You', id: 'you', balance: -200, avatar: 'Y' },
      { name: 'Boss', id: 'boss', balance: 100, avatar: 'B' },
      { name: 'Colleague1', id: 'colleague1', balance: 50, avatar: 'C' },
      { name: 'Colleague2', id: 'colleague2', balance: 50, avatar: 'C' }
    ],
    totalExpenses: 8900,
    yourShare: 1483,
    createdAt: '2025-08-10',
    status: 'active',
    expenses: [
      {
        id: 1,
        description: 'Team Lunch',
        amount: 4500,
        paidBy: 'You',
        date: '2025-09-02',
        category: 'Food',
        participants: ['You', 'Boss', 'Colleague1', 'Colleague2']
      }
    ]
  }
};

interface GroupPageProps {
  params: {
    id: string;
  };
}

function MemberBalanceCard({ member }: { member: any }) {
  const isPositive = member.balance > 0;
  const isZero = member.balance === 0;
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{member.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{member.name}</p>
          {member.name === 'You' && <Badge variant="outline" className="text-xs">You</Badge>}
        </div>
      </div>
      <div className="text-right">
        {isZero ? (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircleIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Settled</span>
          </div>
        ) : (
          <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}₹{Math.abs(member.balance)}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          {isZero ? 'All settled' : isPositive ? 'Gets back' : 'Owes'}
        </p>
      </div>
    </div>
  );
}

function ExpenseCard({ expense }: { expense: any }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{expense.description}</h4>
          <Badge variant="outline">{expense.category}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Paid by {expense.paidBy}</span>
            <span>•</span>
            <span>{expense.date}</span>
          </div>
          <span className="font-medium text-foreground">₹{expense.amount}</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Split among {expense.participants.length} people
        </div>
      </CardContent>
    </Card>
  );
}

export default function GroupPage({ params }: GroupPageProps) {
  const group = mockGroupsData[params.id as keyof typeof mockGroupsData];

  if (!group) {
    notFound();
  }

  const totalBalance = group.members.reduce((sum, member) => sum + Math.abs(member.balance), 0);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/groups">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{group.name}</h1>
            <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
              {group.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{group.totalExpenses.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Your Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{group.yourShare.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{group.members.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Expenses</h3>
            <Button variant="outline" size="sm">
              <ReceiptIcon className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <Suspense fallback={<div>Loading expenses...</div>}>
            {group.expenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </Suspense>

          {group.expenses.length === 0 && (
            <div className="text-center py-12">
              <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No expenses yet</h3>
              <p className="text-muted-foreground mb-4">Add your first expense to get started</p>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="balances" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Member Balances</h3>
            {group.status === 'active' && totalBalance > 0 && (
              <Badge variant="outline" className="text-orange-600">
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                Unsettled
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {group.members.map((member) => (
              <MemberBalanceCard key={member.id} member={member} />
            ))}
          </div>
          
          {group.status === 'active' && totalBalance > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircleIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Settlement Suggestion</span>
                </div>
                <p className="text-sm text-blue-700">
                  Total unsettled amount: ₹{totalBalance}. Consider settling up to keep things simple!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Group Members</h3>
            <Button variant="outline" size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      {member.name === 'You' && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
