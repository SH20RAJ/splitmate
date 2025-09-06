import { createClient } from './index';
import {
  type User,
  type NewUser,
  type Group,
  type NewGroup,
  type Expense,
  type NewExpense
} from './schema';

// Helper function to get Supabase client
function getSupabaseClient() {
  return createClient();
}

// User queries
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }

    return data as User || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }

    return data as User || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const createUser = async (userData: NewUser): Promise<User | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return data as User || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = async (id: string, userData: Partial<NewUser>): Promise<User | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('users')
      .update({ ...userData, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data as User || null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Group queries
export const getGroupsByUserId = async (userId: string): Promise<any[] | null> => {
  try {
    const supabase = getSupabaseClient();

    // First get groups where user is a member
    const { data: groupMembers, error: membersError } = await supabase
      .from('group_members')
      .select('group_id, is_admin')
      .eq('user_id', userId);

    if (membersError) {
      console.error('Error fetching group members:', membersError);
      return null;
    }

    if (groupMembers.length === 0) {
      return [];
    }

    // Get the group details
    const groupIds = groupMembers.map(gm => gm.group_id);
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select('*')
      .in('id', groupIds);

    if (groupsError) {
      console.error('Error fetching groups:', groupsError);
      return null;
    }

    // Get member counts for each group
    const { data: memberCounts, error: countError } = await supabase
      .from('group_members')
      .select('group_id')
      .in('group_id', groupIds);

    if (countError) {
      console.error('Error fetching member counts:', countError);
      return null;
    }

    // Count members for each group
    const memberCountMap: Record<string, number> = {};
    memberCounts.forEach(mc => {
      memberCountMap[mc.group_id] = (memberCountMap[mc.group_id] || 0) + 1;
    });

    // Combine the data
    const result = groups.map(group => {
      const memberInfo = groupMembers.find(gm => gm.group_id === group.id);

      return {
        ...group,
        memberCount: memberCountMap[group.id] || 0,
        isAdmin: memberInfo?.is_admin || false
      };
    });

    return result;
  } catch (error) {
    console.error('Error fetching groups by user ID:', error);
    return null;
  }
};

export const getGroupById = async (groupId: string): Promise<Group | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();

    if (error) {
      console.error('Error fetching group by ID:', error);
      return null;
    }

    return data as Group || null;
  } catch (error) {
    console.error('Error fetching group by ID:', error);
    return null;
  }
};

export const createGroup = async (groupData: NewGroup): Promise<Group | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('groups')
      .insert(groupData)
      .select()
      .single();

    if (error) {
      console.error('Error creating group:', error);
      return null;
    }

    return data as Group || null;
  } catch (error) {
    console.error('Error creating group:', error);
    return null;
  }
};

export const addGroupMember = async (groupId: string, userId: string, isAdmin = false) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: userId,
        is_admin: isAdmin,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding group member:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error adding group member:', error);
    return null;
  }
};

export const getGroupMembers = async (groupId: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        *,
        users (
          id,
          email,
          display_name,
          first_name,
          last_name,
          profile_image_url
        )
      `)
      .eq('group_id', groupId);

    if (error) {
      console.error('Error fetching group members:', error);
      return [];
    }

    // Transform the data to match our expected structure
    return data.map(member => ({
      id: member.users?.id || '',
      email: member.users?.email || '',
      displayName: member.users?.display_name || null,
      firstName: member.users?.first_name || null,
      lastName: member.users?.last_name || null,
      profileImageUrl: member.users?.profile_image_url || null,
      joinedAt: new Date(member.joined_at),
      isAdmin: member.is_admin,
    }));
  } catch (error) {
    console.error('Error fetching group members:', error);
    return [];
  }
};

// Expense queries
export const getExpensesByUserId = async (userId: string): Promise<any[] | null> => {
  try {
    const supabase = getSupabaseClient();

    // Get expenses where user is either the payer or a participant
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select(`
        *,
        users!expenses_paid_by_fkey (display_name)
      `)
      .or(`paid_by.eq.${userId},expense_participants.user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (expensesError) {
      console.error('Error fetching expenses:', expensesError);
      return null;
    }

    // For now, return simplified data without participants
    const result = expenses.map(expense => ({
      ...expense,
      participants: [],
      paidByName: expense.users?.display_name || null,
    }));

    return result;
  } catch (error) {
    console.error('Error fetching expenses by user ID:', error);
    return null;
  }
};

export const getExpensesByGroupId = async (groupId: string): Promise<any[] | null> => {
  try {
    const supabase = getSupabaseClient();

    // Get expenses for the group
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select(`
        *,
        users!expenses_paid_by_fkey (display_name)
      `)
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (expensesError) {
      console.error('Error fetching expenses by group ID:', expensesError);
      return null;
    }

    // For now, return simplified data without participants
    const result = expenses.map(expense => ({
      ...expense,
      participants: [],
      paidByName: expense.users?.display_name || null,
    }));

    return result;
  } catch (error) {
    console.error('Error fetching expenses by group ID:', error);
    return null;
  }
};

export const createExpense = async (
  expenseData: NewExpense,
  participantIds: string[]
): Promise<Expense | null> => {
  try {
    const supabase = getSupabaseClient();

    // Create the expense
    const { data: expense, error: expenseError } = await supabase
      .from('expenses')
      .insert(expenseData)
      .select()
      .single();

    if (expenseError) {
      console.error('Error creating expense:', expenseError);
      return null;
    }

    // Calculate split amount
    const splitAmount = Number(expenseData.amount) / participantIds.length;

    // Add participants
    const participantData = participantIds.map(userId => ({
      expense_id: expense.id,
      user_id: userId,
      owed_amount: splitAmount.toString(),
    }));

    const { error: participantsError } = await supabase
      .from('expense_participants')
      .insert(participantData);

    if (participantsError) {
      console.error('Error adding expense participants:', participantsError);
      return null;
    }

    return expense as Expense || null;
  } catch (error) {
    console.error('Error creating expense:', error);
    return null;
  }
};

// Settlement queries
export const getUserBalances = async (userId: string) => {
  try {
    const supabase = getSupabaseClient();

    // Get amounts user owes to others
    const { data: owes, error: owesError } = await supabase
      .from('settlements')
      .select(`
        to_user_id,
        amount
      `)
      .eq('from_user_id', userId)
      .eq('status', 'pending');

    if (owesError) {
      console.error('Error fetching amounts user owes:', owesError);
      return { owes: [], owedTo: [] };
    }

    // Get amounts others owe to user
    const { data: owedTo, error: owedToError } = await supabase
      .from('settlements')
      .select(`
        from_user_id,
        amount
      `)
      .eq('to_user_id', userId)
      .eq('status', 'pending');

    if (owedToError) {
      console.error('Error fetching amounts owed to user:', owedToError);
      return { owes: [], owedTo: [] };
    }

    return {
      owes: owes.map(item => ({
        toUserId: item.to_user_id,
        amount: item.amount,
      })),
      owedTo: owedTo.map(item => ({
        fromUserId: item.from_user_id,
        amount: item.amount,
      })),
    };
  } catch (error) {
    console.error('Error fetching user balances:', error);
    return {
      owes: [],
      owedTo: [],
    };
  }
};

// Notification queries
export const getNotificationsByUserId = async (userId: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) {
      console.error('Error marking notification as read:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return null;
  }
};

export const createNotification = async (notificationData: {
  userId: string;
  title: string;
  message: string;
  type: string;
  relatedExpenseId?: string;
  relatedGroupId?: string;
}) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: notificationData.userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
        related_expense_id: notificationData.relatedExpenseId,
        related_group_id: notificationData.relatedGroupId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};