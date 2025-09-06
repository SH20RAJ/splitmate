"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Users, Calculator, Check } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { AppContainer } from "@/components/app-container";

const mockGroups = [
  { id: 1, name: "Goa Trip 2024", members: 4 },
  { id: 2, name: "Apartment 3B", members: 3 },
  { id: 3, name: "Office Lunch", members: 8 },
];

const mockFriends = [
  { id: 1, name: "Rahul", avatar: "👨" },
  { id: 2, name: "Priya", avatar: "👩" },
  { id: 3, name: "Amit", avatar: "👨‍💼" },
  { id: 4, name: "Sneha", avatar: "👩‍💻" },
];

export default function AddExpensePage() {
  const [step, setStep] = useState(1);
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    paidBy: "You",
    splitWith: [] as number[],
    group: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    // Handle expense submission
    setStep(4); // Success step
    setTimeout(() => {
      setStep(1);
      setExpenseData({
        description: "",
        amount: "",
        paidBy: "You",
        splitWith: [],
        group: "",
      });
    }, 2000);
  };

  if (step === 4) {
    return (
      <>
        <AppContainer className="flex items-center justify-center min-h-screen pb-20">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Expense Added!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your expense has been split successfully
            </p>
          </div>
        </AppContainer>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <AppContainer>
        <div className="pb-20">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Step {step} of 3
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round((step / 3) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 mr-2" />
                  Expense Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    placeholder="What was this expense for?"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="₹0.00"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Paid by</label>
                  <select
                    value={expenseData.paidBy}
                    onChange={(e) => setExpenseData({ ...expenseData, paidBy: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option>You</option>
                    {mockFriends.map(friend => (
                      <option key={friend.id} value={friend.name}>{friend.name}</option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={handleNext}
                  className="w-full"
                  disabled={!expenseData.description || !expenseData.amount}
                >
                  Next
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Split With */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Split With
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Group (Optional)</label>
                  <select
                    value={expenseData.group}
                    onChange={(e) => setExpenseData({ ...expenseData, group: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">No group</option>
                    {mockGroups.map(group => (
                      <option key={group.id} value={group.name}>{group.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Friends</label>
                  <div className="space-y-2">
                    {mockFriends.map(friend => (
                      <label key={friend.id} className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <input
                          type="checkbox"
                          checked={expenseData.splitWith.includes(friend.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setExpenseData({
                                ...expenseData,
                                splitWith: [...expenseData.splitWith, friend.id]
                              });
                            } else {
                              setExpenseData({
                                ...expenseData,
                                splitWith: expenseData.splitWith.filter(id => id !== friend.id)
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-xl">{friend.avatar}</span>
                        <span className="font-medium">{friend.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full"
                  disabled={expenseData.splitWith.length === 0}
                >
                  Next
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Review & Split
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{expenseData.description}</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{expenseData.amount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Paid by {expenseData.paidBy}
                  </p>
                  {expenseData.group && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Group: {expenseData.group}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Split Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>You</span>
                      <span className="font-medium">
                        ₹{Math.round(Number(expenseData.amount) / (expenseData.splitWith.length + 1))}
                      </span>
                    </div>
                    {expenseData.splitWith.map(friendId => {
                      const friend = mockFriends.find(f => f.id === friendId);
                      return (
                        <div key={friendId} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span>{friend?.name}</span>
                          <span className="font-medium">
                            ₹{Math.round(Number(expenseData.amount) / (expenseData.splitWith.length + 1))}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  Split Expense
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </AppContainer>
      <BottomNav />
    </>
  );
}