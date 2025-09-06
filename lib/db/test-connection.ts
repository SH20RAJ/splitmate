import { createClient } from './index';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Create Supabase client
    const supabase = createClient();
    
    // Test a simple query
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return;
    }
    
    console.log('Supabase connection successful!');
    console.log('Sample data:', data);
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnection();