"use client";

import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  IndianRupeeIcon, 
  UsersIcon, 
  QrCodeIcon, 
  MessageCircleIcon,
  PlusIcon,
  MinusIcon,
  CopyIcon,
  CheckIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

interface QrResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: { title: string; text: string; url: string };
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

export function ManualExpenseManager() {
  const { 
    splitBill, 
    generateQrCode, 
    sendReminder, 
    getExpenses, 
    getGroups,
    isLoading, 
    error 
  } = useSplitMate();
  
  // State for form inputs
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  const [participants, setParticipants] = useState(['']);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  
  // State for results
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [qrResult, setQrResult] = useState<QrResult | null>(null);
  const [reminderResult, setReminderResult] = useState<ReminderResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // State for existing data
  const [expenses, setExpenses] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  
  // Load existing data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const expensesData = await getExpenses();
      const groupsData = await getGroups();
      
      if (expensesData) setExpenses(expensesData);
      if (groupsData) setGroups(groupsData);
    };
    
    fetchData();
  }, [getExpenses, getGroups]);
  
  // Handle adding a new participant field
  const addParticipant = () => {
    setParticipants([...participants, '']);
  };
  
  // Handle removing a participant field
  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = [...participants];
      newParticipants.splice(index, 1);
      setParticipants(newParticipants);
    }
  };
  
  // Handle changing a participant value
  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };
  
  // Handle splitting bill
  const handleSplitBill = async () => {
    if (!amount || !description || participants.some(p => !p)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const splitData = {
      amount: parseFloat(amount),
      description,
      participants
    };
    
    const result = await splitBill(splitData);
    if (result) {
      setSplitResult(result);
      toast.success('Bill split successfully!');
    } else {
      toast.error('Failed to split bill');
    }
  };
  
  // Handle generating QR code
  const handleGenerateQr = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }
    
    const qrData = {
      amount: parseFloat(amount),
      description: description || `Payment for ₹${amount}`,
      upiId: "user@upi" // In a real app, this would be the user's UPI ID
    };
    
    const result = await generateQrCode(qrData);
    if (result) {
      setQrResult(result);
      toast.success('QR code generated successfully!');
    } else {
      toast.error('Failed to generate QR code');
    }
  };
  
  // Handle sending reminder
  const handleSendReminder = async () => {
    if (!amount || !description || !recipientName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const reminderData = {
      amount: parseFloat(amount),
      description,
      recipientName,
      recipientPhone: recipientPhone || undefined,
      upiId: "user@upi" // In a real app, this would be the user's UPI ID
    };
    
    const result = await sendReminder(reminderData);
    if (result) {
      setReminderResult(result);
      toast.success('Reminder sent successfully!');
    } else {
      toast.error('Failed to send reminder');
    }
  };
  
  // Handle copying UPI link to clipboard
  const copyUpiLink = () => {
    if (qrResult?.upiLink) {
      navigator.clipboard.writeText(qrResult.upiLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success('UPI link copied to clipboard!');
    }
  };
  
  // Handle paying with UPI app
  const payWithUpi = () => {
    if (qrResult?.upiLink) {
      window.open(qrResult.upiLink, '_blank');
    }
  };
  
  // Handle sharing via Web Share API
  const shareViaWebShare = async () => {
    if (reminderResult?.webShareData && navigator.share) {
      try {
        await navigator.share({
          title: reminderResult.webShareData.title,
          text: reminderResult.webShareData.text,
          url: reminderResult.webShareData.url,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        toast.error('Failed to share');
      }
    } else {
      toast.error('Web Share API not supported');
    }
  };
  
  // Handle sharing via WhatsApp
  const shareViaWhatsApp = () => {
    if (reminderResult?.whatsappLink) {
      window.open(reminderResult.whatsappLink, '_blank');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manual Expense Manager</h1>
        <p className="text-gray-600 mt-2">
          Manage your expenses manually without using the chatbot
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Split Bill Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupeeIcon className="h-5 w-5" />
                Split a Bill
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description (e.g., Dinner at restaurant)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Participants *</Label>
                {participants.map((participant, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={`Participant ${index + 1}`}
                      value={participant}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                    />
                    {participants.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeParticipant(index)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParticipant}
                  className="mt-2"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>
              </div>
              
              <Button onClick={handleSplitBill} disabled={isLoading}>
                {isLoading ? 'Splitting...' : 'Split Bill'}
              </Button>
            </CardContent>
          </Card>
          
          {/* QR Code Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCodeIcon className="h-5 w-5" />
                Generate Payment QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qrAmount">Amount *</Label>
                  <Input
                    id="qrAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="qrDescription">Description</Label>
                  <Input
                    id="qrDescription"
                    type="text"
                    placeholder="Payment description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={handleGenerateQr} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </Button>
            </CardContent>
          </Card>
          
          {/* Send Reminder Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="h-5 w-5" />
                Send Payment Reminder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderAmount">Amount *</Label>
                  <Input
                    id="reminderAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    type="text"
                    placeholder="Enter recipient name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
              
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminderDescription">Description *</Label>
                <Textarea
                  id="reminderDescription"
                  placeholder="Enter description (e.g., Pizza delivery)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Recipient Phone (Optional)</Label>
                <Input
                  id="recipientPhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                />
              </div>
              
              <Button onClick={handleSendReminder} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reminder'}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Results */}
        <div className="space-y-8">
          {/* Split Result */}
          {splitResult && (
            <Card>
              <CardHeader>
                <CardTitle>Split Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-lg font-bold">₹{splitResult.totalAmount}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Split Among:</h4>
                    {splitResult.splits.map((split, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4" />
                          <span>{split.person}</span>
                        </div>
                        <span className="font-medium">₹{split.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* QR Code Result */}
          {qrResult && (
            <Card>
              <CardHeader>
                <CardTitle>Payment QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <img 
                      src={qrResult.qrCode} 
                      alt="UPI Payment QR Code" 
                      className="w-48 h-48 object-contain p-2 border rounded-lg"
                    />
                    
                    <div className="mt-4 text-center">
                      <p className="font-semibold">Amount: ₹{qrResult.amount}</p>
                      <p className="text-sm text-gray-600">Scan to pay</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={payWithUpi}
                    >
                      Pay with UPI App
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={copyUpiLink}
                    >
                      {isCopied ? (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <CopyIcon className="h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Reminder Result */}
          {reminderResult && (
            <Card>
              <CardHeader>
                <CardTitle>Reminder Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold">Amount: ₹{reminderResult.amount}</p>
                    <p className="text-sm text-gray-600">{reminderResult.description}</p>
                    <p className="text-sm text-gray-600">To: {reminderResult.recipientName}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={shareViaWhatsApp}
                    >
                      Share via WhatsApp
                    </Button>
                    
                    {'share' in navigator && (
                      <Button
                        variant="outline"
                        onClick={shareViaWebShare}
                      >
                        Share
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No expenses found</p>
              ) : (
                <div className="space-y-3">
                  {expenses.slice(0, 3).map((expense: any) => (
                    <div key={expense.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">{expense.description}</span>
                        <span className="font-bold text-green-600">₹{expense.amount}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Badge variant="secondary" className="mr-2">
                          {expense.category}
                        </Badge>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                        <div className="flex -space-x-2">
                          {expense.participants.slice(0, 3).map((participant: string, index: number) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-white">
                              <AvatarFallback className="text-xs">
                                {participant.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {expense.participants.length > 3 && (
                            <Avatar className="h-6 w-6 border-2 border-white">
                              <AvatarFallback className="text-xs bg-gray-200">
                                +{expense.participants.length - 3}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}