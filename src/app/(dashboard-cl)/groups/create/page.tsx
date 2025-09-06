"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Users, 
  Plus, 
  X, 
  Upload, 
  Camera, 
  ArrowLeft,
  UserPlus,
  Mail,
  Settings,
  Globe,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"

const groupTemplates = [
  {
    id: 'friends',
    name: 'Friends',
    description: 'Perfect for casual hangouts and shared expenses',
    icon: '👥',
    defaultMembers: 4,
    suggestedCategories: ['Food & Dining', 'Entertainment', 'Transportation']
  },
  {
    id: 'roommates',
    name: 'Roommates',
    description: 'Manage shared living expenses and bills',
    icon: '🏠',
    defaultMembers: 3,
    suggestedCategories: ['Utilities', 'Groceries', 'Rent', 'Internet']
  },
  {
    id: 'travel',
    name: 'Travel Group',
    description: 'Track expenses during trips and vacations',
    icon: '✈️',
    defaultMembers: 6,
    suggestedCategories: ['Accommodation', 'Food', 'Transportation', 'Activities']
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Share family expenses and household costs',
    icon: '👨‍👩‍👧‍👦',
    defaultMembers: 4,
    suggestedCategories: ['Groceries', 'Utilities', 'Healthcare', 'Education']
  },
  {
    id: 'custom',
    name: 'Custom Group',
    description: 'Create a group with custom settings',
    icon: '⚙️',
    defaultMembers: 2,
    suggestedCategories: ['General']
  }
]

const suggestedFriends = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '/avatars/alice.jpg',
    mutualGroups: 2
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: '/avatars/bob.jpg',
    mutualGroups: 1
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: '/avatars/carol.jpg',
    mutualGroups: 3
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david@example.com',
    avatar: '/avatars/david.jpg',
    mutualGroups: 0
  }
]

export default function CreateGroupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    image: '',
    privacy: 'private',
    inviteCode: '',
    categories: [] as string[]
  })
  const [invitedMembers, setInvitedMembers] = useState([] as any[])
  const [emailInvites, setEmailInvites] = useState([''])
  const [showInviteCode, setShowInviteCode] = useState(false)

  const handleTemplateSelect = (template: typeof groupTemplates[0]) => {
    setSelectedTemplate(template.id)
    setGroupData(prev => ({
      ...prev,
      name: template.name === 'Custom Group' ? '' : `My ${template.name} Group`,
      categories: template.suggestedCategories
    }))
    setStep(2)
  }

  const handleAddMember = (member: typeof suggestedFriends[0]) => {
    if (!invitedMembers.find(m => m.id === member.id)) {
      setInvitedMembers(prev => [...prev, member])
    }
  }

  const handleRemoveMember = (memberId: number) => {
    setInvitedMembers(prev => prev.filter(m => m.id !== memberId))
  }

  const handleAddEmailInvite = () => {
    setEmailInvites(prev => [...prev, ''])
  }

  const handleRemoveEmailInvite = (index: number) => {
    setEmailInvites(prev => prev.filter((_, i) => i !== index))
  }

  const handleEmailChange = (index: number, value: string) => {
    setEmailInvites(prev => prev.map((email, i) => i === index ? value : email))
  }

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setGroupData(prev => ({ ...prev, inviteCode: code }))
  }

  const handleCreateGroup = async () => {
    // Here you would normally make an API call to create the group
    console.log('Creating group:', {
      ...groupData,
      template: selectedTemplate,
      invitedMembers,
      emailInvites: emailInvites.filter(email => email.trim() !== '')
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to the new group page
    router.push('/groups/new-group-id')
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= stepNum 
              ? 'bg-blue-600 text-white' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {stepNum}
          </div>
          {stepNum < 3 && (
            <div className={`w-16 h-0.5 mx-2 ${
              step > stepNum ? 'bg-blue-600' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create New Group</h1>
              <p className="text-muted-foreground">
                Set up a new group to split expenses with friends, family, or roommates
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-4 lg:px-6">
          {renderStepIndicator()}
        </div>

        {/* Step 1: Choose Template */}
        {step === 1 && (
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose a Group Type</CardTitle>
                <CardDescription>
                  Select a template that best fits your group&#39;s needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{template.icon}</div>
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {template.defaultMembers} members typically
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.suggestedCategories.slice(0, 3).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {template.suggestedCategories.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.suggestedCategories.length - 3} more
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
        )}

        {/* Step 2: Group Details */}
        {step === 2 && (
          <div className="px-4 lg:px-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Details</CardTitle>
                <CardDescription>
                  Customize your group settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Group Image */}
                <div className="space-y-2">
                  <Label>Group Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      {groupData.image ? (
                        <img src={groupData.image} alt="Group" className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <Users className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 400x400px, max 2MB
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Group Name */}
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    placeholder="Enter group name"
                    value={groupData.name}
                    onChange={(e) => setGroupData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this group for? (optional)"
                    value={groupData.description}
                    onChange={(e) => setGroupData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Privacy Settings */}
                <div className="space-y-3">
                  <Label>Privacy Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="private"
                        name="privacy"
                        value="private"
                        checked={groupData.privacy === 'private'}
                        onChange={(e) => setGroupData(prev => ({ ...prev, privacy: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer">
                        <Lock className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Private Group</div>
                          <div className="text-sm text-muted-foreground">Only invited members can join</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="public"
                        name="privacy"
                        value="public"
                        checked={groupData.privacy === 'public'}
                        onChange={(e) => setGroupData(prev => ({ ...prev, privacy: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
                        <Globe className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Public Group</div>
                          <div className="text-sm text-muted-foreground">Anyone with the invite code can join</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Invite Code for Public Groups */}
                {groupData.privacy === 'public' && (
                  <div className="space-y-2">
                    <Label>Invite Code</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={showInviteCode ? "text" : "password"}
                          placeholder="Invite code"
                          value={groupData.inviteCode}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowInviteCode(!showInviteCode)}
                        >
                          {showInviteCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" onClick={generateInviteCode}>
                        Generate Code
                      </Button>
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="space-y-3">
                  <Label>Expense Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {groupData.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setGroupData(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== category)
                          }))}
                        />
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Category
                    </Button>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!groupData.name.trim()}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Invite Members */}
        {step === 3 && (
          <div className="px-4 lg:px-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invite Members</CardTitle>
                <CardDescription>
                  Add friends and family to your group
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Suggested Friends */}
                <div className="space-y-3">
                  <Label>Suggested Friends</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestedFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">{friend.email}</p>
                            {friend.mutualGroups > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {friend.mutualGroups} mutual groups
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant={invitedMembers.some(m => m.id === friend.id) ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => 
                            invitedMembers.some(m => m.id === friend.id)
                              ? handleRemoveMember(friend.id)
                              : handleAddMember(friend)
                          }
                        >
                          {invitedMembers.some(m => m.id === friend.id) ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Email Invites */}
                <div className="space-y-3">
                  <Label>Invite by Email</Label>
                  <div className="space-y-2">
                    {emailInvites.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                        />
                        {emailInvites.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveEmailInvite(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddEmailInvite}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Email
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Invited Members Summary */}
                {invitedMembers.length > 0 && (
                  <div className="space-y-3">
                    <Label>Invited Members ({invitedMembers.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {invitedMembers.map((member) => (
                        <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                          {member.name}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveMember(member.id)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleCreateGroup}>
                    Create Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}
