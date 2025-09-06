export const runtime = 'edge';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  MessageSquareIcon,
  UserIcon,
  ClockIcon,
  ArchiveIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for chat history
const chatHistory = [
  {
    id: '1',
    title: 'Goa Trip Planning',
    group: 'Goa Trip 2024',
    participants: 5,
    lastMessage: 'Amit: Should we book the hotel for 4 nights?',
    timestamp: '2 hours ago',
    unread: 3,
    archived: false,
    category: 'Travel'
  },
  {
    id: '2',
    title: 'Monthly Expenses',
    group: 'Roommates',
    participants: 4,
    lastMessage: 'You: I\'ve added the electricity bill',
    timestamp: '1 day ago',
    unread: 0,
    archived: false,
    category: 'Housing'
  },
  {
    id: '3',
    title: 'Office Lunch',
    group: 'Work Team',
    participants: 8,
    lastMessage: 'Priya: The new restaurant downtown is great!',
    timestamp: '2 days ago',
    unread: 0,
    archived: false,
    category: 'Food'
  },
  {
    id: '4',
    title: 'Birthday Party',
    group: 'Friends Circle',
    participants: 12,
    lastMessage: 'Rahul: Don\'t forget to bring gifts!',
    timestamp: '1 week ago',
    unread: 0,
    archived: true,
    category: 'Social'
  },
  {
    id: '5',
    title: 'Project Discussion',
    group: 'Work Projects',
    participants: 3,
    lastMessage: 'Manager: Deadline moved to next Friday',
    timestamp: '1 week ago',
    unread: 0,
    archived: false,
    category: 'Work'
  }
];

export default function ChatHistoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat History</h1>
          <p className="text-muted-foreground">View and manage your conversation history</p>
        </div>
        <Button>
          <MessageSquareIcon className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All Chats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chats</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat History List */}
      <div className="grid gap-4">
        {chatHistory.map((chat) => (
          <Card key={chat.id} className="hover:bg-accent/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquareIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{chat.title}</h3>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="rounded-full">
                          {chat.unread}
                        </Badge>
                      )}
                      {chat.archived && (
                        <Badge variant="secondary" className="rounded-full">
                          <ArchiveIcon className="h-3 w-3 mr-1" />
                          Archived
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{chat.group}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />
                        <span>{chat.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{chat.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm truncate max-w-[200px]">{chat.lastMessage}</p>
                  <Badge variant="outline" className="mt-2">
                    {chat.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Chats</Button>
      </div>
    </div>
  );
}
