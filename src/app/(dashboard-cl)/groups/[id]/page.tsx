import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
    CheckCircleIcon,
    ShareIcon,
    MoreVerticalIcon,
    EditIcon,
    TrashIcon,
    SendIcon,
    DownloadIcon
} from 'lucide-react';
import { Pill, PillDelta, PillIndicator } from '@/components/ui/kibo-ui/pill';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Enhanced mock data for groups
const mockGroupsData = {
    '1': {
        id: '1',
        name: 'Roommates 🏠',
        description: 'Monthly shared expenses for our apartment',
        members: [
            {
                name: 'You',
                id: 'you',
                balance: -1250,
                avatar: 'Y',
                email: 'you@example.com',
                joinedAt: '2025-01-15'
            },
            {
                name: 'Sarah Wilson',
                id: 'sarah',
                balance: 420,
                avatar: 'SW',
                email: 'sarah@example.com',
                joinedAt: '2025-01-15'
            },
            {
                name: 'Mike Chen',
                id: 'mike',
                balance: 380,
                avatar: 'MC',
                email: 'mike@example.com',
                joinedAt: '2025-01-20'
            },
            {
                name: 'Jane Doe',
                id: 'jane',
                balance: 450,
                avatar: 'JD',
                email: 'jane@example.com',
                joinedAt: '2025-02-01'
            }
        ],
        totalExpenses: 28750,
        yourShare: 7187,
        monthlyBudget: 15000,
        createdAt: '2025-01-15',
        status: 'active',
        currency: '₹',
        category: 'Housing',
        expenses: [
            {
                id: 1,
                description: 'Electricity Bill - September',
                amount: 4200,
                paidBy: 'You',
                date: '2025-09-05',
                category: 'Utilities',
                participants: ['You', 'Sarah Wilson', 'Mike Chen', 'Jane Doe'],
                receipt: 'electricity-sep-2025.pdf',
                splitType: 'equal'
            },
            {
                id: 2,
                description: 'Weekly Groceries - Organic Market',
                amount: 3800,
                paidBy: 'Sarah Wilson',
                date: '2025-09-03',
                category: 'Food',
                participants: ['You', 'Sarah Wilson', 'Mike Chen', 'Jane Doe'],
                receipt: 'groceries-sep-03.jpg',
                splitType: 'equal'
            },
            {
                id: 3,
                description: 'Internet Bill - Airtel Fiber',
                amount: 1999,
                paidBy: 'Mike Chen',
                date: '2025-09-01',
                category: 'Utilities',
                participants: ['You', 'Sarah Wilson', 'Mike Chen', 'Jane Doe'],
                receipt: null,
                splitType: 'equal'
            },
            {
                id: 4,
                description: 'Cleaning Supplies',
                amount: 850,
                paidBy: 'Jane Doe',
                date: '2025-08-30',
                category: 'Household',
                participants: ['You', 'Sarah Wilson', 'Mike Chen', 'Jane Doe'],
                receipt: null,
                splitType: 'equal'
            },
            {
                id: 5,
                description: 'Gas Cylinder Refill',
                amount: 950,
                paidBy: 'You',
                date: '2025-08-28',
                category: 'Utilities',
                participants: ['You', 'Sarah Wilson', 'Mike Chen', 'Jane Doe'],
                receipt: 'gas-cylinder-aug.jpg',
                splitType: 'equal'
            }
        ],
        recentActivity: [
            { type: 'expense_added', description: 'Electricity Bill added', time: '2 hours ago', by: 'You' },
            { type: 'expense_added', description: 'Groceries added', time: '4 days ago', by: 'Sarah Wilson' },
            { type: 'payment_made', description: 'Mike paid ₹500 to You', time: '1 week ago', by: 'Mike Chen' }
        ]
    },
    '2': {
        id: '2',
        name: 'Goa Trip 2025 🏖️',
        description: 'Epic beach vacation with the squad',
        members: [
            {
                name: 'You',
                id: 'you',
                balance: 0,
                avatar: 'Y',
                email: 'you@example.com',
                joinedAt: '2025-07-20'
            },
            {
                name: 'Rahul Sharma',
                id: 'rahul',
                balance: 0,
                avatar: 'RS',
                email: 'rahul@example.com',
                joinedAt: '2025-07-20'
            },
            {
                name: 'Priya Patel',
                id: 'priya',
                balance: 0,
                avatar: 'PP',
                email: 'priya@example.com',
                joinedAt: '2025-07-20'
            },
            {
                name: 'Arjun Singh',
                id: 'arjun',
                balance: 0,
                avatar: 'AS',
                email: 'arjun@example.com',
                joinedAt: '2025-07-22'
            },
            {
                name: 'Nisha Gupta',
                id: 'nisha',
                balance: 0,
                avatar: 'NG',
                email: 'nisha@example.com',
                joinedAt: '2025-07-22'
            }
        ],
        totalExpenses: 85000,
        yourShare: 17000,
        monthlyBudget: 0,
        createdAt: '2025-07-20',
        status: 'settled',
        currency: '₹',
        category: 'Travel',
        expenses: [
            {
                id: 1,
                description: 'Beach Resort - 4 Nights Stay',
                amount: 40000,
                paidBy: 'You',
                date: '2025-08-25',
                category: 'Accommodation',
                participants: ['You', 'Rahul Sharma', 'Priya Patel', 'Arjun Singh', 'Nisha Gupta'],
                receipt: 'resort-booking.pdf',
                splitType: 'equal'
            },
            {
                id: 2,
                description: 'Round Trip Flights',
                amount: 30000,
                paidBy: 'Rahul Sharma',
                date: '2025-08-22',
                category: 'Transport',
                participants: ['You', 'Rahul Sharma', 'Priya Patel', 'Arjun Singh', 'Nisha Gupta'],
                receipt: 'flight-tickets.pdf',
                splitType: 'equal'
            },
            {
                id: 3,
                description: 'Food & Drinks - Beach Shacks',
                amount: 15000,
                paidBy: 'Priya Patel',
                date: '2025-08-26',
                category: 'Food',
                participants: ['You', 'Rahul Sharma', 'Priya Patel', 'Arjun Singh', 'Nisha Gupta'],
                receipt: null,
                splitType: 'equal'
            }
        ],
        recentActivity: [
            { type: 'group_settled', description: 'All expenses settled', time: '2 weeks ago', by: 'System' },
            { type: 'expense_added', description: 'Beach food expenses added', time: '3 weeks ago', by: 'Priya Patel' }
        ]
    }
};

