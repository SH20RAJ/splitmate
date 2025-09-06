"use client";
export const runtime = 'edge';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Trash2, 
  Users, 
  TrendingUp, 
  TrendingDown,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { AppContainer } from "@/components/app-container";
import { BottomNav } from "@/components/bottom-nav";

interface Friend {
  id: string;
  name: string;
  email: string;
  balance: number; // positive = they owe you, negative = you owe them
  phone?: string;
}

interface Circle {
  id: string;
  name: string;
  members: string[];
  emoji: string;
}

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Rahul Sharma", email: "rahul@example.com", balance: 850, phone: "+91 98765 43210" },
    { id: "2", name: "Priya Patel", email: "priya@example.com", balance: -420 },
    { id: "3", name: "Amit Kumar", email: "amit@example.com", balance: 300 },
    { id: "4", name: "Meera Singh", email: "meera@example.com", balance: -150 },
    { id: "5", name: "Arjun Reddy", email: "arjun@example.com", balance: 0 },
  ]);

  const [circles, setCircles] = useState<Circle[]>([
    { id: "1", name: "College Friends", members: ["1", "2", "3"], emoji: "🎓" },
    { id: "2", name: "Work Buddies", members: ["4", "5"], emoji: "💼" },
    { id: "3", name: "Travel Squad", members: ["1", "3", "5"], emoji: "✈️" },
  ]);

  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const [newCircleName, setNewCircleName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const addFriend = () => {
    if (newFriendName.trim() && newFriendEmail.trim()) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: newFriendName.trim(),
        email: newFriendEmail.trim(),
        balance: 0
      };
      setFriends([...friends, newFriend]);
      setNewFriendName("");
      setNewFriendEmail("");
    }
  };

  const deleteFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
    setCircles(circles.map(c => ({
      ...c,
      members: c.members.filter(m => m !== id)
    })));
  };

  const createCircle = () => {
    if (newCircleName.trim() && selectedMembers.length > 0) {
      const newCircle: Circle = {
        id: Date.now().toString(),
        name: newCircleName.trim(),
        members: selectedMembers,
        emoji: "👥"
      };
      setCircles([...circles, newCircle]);
      setNewCircleName("");
      setSelectedMembers([]);
    }
  };

  const deleteCircle = (id: string) => {
    setCircles(circles.filter(c => c.id !== id));
  };

  const toggleMemberSelection = (friendId: string) => {
    setSelectedMembers(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const totalOwed = friends.filter(f => f.balance > 0).reduce((sum, f) => sum + f.balance, 0);
  const totalOwes = friends.filter(f => f.balance < 0).reduce((sum, f) => sum + Math.abs(f.balance), 0);

  return (
    <>
      <AppContainer>
        <div className="space-y-6 pb-20">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₹{totalOwed.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  You are owed
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">₹{totalOwes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <TrendingDown className="h-4 w-4" />
                  You owe
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{friends.length}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Users className="h-4 w-4" />
                  Total friends
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Friends List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Friends</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Friend
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Friend</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="friendName">Name</Label>
                      <Input
                        id="friendName"
                        value={newFriendName}
                        onChange={(e) => setNewFriendName(e.target.value)}
                        placeholder="Friend's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="friendEmail">Email</Label>
                      <Input
                        id="friendEmail"
                        type="email"
                        value={newFriendEmail}
                        onChange={(e) => setNewFriendEmail(e.target.value)}
                        placeholder="friend@example.com"
                      />
                    </div>
                    <Button onClick={addFriend} className="w-full">
                      Add Friend
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend, index) => (
                  <div key={friend.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{friend.name}</div>
                          <div className="text-sm text-muted-foreground">{friend.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {friend.balance !== 0 && (
                          <div className={`font-semibold ${friend.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {friend.balance > 0 ? '+' : ''}₹{Math.abs(friend.balance).toLocaleString()}
                          </div>
                        )}
                        {friend.balance === 0 && (
                          <Badge variant="outline">Settled</Badge>
                        )}
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteFriend(friend.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < friends.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Circles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Circles</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Circle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Circle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="circleName">Circle Name</Label>
                      <Input
                        id="circleName"
                        value={newCircleName}
                        onChange={(e) => setNewCircleName(e.target.value)}
                        placeholder="e.g., College Friends"
                      />
                    </div>
                    <div>
                      <Label>Select Members</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {friends.map((friend) => (
                          <div key={friend.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`member-${friend.id}`}
                              checked={selectedMembers.includes(friend.id)}
                              onChange={() => toggleMemberSelection(friend.id)}
                              className="rounded"
                            />
                            <label htmlFor={`member-${friend.id}`} className="text-sm">
                              {friend.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={createCircle} className="w-full">
                      Create Circle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {circles.map((circle) => (
                  <Card key={circle.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{circle.emoji}</span>
                          <div className="font-semibold">{circle.name}</div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => deleteCircle(circle.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {circle.members.length} members
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {circle.members.slice(0, 3).map((memberId) => {
                          const member = friends.find(f => f.id === memberId);
                          return member ? (
                            <Badge key={memberId} variant="secondary" className="text-xs">
                              {member.name.split(' ')[0]}
                            </Badge>
                          ) : null;
                        })}
                        {circle.members.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{circle.members.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppContainer>
      <BottomNav />
    </>
  );
}