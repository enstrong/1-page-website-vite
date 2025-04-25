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
('/icons/helmet-icon.svg', 'Helmets', 'High-performance protective gear for professional cyclists', 'helmets'),
('/icons/glasses-icon.svg', 'Eyewear', 'Aerodynamic and protective cycling sunglasses', 'glasses'),
('/icons/gloves-icon.svg', 'Gloves', 'Comfort and grip for ultimate control', 'gloves'),
('/icons/jersey-icon.svg', 'Sportswear', 'Breathable professional cycling apparel', 'jerseys'),
('/icons/shoes-icon.svg', 'Cycling Shoes', 'Lightweight and efficient performance footwear', 'shoes'),
('/icons/water-bottle-icon.svg', 'Accessories', 'Water bottles, bags, and essential cycling gear', 'accessories');

INSERT INTO products (category_id, name, description, price, icon, stock_quantity) VALUES 
-- Helmets
(1, 'MET Trenta 3k', 'The MET Trenta 3K Carbon – Pogacar Special Edition offers elite-level aerodynamics and ventilation. Crafted for pro-level performance and protection.', 800, '/products/helmet_pogacar.png', 50),
(1, 'S-Works TT 5', 'The S-Works TT 5 is built for speed, inspired by Remco Evenepoel’s time trial dominance. A helmet that slices through air for maximum efficiency.', 550, '/products/helmet_evenepoel_TT.webp', 500),
(1, 'Giro Aries Spherical', 'Giro Aries Spherical – Team Visma Special Edition. Lightweight, sleek, and engineered for top-tier safety and airflow.', 500, '/products/helmet_teamvisma.webp', 10),

-- Glasses
(2, 'Oakley Kato – Tour de France Edition', 'Used by top riders for maximum coverage and performance optics. Signature yellow lens.', 299.99, '/products/glasses_oakley.png', 75),
(2, '100% Speedcraft – Peter Sagan Signature Series', 'Legendary look with HiPER lens clarity. Worn in Sagan''s prime wins.', 219.00, '/products/glasses_sagan.png', 90),
(2, 'POC Aspire Clarity – EF Pro Team Edition', 'Fashion meets function with anti-fog lens and secure fit. Popular among pro peloton.', 250.00, '/products/glasses_POC.jpg', 65),

-- Gloves
(3, 'Tour de France Official Racing Gloves', 'Lightweight padded gloves with mesh back, worn by riders during the hot stages of the Tour.', 39.99, '/products/gloves_TDF.jpg', 120),
(3, 'Rapha Pro Team Gloves – Team EF Education-EasyPost', 'Minimalist design with perfect bar feel, used in Grand Tours and monuments.', 49.00, '/products/gloves_rapha.webp', 100),
(3, 'Specialized SL Pro Gloves – Julian Alaphilippe Edition', 'Designed for comfort and grip, inspired by the World Champion''s race kit.', 44.95, '/products/gloves_specialized.webp', 85),

-- Jerseys
(4, 'Tour de France Official Yellow Jersey 2024', 'The same yellow jersey awarded to the GC leader in the Tour. Made by Santini with performance-enhancing aerodynamic fabrics.', 139.99, '/products/jersey_yellow_TDF.jpg', 100),
(4, 'Tadej Pogačar UAE Team Emirates Special Edition Jersey', 'Replica of Pogačar’s 2023 Tour jersey with custom Slovenian flag details and official team sponsor logos.', 124.99, '/products/jersey_UAE.jpg', 80),
(4, 'INEOS Grenadiers Aero Race Jersey', 'Worn by Geraint Thomas and Egan Bernal, this Castelli-designed jersey features tight-fit aero fabric and breathable mesh panels.', 129.00, '/products/jersey_INEOS.jpg', 90),

-- Cycling Shoes
(5, 'Sidi Shot 2 Limited Edition Tour de France', 'Ultra-stiff carbon sole, dual dial system, and a yellow colorway celebrating the Tour''s 120th edition.', 499.00, '/products/shoes_sidi.jpg', 60),
(5, 'Shimano S-Phyre RC903 Team Edition', 'Pro-level road shoe worn by many WorldTour pros. Lightweight, secure fit, and sleek design.', 450.00, '/products/shoes_shimano.jpg', 70),
(5, 'Fizik Vento Infinito Carbon 2 – Alpecin-Deceuninck Edition', 'Limited release from the Alpecin team with advanced BOA Fit system and carbon outsole.', 429.99, '/products/shoes_fizik.jpg', 50),

-- Water Bottles & Cages
(6, 'Elite Fly Tour de France Bottle 2024', 'Ultra-light, pro-peloton used bottle with ergonomic grip and limited Tour branding.', 14.99, '/products/bottle_TDF.png', 300),
(6, 'CamelBak Podium Chill – Jumbo-Visma Edition', 'Double-walled insulation, team graphics, and high flow cap used by top riders.', 19.00, '/products/bottle_camelbak.webp', 250),
(6, 'Tacx Ciro Bottle Cage – Team DSM-Firmenich', 'Lightweight and strong with elite team graphics and excellent grip.', 24.99, '/products/bottle_cage_tacx.jpg', 200);
