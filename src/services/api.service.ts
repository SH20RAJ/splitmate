import {
  ApiResponse,
  User,
  Group,
  GroupMember,
  Expense,
  Payment,
  Activity,
  Category,
  UserBalance,
  SettlementSuggestion,
  CreateUserData,
  CreateGroupData,
  CreateExpenseData,
  CreatePaymentData,
  CreateCategoryData,
} from '@/types/api';

class ApiService {
  private baseUrl = '/api';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json() as ApiResponse<T>;
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // User API methods
  async getUserByEmail(email: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users?email=${encodeURIComponent(email)}`);
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Group API methods
  async getUserGroups(userId: string): Promise<ApiResponse<Group[]>> {
    return this.request<Group[]>(`/groups?userId=${userId}`);
  }

  async createGroup(groupData: CreateGroupData): Promise<ApiResponse<Group>> {
    return this.request<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  }

  async getGroupById(groupId: string): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${groupId}`);
  }

  async updateGroup(groupId: string, updateData: Partial<CreateGroupData>): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteGroup(groupId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/groups/${groupId}`, {
      method: 'DELETE',
    });
  }

  // Group Members API methods
  async getGroupMembers(groupId: string): Promise<ApiResponse<GroupMember[]>> {
    return this.request<GroupMember[]>(`/groups/${groupId}/members`);
  }

  async addGroupMember(groupId: string, userId: string, role: 'member' | 'admin' = 'member'): Promise<ApiResponse<GroupMember>> {
    return this.request<GroupMember>(`/groups/${groupId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role }),
    });
  }

  async removeGroupMember(groupId: string, userId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/groups/${groupId}/members?userId=${userId}`, {
      method: 'DELETE',
    });
  }

  // Expense API methods
  async getGroupExpenses(groupId: string): Promise<ApiResponse<Expense[]>> {
    return this.request<Expense[]>(`/expenses?groupId=${groupId}`);
  }

  async getUserExpenses(userId: string): Promise<ApiResponse<Expense[]>> {
    return this.request<Expense[]>(`/expenses?userId=${userId}`);
  }

  async createExpense(expenseData: CreateExpenseData): Promise<ApiResponse<Expense>> {
    return this.request<Expense>('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });
  }

  async getExpenseById(expenseId: string): Promise<ApiResponse<Expense>> {
    return this.request<Expense>(`/expenses/${expenseId}`);
  }

  async updateExpense(expenseId: string, updateData: Partial<CreateExpenseData>): Promise<ApiResponse<Expense>> {
    return this.request<Expense>(`/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteExpense(expenseId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/expenses/${expenseId}`, {
      method: 'DELETE',
    });
  }

  // Payment API methods
  async getGroupPayments(groupId: string): Promise<ApiResponse<Payment[]>> {
    return this.request<Payment[]>(`/payments?groupId=${groupId}`);
  }

  async getUserPayments(userId: string): Promise<ApiResponse<Payment[]>> {
    return this.request<Payment[]>(`/payments?userId=${userId}`);
  }

  async createPayment(paymentData: CreatePaymentData): Promise<ApiResponse<Payment>> {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Balance API methods
  async getUserBalance(groupId: string, userId: string): Promise<ApiResponse<UserBalance>> {
    return this.request<UserBalance>(`/balances?groupId=${groupId}&userId=${userId}`);
  }

  // Settlement API methods
  async getSettlementSuggestions(groupId: string): Promise<ApiResponse<SettlementSuggestion[]>> {
    return this.request<SettlementSuggestion[]>(`/settlements?groupId=${groupId}`);
  }

  // Activity API methods
  async getGroupActivities(groupId: string): Promise<ApiResponse<Activity[]>> {
    return this.request<Activity[]>(`/groups/${groupId}/activities`);
  }

  // Category API methods
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/categories');
  }

  async createCategory(categoryData: CreateCategoryData): Promise<ApiResponse<Category>> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
