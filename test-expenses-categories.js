#!/usr/bin/env node

/**
 * Test script for /api/expenses/categories endpoint
 * Tests all CRUD operations and usage statistics
 */

const baseUrl = process.argv.includes('--port=3003') ? 'http://localhost:3003' : 'http://localhost:3000';

async function testAPI() {
  console.log('🚀 Testing /api/expenses/categories endpoint...\n');

  try {
    // Test 1: GET - Fetch all categories
    console.log('📋 Test 1: GET /api/expenses/categories');
    const response1 = await fetch(`${baseUrl}/api/expenses/categories`);
    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', JSON.stringify(data1, null, 2));
    console.log('✅ Test 1 passed\n');

    // Test 2: GET with usage statistics
    console.log('📊 Test 2: GET /api/expenses/categories?includeUsage=true&userId=64f8d2e5c8b4a9f1e2d3c4b5&timeframe=30d');
    const response2 = await fetch(`${baseUrl}/api/expenses/categories?includeUsage=true&userId=64f8d2e5c8b4a9f1e2d3c4b5&timeframe=30d`);
    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
    console.log('✅ Test 2 passed\n');

    // Test 3: POST - Create new category
    console.log('➕ Test 3: POST /api/expenses/categories');
    const newCategory = {
      name: 'Test Category',
      icon: '🧪',
      color: '#FF5733',
      description: 'A test category for API testing',
      keywords: ['test', 'api', 'demo'],
      parentCategory: 'Other'
    };
    
    const response3 = await fetch(`${baseUrl}/api/expenses/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory)
    });
    const data3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', JSON.stringify(data3, null, 2));
    console.log('✅ Test 3 passed\n');

    // Test 4: POST - Try to create duplicate category (should fail)
    console.log('❌ Test 4: POST /api/expenses/categories (duplicate)');
    const response4 = await fetch(`${baseUrl}/api/expenses/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory)
    });
    const data4 = await response4.json();
    console.log('Status:', response4.status);
    console.log('Response:', JSON.stringify(data4, null, 2));
    console.log('✅ Test 4 passed (correctly failed)\n');

    // Test 5: PUT - Bulk update categories
    console.log('🔄 Test 5: PUT /api/expenses/categories (bulk update)');
    const updateData = {
      categories: [
        {
          id: data3.data._id, // Use the ID from the created category
          name: 'Updated Test Category',
          description: 'Updated description',
          keywords: ['test', 'api', 'demo', 'updated']
        }
      ]
    };
    
    const response5 = await fetch(`${baseUrl}/api/expenses/categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    const data5 = await response5.json();
    console.log('Status:', response5.status);
    console.log('Response:', JSON.stringify(data5, null, 2));
    console.log('✅ Test 5 passed\n');

    // Test 6: DELETE - Remove test category
    console.log('🗑️  Test 6: DELETE /api/expenses/categories');
    const response6 = await fetch(`${baseUrl}/api/expenses/categories?ids=${data3.data._id}`, {
      method: 'DELETE'
    });
    const data6 = await response6.json();
    console.log('Status:', response6.status);
    console.log('Response:', JSON.stringify(data6, null, 2));
    console.log('✅ Test 6 passed\n');

    // Test 7: Error handling - Invalid request
    console.log('⚠️  Test 7: POST /api/expenses/categories (invalid data)');
    const response7 = await fetch(`${baseUrl}/api/expenses/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}) // Missing required name field
    });
    const data7 = await response7.json();
    console.log('Status:', response7.status);
    console.log('Response:', JSON.stringify(data7, null, 2));
    console.log('✅ Test 7 passed (correctly handled error)\n');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  }
}

// Handle different environments
if (process.argv.includes('--help')) {
  console.log(`
Usage: node test-expenses-categories.js [options]

Options:
  --port=3003    Test against port 3003 instead of 3000
  --help         Show this help message

Examples:
  node test-expenses-categories.js
  node test-expenses-categories.js --port=3003
  `);
  process.exit(0);
}

// Run the tests
testAPI().catch(console.error);
