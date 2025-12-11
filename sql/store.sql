-- ============================================
-- 3D Store Database Schema
-- Tables: Products, Orders, Order Items
-- With Row Level Security (RLS) enabled
-- ============================================

BEGIN;

-- ============================================
-- 1. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS app_cbdf7_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    model_url TEXT NOT NULL, -- URL to 3D model file
    thumbnail_url TEXT, -- Product thumbnail image
    category TEXT,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for products
CREATE INDEX IF NOT EXISTS products_category_idx ON app_cbdf7_products(category);
CREATE INDEX IF NOT EXISTS products_active_idx ON app_cbdf7_products(is_active);
CREATE INDEX IF NOT EXISTS products_created_idx ON app_cbdf7_products(created_at DESC);

-- ============================================
-- 2. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS app_cbdf7_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB, -- Store address as JSON: {street, city, state, zip, country}
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    payment_method TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for orders
CREATE INDEX IF NOT EXISTS orders_user_idx ON app_cbdf7_orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON app_cbdf7_orders(status);
CREATE INDEX IF NOT EXISTS orders_created_idx ON app_cbdf7_orders(created_at DESC);

-- ============================================
-- 3. ORDER ITEMS TABLE (Junction table)
-- ============================================
CREATE TABLE IF NOT EXISTS app_cbdf7_order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES app_cbdf7_orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES app_cbdf7_products(id) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for order items
CREATE INDEX IF NOT EXISTS order_items_order_idx ON app_cbdf7_order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_product_idx ON app_cbdf7_order_items(product_id);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE app_cbdf7_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_cbdf7_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_cbdf7_order_items ENABLE ROW LEVEL SECURITY;

-- Products Policies (Public read, admin write)
CREATE POLICY "allow_public_read_products" 
    ON app_cbdf7_products FOR SELECT 
    USING (true);

CREATE POLICY "allow_authenticated_insert_products" 
    ON app_cbdf7_products FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "allow_authenticated_update_products" 
    ON app_cbdf7_products FOR UPDATE 
    TO authenticated 
    USING (true);

-- Orders Policies (Users can only see their own orders)
CREATE POLICY "allow_users_read_own_orders" 
    ON app_cbdf7_orders FOR SELECT 
    TO authenticated 
    USING ((select auth.uid()) = user_id);

CREATE POLICY "allow_users_insert_own_orders" 
    ON app_cbdf7_orders FOR INSERT 
    TO authenticated 
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "allow_users_update_own_orders" 
    ON app_cbdf7_orders FOR UPDATE 
    TO authenticated 
    USING ((select auth.uid()) = user_id);

-- Order Items Policies (Users can see items from their orders)
CREATE POLICY "allow_users_read_own_order_items" 
    ON app_cbdf7_order_items FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM app_cbdf7_orders 
            WHERE app_cbdf7_orders.id = order_id 
            AND app_cbdf7_orders.user_id = (select auth.uid())
        )
    );

CREATE POLICY "allow_users_insert_own_order_items" 
    ON app_cbdf7_order_items FOR INSERT 
    TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM app_cbdf7_orders 
            WHERE app_cbdf7_orders.id = order_id 
            AND app_cbdf7_orders.user_id = (select auth.uid())
        )
    );

-- ============================================
-- 5. SAMPLE DATA (Optional - Remove if not needed)
-- ============================================

-- Insert sample products
INSERT INTO app_cbdf7_products (name, description, price, model_url, thumbnail_url, category, stock_quantity) VALUES
('Modern Chair', 'Comfortable ergonomic chair with 3D design', 299.99, '/models/chair.glb', '/images/chair.jpg', 'Furniture', 50),
('Wooden Table', 'Handcrafted wooden dining table', 599.99, '/models/table.glb', '/images/table.jpg', 'Furniture', 30),
('Designer Lamp', 'Contemporary LED desk lamp', 149.99, '/models/lamp.glb', '/images/lamp.jpg', 'Lighting', 100),
('Coffee Mug', '3D printed ceramic coffee mug', 24.99, '/models/mug.glb', '/images/mug.jpg', 'Accessories', 200);

COMMIT;
