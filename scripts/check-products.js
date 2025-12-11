const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('Checking products in database...\n');
  
  const { data, error } = await supabase
    .from('app_cbdf7_products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }
  
  if (!data || data.length === 0) {
    console.log('No products found in database.');
    console.log('\nYou need to run the SQL schema to create sample products.');
    console.log('Run this in your Supabase SQL Editor:');
    console.log('File location: /workspace/sql/store.sql');
    return;
  }
  
  console.log(`Found ${data.length} products:\n`);
  data.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Price: $${product.price}`);
    console.log(`   Image: ${product.thumbnail_url || 'No image'}`);
    console.log(`   Category: ${product.category}`);
    console.log(`   Active: ${product.is_active}`);
    console.log('');
  });
}

checkProducts();