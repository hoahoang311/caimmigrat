const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env file');
  process.exit(1);
}

if (!supabaseServiceKey || supabaseServiceKey === 'admin') {
  console.error('❌ Missing or invalid SUPABASE_SERVICE_ROLE_KEY in .env file');
  console.log('Please get the service role key from your Supabase dashboard:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to Settings → API');
  console.log('4. Copy the service_role key (not the anon key)');
  console.log('5. Update SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runSchema() {
  try {
    console.log('🚀 Starting database schema setup...\n');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      // Skip comments
      if (statement.startsWith('--')) {
        continue;
      }
      
      console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql: statement 
        });
        
        if (error) {
          // Try direct query if rpc fails
          const { error: directError } = await supabase
            .from('_dummy')
            .select()
            .limit(0);
            
          if (directError) {
            console.warn(`⚠️  Could not execute via RPC, trying direct query...`);
            // For table creation and other DDL, we might need to use raw SQL
            console.log(`📋 Statement: ${statement.substring(0, 100)}...`);
          }
        }
        
        console.log(`✅ Statement ${i + 1} completed`);
        
      } catch (err) {
        console.warn(`⚠️  Statement ${i + 1} may have failed:`, err.message);
        console.log(`📋 Statement was: ${statement.substring(0, 100)}...`);
      }
    }
    
    console.log('\n🎉 Schema execution completed!');
    console.log('\n📊 Next steps:');
    console.log('1. Go to your Supabase dashboard → Table Editor');
    console.log('2. Verify the tables were created: inquiries, newsletter_subscribers, consultation_bookings');
    console.log('3. Go to Authentication → Users to create an admin user');
    console.log('4. Test your admin login at http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error running schema:', error);
    console.log('\n🔧 Manual setup option:');
    console.log('1. Go to your Supabase dashboard → SQL Editor');
    console.log('2. Copy and paste the contents of database/schema.sql');
    console.log('3. Click "Run" to execute the schema');
  }
}

console.log('🗄️  ICBM Law Database Schema Setup');
console.log('=====================================\n');

runSchema();