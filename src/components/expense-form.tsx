'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  PlusIcon, 
  UsersIcon, 
  ReceiptIcon,
  CreditCardIcon,
  WifiIcon,
  WifiOffIcon,
 RefreshCwIcon as SyncIcon,
  CheckCircleIcon
} from "lucide-react";
import { useOfflineExpenseSync } from '@/hooks/useOfflineExpenseSync';
import { offlineExpenseService } from '@/lib/offline-expense-service';
import { apiService } from '@/services/api.service';
import { CreateExpenseData } from '@/types/api';

interface ExpenseFormProps {
  onExpenseAdded?: () => void;
}

export function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const { isOnline, syncProgress, pendingExpensesCount, triggerSync } = useOfflineExpenseSync();
 const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [groupId, setGroupId] = useState('');
  const [paidById, setPaidById] = useState('user-1'); // Mock user ID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Mock groups and categories data
  const groups = [
    { id: 'goa-trip', name: '🏖️ Goa Trip 2024' },
    { id: 'roommates', name: '🏠 Roommates' },
    { id: 'office', name: '💼 Office Team' }
  ];

  const categories = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'other', label: 'Other' }
  ];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate required fields
      if (!amount || !category || !description || !groupId) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare expense data
      const expenseData: CreateExpenseData = {
        groupId,
        name: description,
        description: notes,
        amount: parseFloat(amount),
        currency: '₹',
        category,
        paidById,
        splitType: 'equal',
        expenseDate: new Date().toISOString(),
        participants: [
          { userId: 'user-1', shareAmount: parseFloat(amount) / 2 },
          { userId: 'user-2', shareAmount: parseFloat(amount) / 2 }
        ]
      };

      // Check if expense already exists (to prevent duplicates)
      const exists = await offlineExpenseService.expenseExists(expenseData);
      if (exists) {
        throw new Error('This expense appears to have already been added');
      }

      if (isOnline) {
        // Online: Send directly to server
        const response = await apiService.createExpense(expenseData);
        
        if (response.success) {
          setSubmitMessage('Expense added successfully!');
          resetForm();
          onExpenseAdded?.();
        } else {
          throw new Error(response.error || 'Failed to add expense');
        }
      } else {
        // Offline: Store in IndexedDB
        await offlineExpenseService.addExpense(expenseData);
        setSubmitMessage('Expense saved offline. It will be synced when you\'re back online.');
        resetForm();
        onExpenseAdded?.();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      setSubmitMessage(`Error: ${error instanceof Error ? error.message : 'Failed to add expense'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setNotes('');
    setGroupId('');
  };

  // Trigger manual sync
  const handleSync = () => {
    if (isOnline) {
      triggerSync();
    }
  };

  return (
    <div className="space-y-6">
      {/* Offline Status Banner */}
      <div className={`p-3 rounded-lg flex items-center justify-between ${
        isOnline ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        <div className="flex items-center">
          {isOnline ? (
            <>
              <WifiIcon className="h-4 w-4 mr-2" />
              <span>Online</span>
            </>
          ) : (
            <>
              <WifiOffIcon className="h-4 w-4 mr-2" />
              <span>Offline - Expenses will be saved locally</span>
            </>
          )}
        </div>
        {!isOnline && pendingExpensesCount > 0 && (
          <div className="flex items-center">
            <span className="mr-2">{pendingExpensesCount} pending</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSync}
              disabled={syncProgress.status === 'syncing'}
            >
              {syncProgress.status === 'syncing' ? (
                <>
                  <SyncIcon className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <SyncIcon className="h-4 w-4 mr-2" />
                  Sync
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Sync Progress */}
      {syncProgress.status === 'syncing' && (
        <div className="p-3 rounded-lg bg-blue-100 text-blue-800">
          <div className="flex items-center">
            <SyncIcon className="h-4 w-4 mr-2 animate-spin" />
            <span>Syncing expenses... {syncProgress.processed}/{syncProgress.total}</span>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`p-3 rounded-lg flex items-center ${
          submitMessage.startsWith('Error') 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {submitMessage.startsWith('Error') ? null : <CheckCircleIcon className="h-4 w-4 mr-2" />}
          <span>{submitMessage}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ReceiptIcon className="h-5 w-5" />
            Add New Expense
          </CardTitle>
          <CardDescription>Split expenses with your friends and groups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input 
                  id="amount" 
                  placeholder="0.00" 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input 
                id="description" 
                placeholder="What was this expense for?" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="Additional details..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Group Selection */}
            <div className="space-y-2">
              <Label>Split with Group *</Label>
              <Select value={groupId} onValueChange={setGroupId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Paid by</Label>
              <div className="flex items-center space-x-4">
                <Button 
                  variant={paidById === 'user-1' ? 'default' : 'outline'} 
                  size="sm" 
                  type="button"
                  onClick={() => setPaidById('user-1')}
                >
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  You
                </Button>
                <Button 
                  variant={paidById === 'user-2' ? 'default' : 'ghost'} 
                  size="sm" 
                  type="button"
                  onClick={() => setPaidById('user-2')}
                >
                  Someone else
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                className="flex-1" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <SyncIcon className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {isOnline ? 'Add Expense' : 'Save Offline'}
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
          <CardDescription>Common expense scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ReceiptIcon className="h-5 w-5" />
              <span className="text-sm">Restaurant</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCardIcon className="h-5 w-5" />
              <span className="text-sm">Transportation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UsersIcon className="h-5 w-5" />
              <span className="text-sm">Group Activity</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <PlusIcon className="h-5 w-5" />
              <span className="text-sm">Custom</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}