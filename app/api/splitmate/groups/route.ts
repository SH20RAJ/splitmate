import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  createdAt: string;
}

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for groups
    // In a real app, this would come from a database
    const groups: Group[] = [
      {
        id: "1",
        name: "Roommates",
        description: "Monthly expenses for our apartment",
        members: [
          {
            id: user.id,
            name: user.displayName || "You",
            email: user.primaryEmail || "",
            avatar: user.profileImageUrl || undefined
          },
          {
            id: "2",
            name: "Rahul",
            email: "rahul@example.com"
          },
          {
            id: "3",
            name: "Shreya",
            email: "shreya@example.com"
          }
        ],
        createdAt: "2023-05-01"
      },
      {
        id: "2",
        name: "Trip to Goa",
        description: "Expenses for our Goa trip",
        members: [
          {
            id: user.id,
            name: user.displayName || "You",
            email: user.primaryEmail || "",
            avatar: user.profileImageUrl || undefined
          },
          {
            id: "4",
            name: "Priya",
            email: "priya@example.com"
          },
          {
            id: "5",
            name: "Amit",
            email: "amit@example.com"
          }
        ],
        createdAt: "2023-05-10"
      }
    ];

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}