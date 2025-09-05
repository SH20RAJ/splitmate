"use client";

import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianRupeeIcon, QrCodeIcon } from 'lucide-react';

export function QrGenerator() {
  const { generateQrCode, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [upiLink, setUpiLink] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!amount) {
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    const result = await generateQrCode({
      amount: amountNum,
      description: description || undefined,
    });

    if (result) {
      setQrCode(result.qrCode);
      setUpiLink(result.upiLink);
    }
  };

  const handleShare = async () => {
    if (!upiLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SplitMate Payment Request',
          text: `Please pay ₹${amount} for ${description || 'shared expense'}`,
          url: upiLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying the link
      try {
        await navigator.clipboard.writeText(upiLink);
        alert('UPI link copied to clipboard!');
      } catch (err) {
        console.error('Error copying link:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="h-5 w-5" />
          Generate Payment QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <div className="relative">
            <IndianRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            type="text"
            placeholder="e.g., Dinner at restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || !amount}
          className="w-full"
        >
          {isLoading ? 'Generating...' : 'Generate QR Code'}
        </Button>

        {qrCode && (
          <div className="space-y-4 pt-4">
            <div className="flex flex-col items-center">
              <img 
                src={qrCode} 
                alt="UPI Payment QR Code" 
                className="w-48 h-48 object-contain p-2 border rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">
                Scan this QR code to pay ₹{amount}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => {
                  if (upiLink) {
                    window.open(upiLink, '_blank');
                  }
                }}
              >
                Pay with UPI App
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}