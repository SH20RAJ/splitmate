"use client";

import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianRupeeIcon, UsersIcon, CalculatorIcon } from 'lucide-react';

// Define types for our data
interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

export function BillSplitter() {
  const { splitBill, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState(['', '', '']);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    if (participants.length > 2) {
      const newParticipants = [...participants];
      newParticipants.splice(index, 1);
      setParticipants(newParticipants);
    }
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleSplit = async () => {
    if (!amount || !description) {
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    // Filter out empty participants
    const validParticipants = participants.filter(p => p.trim() !== '');
    
    if (validParticipants.length === 0) {
      return;
    }

    const result = await splitBill({
      amount: amountNum,
      description,
      participants: validParticipants,
    });

    if (result) {
      setSplitResult(result);
    }
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setParticipants(['', '', '']);
    setSplitResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5" />
          Split a Bill
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {splitResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold">Split Result</h3>
              <p className="text-gray-600 mt-1">{splitResult.description}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg">₹{splitResult.totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-green-200 pt-2">
                <h4 className="font-medium mb-2">Equal Split:</h4>
                <div className="space-y-2">
                  {splitResult.splits.map((split, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{split.person}</span>
                      <span className="font-medium">₹{split.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Split Another Bill
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <div className="relative">
                  <IndianRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter total amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="e.g., Pizza dinner"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Participants
              </Label>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={`Participant ${index + 1}`}
                      value={participant}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                    />
                    {participants.length > 2 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveParticipant(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={handleAddParticipant}
                className="w-full"
              >
                Add Participant
              </Button>
            </div>
            
            <Button 
              onClick={handleSplit} 
              disabled={isLoading || !amount || !description}
              className="w-full"
            >
              {isLoading ? 'Splitting...' : 'Split Bill Equally'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}