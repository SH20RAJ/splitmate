import { Resend } from 'resend';

export class EmailService {
  private static instance: EmailService;
  private resend: Resend | null = null;

  private constructor() {
    // Initialize Resend client if API key is available
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    } else {
      console.warn('RESEND_API_KEY not configured. Email service will be disabled.');
    }
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Check if email service is enabled
  isEnabled(): boolean {
    return !!this.resend;
  }

  // Send expense notification email
  async sendExpenseNotification(
    to: string,
    expenseDetails: {
      name: string;
      amount: number;
      category: string;
      paidBy: string;
      date: Date;
      groupId?: string;
      groupName?: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <notifications@splitmate.app>',
        to,
        subject: `New Expense Added: ${expenseDetails.name}`,
        html: `
          <h2>New Expense Added</h2>
          <p>Hello,</p>
          <p>A new expense has been added to your group:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>${expenseDetails.name}</h3>
            <p><strong>Amount:</strong> ₹${expenseDetails.amount}</p>
            <p><strong>Category:</strong> ${expenseDetails.category}</p>
            <p><strong>Paid by:</strong> ${expenseDetails.paidBy}</p>
            <p><strong>Date:</strong> ${expenseDetails.date.toLocaleDateString()}</p>
            ${expenseDetails.groupName ? `<p><strong>Group:</strong> ${expenseDetails.groupName}</p>` : ''}
          </div>
          
          <p>You can view this expense and settle your share in the SplitMate app.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending expense notification:', error);
      throw error;
    }
  }

  // Send payment reminder email
  async sendPaymentReminder(
    to: string,
    paymentDetails: {
      amount: number;
      from: string;
      dueDate?: Date;
      description?: string;
      groupId?: string;
      groupName?: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <notifications@splitmate.app>',
        to,
        subject: `Payment Reminder: ₹${paymentDetails.amount} from ${paymentDetails.from}`,
        html: `
          <h2>Payment Reminder</h2>
          <p>Hello,</p>
          <p>This is a reminder that you owe a payment:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>Payment Due</h3>
            <p><strong>Amount:</strong> ₹${paymentDetails.amount}</p>
            <p><strong>From:</strong> ${paymentDetails.from}</p>
            ${paymentDetails.description ? `<p><strong>Description:</strong> ${paymentDetails.description}</p>` : ''}
            ${paymentDetails.dueDate ? `<p><strong>Due Date:</strong> ${paymentDetails.dueDate.toLocaleDateString()}</p>` : ''}
            ${paymentDetails.groupName ? `<p><strong>Group:</strong> ${paymentDetails.groupName}</p>` : ''}
          </div>
          
          <p>Please settle this payment at your earliest convenience.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      throw error;
    }
  }

  // Send group invitation email
  async sendGroupInvitation(
    to: string,
    invitationDetails: {
      groupName: string;
      invitedBy: string;
      inviteMessage?: string;
      joinLink: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <invitations@splitmate.app>',
        to,
        subject: `You've been invited to join ${invitationDetails.groupName} on SplitMate`,
        html: `
          <h2>Group Invitation</h2>
          <p>Hello,</p>
          <p>You've been invited to join a group on SplitMate:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>${invitationDetails.groupName}</h3>
            <p><strong>Invited by:</strong> ${invitationDetails.invitedBy}</p>
            ${invitationDetails.inviteMessage ? `<p><strong>Message:</strong> ${invitationDetails.inviteMessage}</p>` : ''}
          </div>
          
          <p>
            <a href="${invitationDetails.joinLink}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
              Join Group
            </a>
          </p>
          
          <p>If you can't click the button, copy and paste this link into your browser:</p>
          <p>${invitationDetails.joinLink}</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending group invitation:', error);
      throw error;
    }
  }

  // Send settlement summary email
  async sendSettlementSummary(
    to: string,
    settlementDetails: {
      period: string;
      totalExpenses: number;
      totalPayments: number;
      netBalance: number;
      groupName?: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <statements@splitmate.app>',
        to,
        subject: `Settlement Summary${settlementDetails.groupName ? ` for ${settlementDetails.groupName}` : ''}`,
        html: `
          <h2>Settlement Summary</h2>
          <p>Hello,</p>
          <p>Here's your settlement summary:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>${settlementDetails.period}</h3>
            <p><strong>Total Expenses:</strong> ₹${settlementDetails.totalExpenses}</p>
            <p><strong>Total Payments:</strong> ₹${settlementDetails.totalPayments}</p>
            <p><strong>Net Balance:</strong> 
              <span style="color: ${settlementDetails.netBalance >= 0 ? '#00aa00' : '#aa0000'}">
                ₹${Math.abs(settlementDetails.netBalance)} ${settlementDetails.netBalance >= 0 ? 'owed to you' : 'you owe'}
              </span>
            </p>
            ${settlementDetails.groupName ? `<p><strong>Group:</strong> ${settlementDetails.groupName}</p>` : ''}
          </div>
          
          <p>You can view more details and settle balances in the SplitMate app.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending settlement summary:', error);
      throw error;
    }
  }

