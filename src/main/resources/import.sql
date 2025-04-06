-- Insertar categorías
INSERT INTO categories (id, name) VALUES (1, 'Tecnología');
INSERT INTO categories (id, name) VALUES (2, 'Videojuegos');
INSERT INTO categories (id, name) VALUES (3, 'Electrodomésticos');
INSERT INTO categories (id, name) VALUES (4, 'Moda');

-- Insertar productos (uno por uno)
INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (1, 'iPhone 14', 'iPhone 14 Pro Max', 1000.0, 10, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 1);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (2, 'PlayStation 5', 'PlayStation 5 edición estándar', 1000.0, 10, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 2);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (3, 'Samsung Galaxy S23', 'Smartphone Samsung S23 Ultra', 950.0, 15, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 1);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (4, 'Xbox Series X', 'Consola Xbox Series X 1TB', 900.0, 12, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 2);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (5, 'MacBook Air M2', 'Laptop Apple MacBook Air con chip M2', 1200.0, 8, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 1);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (6, 'Nintendo Switch OLED', 'Consola Nintendo Switch OLED', 350.0, 20, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 2);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (7, 'Refrigeradora LG', 'Refrigeradora LG 350L', 800.0, 5, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (8, 'Microondas Samsung', 'Microondas digital Samsung 32L', 150.0, 18, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (9, 'Reloj Inteligente Apple', 'Apple Watch Series 8', 450.0, 14, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 1);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (10, 'Camiseta Nike', 'Camiseta deportiva Nike para hombre', 30.0, 50, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 4);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (11, 'Pantalón Levi’s', 'Pantalón de mezclilla Levi’s 501', 70.0, 35, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 4);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (12, 'Lavadora Whirlpool', 'Lavadora automática 18 kg', 600.0, 10, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (13, 'Audífonos Sony', 'Audífonos inalámbricos Sony WH-1000XM5', 400.0, 25, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 1);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (14, 'Zapatillas Adidas', 'Zapatillas Adidas deportivas', 85.0, 40, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 4);

INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (15, 'Aspiradora Dyson', 'Aspiradora Dyson V15 Detect', 700.0, 7, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);
INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (16, 'Aspiradora Bosch', 'Aspiradora BOSH super fast', 700.0, 7, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);
INSERT INTO products (id, title, description, price, stock, image_url, category_id) VALUES (17, 'Aspiradora Oster', 'Aspiradora Oster super new', 700.0, 7, 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', 3);

-- Ajustar la secuencia de ID para evitar conflictos
ALTER SEQUENCE categories_id_seq RESTART WITH 5;
ALTER SEQUENCE products_id_seq RESTART WITH 16;
