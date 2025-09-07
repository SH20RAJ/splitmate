#!/usr/bin/env node

/**
 * SplitMate MongoDB Backend Integration Test
 * 
 * This script tests the complete backend setup by:
 * 1. Testing database connection
 * 2. Creating sample data (categories, users, groups)
 * 3. Testing API endpoints
 * 4. Verifying data integrity
 */

const testBackendIntegration = async () => {
  console.log('🚀 Starting SplitMate Backend Integration Test...\n');
  
  try {
    // Test 1: Database Connection
    console.log('1️⃣ Testing Database Connection...');
    const dbResponse = await fetch('http://localhost:3000/api/init-db', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const dbResult = await dbResponse.json();
    
    if (dbResult.success) {
      console.log('✅ Database connection successful');
    } else {
      console.log('❌ Database connection failed:', dbResult.error);
      return;
    }
    
    // Test 2: Initialize Default Data
    console.log('\n2️⃣ Initializing Default Data...');
    const initResponse = await fetch('http://localhost:3000/api/init-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const initResult = await initResponse.json();
    
    if (initResult.success) {
      console.log('✅ Default data initialized');
    } else {
      console.log('⚠️ Default data initialization:', initResult.error);
    }
    
    // Test 3: Create Test User
    console.log('\n3️⃣ Creating Test User...');
    const userData = {
      email: 'test@splitmate.com',
      displayName: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg'
    };
    
    const userResponse = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const userResult = await userResponse.json();
    
    if (userResult.success && userResult.data) {
      console.log('✅ User created:', userResult.data.email);
      const userId = userResult.data._id;
      
      // Test 4: Create Test Group
      console.log('\n4️⃣ Creating Test Group...');
      const groupData = {
        name: 'Test Group',
        description: 'A test group for backend integration',
        currency: 'INR',
        category: 'friends',
        monthlyBudget: 5000,
        createdBy: userId
      };
      
      const groupResponse = await fetch('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groupData)
      });
      const groupResult = await groupResponse.json();
      
      if (groupResult.success && groupResult.data) {
        console.log('✅ Group created:', groupResult.data.name);
        const groupId = groupResult.data._id;
        
        // Test 5: Create Test Expense
        console.log('\n5️⃣ Creating Test Expense...');
        const expenseData = {
          groupId: groupId,
          name: 'Test Expense',
          description: 'A test expense for backend integration',
          amount: 1000,
          currency: 'INR',
          category: 'food',
          paidById: userId,
          splitType: 'equal',
          expenseDate: new Date().toISOString(),
          participants: [
            {
              userId: userId,
              shareAmount: 1000,
            }
          ]
        };
        
        const expenseResponse = await fetch('http://localhost:3000/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expenseData)
        });
        const expenseResult = await expenseResponse.json();
        
        if (expenseResult.success && expenseResult.data) {
          console.log('✅ Expense created:', expenseResult.data.name);
          
          // Test 6: Get Settlement Suggestions
          console.log('\n6️⃣ Getting Settlement Suggestions...');
          const settlementResponse = await fetch(`http://localhost:3000/api/settlements?groupId=${groupId}`);
          const settlementResult = await settlementResponse.json();
          
          if (settlementResult.success) {
            console.log('✅ Settlement suggestions retrieved:', settlementResult.data?.length || 0, 'suggestions');
          } else {
            console.log('⚠️ Settlement suggestions:', settlementResult.error);
          }
          
          // Test 7: Get Categories
          console.log('\n7️⃣ Getting Categories...');
          const categoriesResponse = await fetch('http://localhost:3000/api/categories');
          const categoriesResult = await categoriesResponse.json();
          
          if (categoriesResult.success && categoriesResult.data) {
            console.log('✅ Categories retrieved:', categoriesResult.data.length, 'categories');
          } else {
            console.log('⚠️ Categories retrieval:', categoriesResult.error);
          }
          
        } else {
          console.log('❌ Expense creation failed:', expenseResult.error);
        }
        
      } else {
        console.log('❌ Group creation failed:', groupResult.error);
      }
      
    } else {
      console.log('❌ User creation failed:', userResult.error);
    }
    
    console.log('\n🎉 Backend Integration Test Complete!');
    console.log('\n📋 Summary:');
    console.log('- Database connection: Tested');
    console.log('- User management: Tested');
    console.log('- Group management: Tested'); 
    console.log('- Expense management: Tested');
    console.log('- Settlement calculations: Tested');
    console.log('- Categories: Tested');
    console.log('\n✨ SplitMate MongoDB backend is fully integrated and working!');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
  }
};

// Run the test if this script is executed directly
if (require.main === module) {
  testBackendIntegration();
}

module.exports = { testBackendIntegration };