  // Send budget alert email
  async sendBudgetAlert(
    to: string,
    budgetDetails: {
      categoryName: string;
      budgetedAmount: number;
      spentAmount: number;
      utilization: number;
      period: string;
      groupName?: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const status = budgetDetails.utilization >= 100 ? 'exceeded' : 'warning';
      const color = budgetDetails.utilization >= 100 ? '#ff0000' : '#ff9900';

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <alerts@splitmate.app>',
        to,
        subject: `Budget ${status === 'exceeded' ? 'Exceeded' : 'Warning'}${budgetDetails.groupName ? ` for ${budgetDetails.groupName}` : ''}`,
        html: `
          <h2>Budget ${status === 'exceeded' ? 'Exceeded' : 'Warning'}</h2>
          <p>Hello,</p>
          <p>Your budget for ${budgetDetails.categoryName} has reached ${budgetDetails.utilization.toFixed(1)}%:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>${budgetDetails.categoryName}</h3>
            <p><strong>Budgeted:</strong> ₹${budgetDetails.budgetedAmount}</p>
            <p><strong>Spent:</strong> ₹${budgetDetails.spentAmount}</p>
            <p><strong>Utilization:</strong> 
              <span style="color: ${color}">
                ${budgetDetails.utilization.toFixed(1)}%
              </span>
            </p>
            <p><strong>Period:</strong> ${budgetDetails.period}</p>
            ${budgetDetails.groupName ? `<p><strong>Group:</strong> ${budgetDetails.groupName}</p>` : ''}
          </div>
          
          <p>${status === 'exceeded' 
            ? 'You have exceeded your budget for this category.' 
            : 'You are approaching your budget limit for this category.'}</p>
          
          <p>Consider adjusting your spending or increasing your budget.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending budget alert:', error);
      throw error;
    }
  }

  // Send weekly digest email
  async sendWeeklyDigest(
    to: string,
    digestDetails: {
      weekStartDate: Date;
      weekEndDate: Date;
      totalExpenses: number;
      topCategories: Array<{ name: string; amount: number }>;
      largestExpense?: { name: string; amount: number; date: Date };
      groupName?: string;
    }
  ) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <digests@splitmate.app>',
        to,
        subject: `Weekly Digest${digestDetails.groupName ? ` for ${digestDetails.groupName}` : ''}`,
        html: `
          <h2>Weekly Digest</h2>
          <p>Hello,</p>
          <p>Here's your weekly expense summary:</p>
          
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>${digestDetails.weekStartDate.toLocaleDateString()} - ${digestDetails.weekEndDate.toLocaleDateString()}</h3>
            <p><strong>Total Expenses:</strong> ₹${digestDetails.totalExpenses}</p>
            
            <h4>Top Categories</h4>
            <ul>
              ${digestDetails.topCategories.map(cat => 
                `<li>${cat.name}: ₹${cat.amount}</li>`
              ).join('')}
            </ul>
            
            ${digestDetails.largestExpense ? `
              <h4>Largest Expense</h4>
              <p>${digestDetails.largestExpense.name}: ₹${digestDetails.largestExpense.amount} on ${digestDetails.largestExpense.date.toLocaleDateString()}</p>
            ` : ''}
            
            ${digestDetails.groupName ? `<p><strong>Group:</strong> ${digestDetails.groupName}</p>` : ''}
          </div>
          
          <p>You can view more details in the SplitMate app.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending weekly digest:', error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordReset(to: string, resetLink: string) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <support@splitmate.app>',
        to,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password. Click the button below to reset it:</p>
          
          <p>
            <a href="${resetLink}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
              Reset Password
            </a>
          </p>
          
          <p>If you can't click the button, copy and paste this link into your browser:</p>
          <p>${resetLink}</p>
          
          <p>If you did not request this, please ignore this email.</p>
          
          <p>Thank you for using SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(to: string, userName: string) {
    try {
      if (!this.resend) {
        throw new Error('Email service is not enabled');
      }

      const { data, error } = await this.resend.emails.send({
        from: 'SplitMate <welcome@splitmate.app>',
        to,
        subject: 'Welcome to SplitMate!',
        html: `
          <h2>Welcome to SplitMate!</h2>
          <p>Hello ${userName},</p>
          <p>Welcome to SplitMate, your personal expense splitting companion!</p>
          
          <p>With SplitMate, you can:</p>
          <ul>
            <li>Split expenses with friends and family</li>
            <li>Track shared bills and payments</li>
            <li>Create and manage expense groups</li>
            <li>Get insights into your spending habits</li>
            <li>Receive payment reminders and notifications</li>
          </ul>
          
          <p>We're excited to help you manage your shared expenses more efficiently!</p>
          
          <p>Thank you for choosing SplitMate!</p>
          <p>The SplitMate Team</p>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default EmailService.getInstance();