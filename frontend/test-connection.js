// Test Supabase connection
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://vrekxdwpeqqhuwaxmfjk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWt4ZHdwZXFxaHV3YXhtZmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTg0OTAsImV4cCI6MjA3MjczNDQ5MH0.k2Eq2y-eh3S1CiEE4s9OeuOVN0c9eD00mjaAi9Y-coo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('Connection test result:', error.message)
    } else {
      console.log('Connection successful!')
      console.log('Data:', data)
    }
  } catch (err) {
    console.log('Connection failed:', err.message)
  }
}

testConnection()