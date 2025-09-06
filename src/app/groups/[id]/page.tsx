"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Users, Receipt, DollarSign } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import Link from "next/link";

const mockGroupData = {
  id: 1,
  name: "Goa Trip 2024",
  type: "Trip",
  members: [
    { id: 1, name: "You", balance: 1200, avatar: "👤" },
    { id: 2, name: "Rahul", balance: -400, avatar: "👨" },
    { id: 3, name: "Priya", balance: -500, avatar: "👩" },
    { id: 4, name: "Amit", balance: -300, avatar: "👨‍💼" },
  ],
  expenses: [
    { id: 1, description: "Hotel booking", amount: 8000, paidBy: "You", date: "2 hours ago" },
    { id: 2, description: "Flight tickets", amount: 12000, paidBy: "Rahul", date: "1 day ago" },
    { id: 3, description: "Dinner at beach", amount: 1500, paidBy: "Priya", date: "2 days ago" },
  ],
};

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [activeTab, setActiveTab] = useState<"expenses" | "members">("expenses");

  return (
    <div className="min-h-screen nm pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b">
          <div className="flex items-center space-x-4">
            <Link href="/groups">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {mockGroupData.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mockGroupData.members.length} members
              </p>
            </div>
            <Button onClick={() => setShowAddExpense(true)} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="p-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Group Spending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{mockGroupData.expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white dark:bg-gray-800">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === "expenses"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-400"
              }`}
          >
            <Receipt className="h-4 w-4 inline mr-2" />
            Expenses
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === "members"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-400"
              }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Members
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {activeTab === "expenses" && (
            <>
              {mockGroupData.expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {expense.description}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Paid by {expense.paidBy} • {expense.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{expense.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {activeTab === "members" && (
            <>
              {mockGroupData.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{member.avatar}</div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${member.balance >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                          }`}>
                          {member.balance >= 0 ? "+" : ""}₹{Math.abs(member.balance)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {member.balance >= 0 ? "gets back" : "owes"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Add Expense</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  className="w-full p-3 border rounded-lg"
                />
                <select className="w-full p-3 border rounded-lg">
                  <option>Paid by You</option>
                  <option>Paid by Rahul</option>
                  <option>Paid by Priya</option>
                  <option>Paid by Amit</option>
                </select>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddExpense(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowAddExpense(false);
                      // Add success toast here
                    }}
                  >
                    Add Expense
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
