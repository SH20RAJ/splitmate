"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

export default function EditExpense() {
  const [description, setDescription] = useState("Dinner at Pizza Palace");
  const [amount, setAmount] = useState("1200");
  const [category, setCategory] = useState("Food");
  const [paidBy, setPaidBy] = useState("You");
  const [members, setMembers] = useState(["Rahul", "Priya", "You"]);
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember("");
    }
  };

  const removeMember = (member: string) => {
    setMembers(members.filter(m => m !== member));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this expense for?"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="paidBy">Paid by</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Split among</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {members.map((member) => (
                <Badge key={member} variant="secondary" className="flex items-center gap-1">
                  {member}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeMember(member)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add member"
                onKeyPress={(e) => e.key === 'Enter' && addMember()}
              />
              <Button type="button" onClick={addMember} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
