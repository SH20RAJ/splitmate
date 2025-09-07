'use client';

import React, { useState } from 'react';
import { useUserGroups, useGroupExpenses, useCreateExpense, useSettlementSuggestions } from '@/hooks/useApi';
import { CreateExpenseData } from '@/types/api';
import { Button } from '@/components/ui/button';

interface SplitMateIntegrationProps {
  userId: string;
  userEmail: string;
}

export function SplitMateIntegration({ userId, userEmail }: SplitMateIntegrationProps) {
  const { data: groups, loading: groupsLoading, error: groupsError, refetch: refetchGroups } = useUserGroups(userId);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  
  // Get expenses for selected group
  const { data: expenses, loading: expensesLoading, refetch: refetchExpenses } = useGroupExpenses(selectedGroupId);
  
  // Get settlement suggestions for selected group
  const { data: settlements, loading: settlementsLoading } = useSettlementSuggestions(selectedGroupId);
  
  // Create expense mutation
  const { createExpense, loading: creatingExpense, error: createError } = useCreateExpense();

  const handleCreateExpense = async () => {
    if (!selectedGroupId) return;

    const expenseData: CreateExpenseData = {
      groupId: selectedGroupId,
      name: 'Test Expense',
      description: 'A test expense created from the frontend',
      amount: 100,
      currency: 'INR',
      category: 'food',
      paidById: userId,
      splitType: 'equal',
      expenseDate: new Date().toISOString(),
      participants: [
        {
          userId: userId,
          shareAmount: 100,
        }
      ]
    };

    try {
      await createExpense(expenseData);
      refetchExpenses();
      alert('Expense created successfully!');
    } catch (error) {
      console.error('Failed to create expense:', error);
    }
  };

  if (groupsLoading) {
    return <div className="p-6">Loading groups...</div>;
  }

  if (groupsError) {
    return <div className="p-6 text-red-500">Error loading groups: {groupsError}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">SplitMate Backend Integration</h1>
        <p className="text-gray-600">Welcome back, {userEmail}!</p>
        <p className="text-sm text-gray-500 mt-2">This component demonstrates the complete MongoDB backend integration with the frontend.</p>
      </div>

      {/* Groups Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Groups</h2>
        {!groups || groups.length === 0 ? (
          <p className="text-gray-500">You haven&apos;t joined any groups yet.</p>
        ) : (
          <div className="space-y-2">
            {groups.map((group) => (
              <div
                key={group._id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedGroupId === group._id
                    ? 'bg-purple-50 border-purple-300'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedGroupId(group._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <p className="text-xs text-gray-500">
                      Role: {group.role} | Balance: ₹{group.balance || 0}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {group.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Group Details */}
      {selectedGroupId && (
        <>
          {/* Expenses Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Group Expenses</h2>
              <Button
                onClick={handleCreateExpense}
                disabled={creatingExpense}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {creatingExpense ? 'Creating...' : 'Add Test Expense'}
              </Button>
            </div>
            
            {createError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                Error creating expense: {createError}
              </div>
            )}

            {expensesLoading ? (
              <p className="text-gray-500">Loading expenses...</p>
            ) : !expenses || expenses.length === 0 ? (
              <p className="text-gray-500">No expenses found for this group.</p>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div key={expense._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{expense.name}</h3>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                        <p className="text-xs text-gray-500">
                          Paid by: {expense.paidById.displayName || expense.paidById.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Date: {new Date(expense.expenseDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{expense.amount}</p>
                        <p className="text-xs text-gray-500">{expense.category}</p>
                        <p className={`text-xs px-2 py-1 rounded ${
                          expense.status === 'settled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {expense.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settlements Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Settlement Suggestions</h2>
            {settlementsLoading ? (
              <p className="text-gray-500">Loading settlement suggestions...</p>
            ) : !settlements || settlements.length === 0 ? (
              <p className="text-green-600">🎉 All settled up! No payments needed.</p>
            ) : (
              <div className="space-y-3">
                {settlements.map((settlement, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {settlement.fromUser.displayName || settlement.fromUser.email}
                        </p>
                        <p className="text-sm text-gray-600">should pay</p>
                        <p className="font-medium text-gray-900">
                          {settlement.toUser.displayName || settlement.toUser.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">₹{settlement.amount}</p>
                        <p className="text-xs text-gray-500">{settlement.currency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
