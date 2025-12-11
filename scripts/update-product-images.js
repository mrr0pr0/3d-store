const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProductImages() {
  console.log('Updating product images...\n');
  
  // Get all products
  const { data: products, error: fetchError } = await supabase
    .from('app_cbdf7_products')
    .select('*')
    .order('created_at');
  
  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    return;
  }
  
  if (!products || products.length === 0) {
    console.log('No products found.');
    return;
  }
  
  // Update first product (stol/chair) with image.png
  const { error: error1 } = await supabase
    .from('app_cbdf7_products')
    .update({ thumbnail_url: '/images/image.png' })
    .eq('id', products[0].id);
  
  if (error1) {
    console.error('Error updating product 1:', error1);
  } else {
    console.log(`✓ Updated ${products[0].name} image to /images/image.png`);
  }
  
  // Update second product (bord/table) with image-1.png
  const { error: error2 } = await supabase
    .from('app_cbdf7_products')
    .update({ thumbnail_url: '/images/image-1.png' })
    .eq('id', products[1].id);
  
  if (error2) {
    console.error('Error updating product 2:', error2);
  } else {
    console.log(`✓ Updated ${products[1].name} image to /images/image-1.png`);
  }
  
  console.log('\nProduct images updated successfully!');
  console.log('The first two products now use your uploaded images.');
  console.log('The other products still use placeholder paths.');
}

updateProductImages();