CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR,
    description TEXT,
    section VARCHAR,
    icon VARCHAR
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(category_id),
    name VARCHAR,
	description TEXT,
    price NUMERIC,
	icon VARCHAR,
    stock_quantity INTEGER
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    session_id VARCHAR
);

CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES cart(cart_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    session_id VARCHAR,
    customer_name VARCHAR,
    customer_email VARCHAR,
    shipping_address TEXT,
    total_price NUMERIC,
    order_status VARCHAR,
    time_of_creation TIMESTAMP
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER,
    price NUMERIC
);

INSERT INTO categories (icon, name, description, section) VALUES
('Helmet', 'Helmets', 'High-performance protective gear for professional cyclists', 'helmets'),
('Glasses', 'Eyewear', 'Aerodynamic and protective cycling sunglasses', 'glasses'),
('Gloves', 'Gloves', 'Comfort and grip for ultimate control', 'gloves'),
('Jersey', 'Sportswear', 'Breathable professional cycling apparel', 'jerseys'),
('Shoes', 'Cycling Shoes', 'Lightweight and efficient performance footwear', 'shoes'),
('Bottle', 'Accessories', 'Water bottles, bags, and essential cycling gear', 'accessories');

INSERT INTO products (category_id, name, description, price, icon, stock_quantity) VALUES 
(1, 'MET Trenta 3k', 'The MET Trenta 3K Carbon – Pogacar Special Edition offers elite-level aerodynamics and ventilation. Crafted for pro-level performance and protection.', 800, 'helmetPogacar', 50),
(1, 'S-Works TT 5', 'The S-Works TT 5 is built for speed, inspired by Remco Evenepoel’s time trial dominance. A helmet that slices through air for maximum efficiency.', 550, 'helmetTT', 500),
(1, 'Giro Aries Spherical', 'Giro Aries Spherical – Team Visma Special Edition. Lightweight, sleek, and engineered for top-tier safety and airflow.', 500, 'helmetVisma', 10);
