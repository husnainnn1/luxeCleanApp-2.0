
USE railway;

INSERT INTO services (item, description, price, category) VALUES
('Zip Replacement', 'Repair & insert new zip', '£10.00', 'Alterations'),
('Trouser Hemming', 'Shorten leg length', '£7.50', 'Alterations'),
('Jacket Lining', 'Replace full inner lining', '£25.00', 'Alterations'),
('Sleeve Shortening', 'Tailored cut adjustment', '£12.00', 'Alterations'),
('Eco Stitch Repair', 'Recycled thread stitching', '£6.00', 'Alterations'),

('School Blazer', 'Uniform dry clean', '£7.00', 'Childwear'),
('School Shirt', 'Crisp press finish', '£3.50', 'Childwear'),
('Raincoat (Kids)', 'Gentle fabric care', '£9.00', 'Childwear'),

('Two-Piece Suit (Wool Blend)', 'Dry cleaned with precision press', '£14.65', 'Clothing'),
('Three-Piece Suit (Linen)', 'Pressed and hand finished', '£18.74', 'Clothing'),
('Dinner Jacket (Velvet)', 'Specialist velvet treatment', '£19.50', 'Clothing'),
('Trousers (Formal)', 'Professional crease and clean', '£8.00', 'Clothing'),
('Jeans (Denim)', 'Color-safe denim wash', '£6.50', 'Clothing'),
('Shirt (Cotton)', 'Laundry and press', '£3.80', 'Clothing'),
('Shirt (Silk)', 'Delicate fabric handling', '£5.50', 'Clothing'),
('Tie (Silk)', 'Spot treated and steamed', '£4.75', 'Clothing'),
('Waistcoat (Wool)', 'Steam and hand finish', '£7.00', 'Clothing'),
('Jacket (Casual)', 'Regular use cleaning', '£10.50', 'Clothing'),
('Blazer (Linen)', 'Gentle clean and shape', '£11.50', 'Clothing'),
('Overcoat (Wool)', 'Heavy garment deep clean', '£15.00', 'Clothing'),
('Raincoat (Waterproof)', 'Waterproof fabric service', '£13.00', 'Clothing'),
('Puffer Jacket (Down)', 'Feather-safe cleaning', '£18.00', 'Clothing'),
('Knitwear (Cashmere)', 'Low heat delicate clean', '£9.00', 'Clothing'),
('Sweatshirt (Cotton Blend)', 'Casual wear freshen up', '£6.00', 'Clothing'),
('Hoodie (Fleece)', 'Soft texture retention', '£7.00', 'Clothing'),
('Shorts (Casual)', 'Pressed and refreshed', '£5.00', 'Clothing'),
('Polo Shirt (Cotton)', 'Sporty wear service', '£4.50', 'Clothing'),
('T-Shirt (Organic Cotton)', 'Eco-safe detergent used', '£4.00', 'Clothing'),

('Eco Shirt', 'Biodegradable detergent', '£4.50', 'Eco-friendly'),
('Bamboo Dress', 'Natural fiber wash', '£10.00', 'Eco-friendly'),
('Recycled Jacket', 'Low-energy cycle', '£12.00', 'Eco-friendly'),
('Eco Detergent Add-on', 'Extra per item', '£0.50', 'Eco-friendly'),
('Upcycling (Per Item)', 'Turn old into new', '£20.00', 'Eco-friendly'),

('Curtains (Blackout)', 'Heavy-duty lining service', '£7.20/sq.m', 'Household'),
('Duvet (Double, Feather)', 'Deep hygienic feather wash', '£25.50', 'Household'),
('Bedspread (King)', 'Full spread treatment', '£22.20', 'Household'),
('Blanket (King)', 'Thick material cleaning', '£18.00', 'Household'),
('Mattress Protector (Double)', 'Barrier clean service', '£17.25', 'Household'),

('Shirt (Wash & Press)', 'Pressed and folded', '£3.80', 'Laundry'),
('Dress (Wash & Press)', 'Ready-to-wear finish', '£8.75', 'Laundry'),
('Coat (Wash & Press)', 'Heavy item service', '£14.80', 'Laundry'),
('Pillowcase', 'Soft press service', '£1.95', 'Laundry'),
('Duvet Cover (King)', 'Allergy-safe rinse', '£9.90', 'Laundry'),

('Wedding Dress', 'Delicate and intricate cleaning', '£80.00', 'Specialty'),
('Leather Jacket', 'Specialist leather care', '£35.00', 'Specialty'),
('Down Jacket', 'Insulated winter cleaning', '£25.00', 'Specialty'),
('Eco Wedding Dress', 'Plant-based solvent wash', '£85.00', 'Specialty'),
('Blazer (Wool)', 'Dry clean and hand press', '£11.20', 'Specialty'),
('Overalls', 'Workwear wash and repair', '£9.00', 'Specialty'),
('Lab Coat', 'Sterile and chemical-safe clean', '£10.00', 'Specialty');

-- Select data for testing
SELECT * FROM services WHERE item LIKE '%specialty%' OR description LIKE '%specialty%';
SHOW DATABASES;
USE railway;
SHOW TABLES;
SELECT COUNT(*) FROM services;


