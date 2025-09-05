"use client";

import { useState } from 'react';
import { ExpensesList } from '@/components/splitmate/expenses-list';
import { GroupsList } from '@/components/splitmate/groups-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupeeIcon, UsersIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';

export function SplitMateDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">SplitMate Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your expenses and groups</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,240</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">You Owe</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹420</div>
                        <p className="text-xs text-muted-foreground">To 3 people</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Owed to You</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground rotate-180" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹820</div>
                        <p className="text-xs text-muted-foreground">From 5 people</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Groups</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Active groups</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs for Expenses and Groups */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <ExpensesList />
                        </div>
                        <div>
                            <GroupsList />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="expenses">
                    <ExpensesList />
                </TabsContent>

                <TabsContent value="groups">
                    <GroupsList />
                </TabsContent>
            </Tabs>
        </div>
    );
}