interface GroupPageProps {
    params: {
        id: string;
    };
}

function MemberBalanceCard({ member, currency }: { member: any; currency: string }) {
    const isPositive = member.balance > 0;
    const isZero = member.balance === 0;

    return (
        <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {member.avatar}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.name === 'You' && <Pill variant="secondary" className="text-xs">You</Pill>}
                    </div>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
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
                        {isPositive ? '+' : ''}{currency}{Math.abs(member.balance).toLocaleString()}
                    </div>
                )}
                <p className="text-xs text-muted-foreground">
                    {isZero ? 'All settled' : isPositive ? 'Gets back' : 'Owes'}
                </p>
            </div>
        </div>
    );
}

function ExpenseCard({ expense, currency }: { expense: any; currency: string }) {
    const shareAmount = (expense.amount / expense.participants.length).toFixed(0);

    return (
        <Card className="mb-3 hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{expense.description}</h4>
                            <Pill variant="outline" className="text-xs">{expense.category}</Pill>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Paid by <span className="font-medium text-foreground">{expense.paidBy}</span></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {new Date(expense.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{currency}{expense.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                            {currency}{shareAmount} per person
                        </p>
                    </div>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                        Split among {expense.participants.length} people
                        {expense.splitType && (
                            <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {expense.splitType}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {expense.receipt && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                <ReceiptIcon className="h-3 w-3 mr-1" />
                                Receipt
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreVerticalIcon className="h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-xs">
                                    <EditIcon className="h-3 w-3 mr-2" />
                                    Edit Expense
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">
                                    <ShareIcon className="h-3 w-3 mr-2" />
                                    Share Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-xs text-red-600">
                                    <TrashIcon className="h-3 w-3 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ActivityCard({ activity }: { activity: any }) {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'expense_added':
                return <PlusIcon className="h-3 w-3 text-blue-600" />;
            case 'payment_made':
                return <SendIcon className="h-3 w-3 text-green-600" />;
            case 'group_settled':
                return <CheckCircleIcon className="h-3 w-3 text-green-600" />;
            default:
                return <AlertCircleIcon className="h-3 w-3 text-gray-600" />;
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time} • by {activity.by}</p>
            </div>
        </div>
    );
}

export default async function GroupPage({ params }: GroupPageProps) {
    const resolvedParams = await params;
    const group = mockGroupsData[resolvedParams.id as keyof typeof mockGroupsData];

    if (!group) {
        notFound();
    }

    const totalBalance = group.members.reduce((sum, member) => sum + Math.abs(member.balance), 0);
    const budgetUsed = group.monthlyBudget ? (group.totalExpenses / group.monthlyBudget) * 100 : 0;

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Link href="/groups">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ArrowLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl font-bold tracking-tight">{group.name}</h2>
                                <Pill variant={group.status === 'active' ? 'default' : 'secondary'}>
                                    <PillIndicator variant={group.status === 'active' ? 'success' : 'info'} pulse={group.status === 'active'} />
                                    {group.status}
                                </Pill>
                            </div>
                            <p className="text-muted-foreground">{group.description}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span>Created on {new Date(group.createdAt).toLocaleDateString('en-IN')}</span>
                                <span>•</span>
                                <span>{group.category} group</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <ShareIcon className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SettingsIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <EditIcon className="h-4 w-4 mr-2" />
                                Edit Group
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <UsersIcon className="h-4 w-4 mr-2" />
                                Manage Members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete Group
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{group.currency}{group.totalExpenses.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {group.expenses.length} transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Your Share</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{group.currency}{group.yourShare.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {((group.yourShare / group.totalExpenses) * 100).toFixed(1)}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Members</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{group.members.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Active participants
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {group.status === 'settled' ? 'Status' : 'Unsettled'}
                        </CardTitle>
                        <AlertCircleIcon className={`h-4 w-4 ${group.status === 'settled' ? 'text-green-600' : 'text-orange-600'}`} />
                    </CardHeader>
                    <CardContent>
                        {group.status === 'settled' ? (
                            <>
                                <div className="text-2xl font-bold text-green-600">✓ Settled</div>
                                <p className="text-xs text-muted-foreground">All cleared</p>
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-orange-600">{group.currency}{totalBalance.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Pending amount</p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Budget Progress (if applicable) */}
            {group.monthlyBudget > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                                {group.currency}{group.totalExpenses.toLocaleString()} of {group.currency}{group.monthlyBudget.toLocaleString()}
                            </span>
                            <span className="text-sm font-medium flex items-center gap-1">
                                {budgetUsed.toFixed(1)}%
                                <PillDelta delta={budgetUsed - 50} />
                            </span>
                        </div>
                        <Progress value={Math.min(budgetUsed, 100)} className="h-2" />
                    </CardContent>
                </Card>
            )}

            {/* Main Content Tabs */}
            <Tabs defaultValue="expenses" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="balances">Balances</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="expenses" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Expense History</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Filter</Button>
                            <Button variant="outline" size="sm">
                                <DownloadIcon className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <Suspense fallback={<div className="flex justify-center p-8">Loading expenses...</div>}>
                        <div className="space-y-3">
                            {group.expenses.length > 0 ? (
                                group.expenses.map((expense) => (
                                    <ExpenseCard key={expense.id} expense={expense} currency={group.currency} />
                                ))
                            ) : (
                                <Card className="p-12 text-center">
                                    <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No expenses yet</h3>
                                    <p className="text-muted-foreground mb-4">Add your first expense to get started</p>
                                    <Button>
                                        <PlusIcon className="h-4 w-4 mr-2" />
                                        Add Expense
                                    </Button>
                                </Card>
                            )}
                        </div>
                    </Suspense>
                </TabsContent>

                <TabsContent value="balances" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Member Balances</h3>
                        {group.status === 'active' && totalBalance > 0 && (
                            <Pill variant="outline" className="text-orange-600 border-orange-200">
                                <PillIndicator variant="warning" pulse />
                                Pending Settlement
                            </Pill>
                        )}
                    </div>

                    <div className="space-y-3">
                        {group.members.map((member) => (
                            <MemberBalanceCard key={member.id} member={member} currency={group.currency} />
                        ))}
                    </div>

                    {group.status === 'active' && totalBalance > 0 && (
                        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <AlertCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                            Settlement Needed
                                        </h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                                            Total unsettled amount: {group.currency}{totalBalance.toLocaleString()}
                                        </p>
                                        <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-100">
                                            <SendIcon className="h-4 w-4 mr-2" />
                                            Send Settlement Reminder
                                        </Button>
                                    </div>
                                </div>
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

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {group.members.map((member) => (
                            <Card key={member.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {member.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium">{member.name}</p>
                                                {member.name === 'You' && (
                                                    <Pill variant="secondary" className="text-xs">You</Pill>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Joined:</span>
                                            <span>{new Date(member.joinedAt).toLocaleDateString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Balance:</span>
                                            <span className={member.balance === 0 ? 'text-green-600' : member.balance > 0 ? 'text-green-600' : 'text-red-600'}>
                                                {member.balance === 0 ? 'Settled' : `${member.balance > 0 ? '+' : ''}${group.currency}${Math.abs(member.balance)}`}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>

                    <div className="space-y-3">
                        {group.recentActivity.map((activity, index) => (
                            <ActivityCard key={index} activity={activity} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
