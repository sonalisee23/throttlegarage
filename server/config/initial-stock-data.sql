-- Insert sample warehouses
INSERT INTO warehouses (name, address, latitude, longitude) VALUES
('East Coast Distribution Center', 
 JSON_OBJECT(
    'street', '123 Warehouse Ave',
    'city', 'Edison',
    'state', 'NJ',
    'zip', '08837'
 ),
 40.518699,
 -74.412109
),
('West Coast Distribution Center',
 JSON_OBJECT(
    'street', '456 Logistics Blvd',
    'city', 'Ontario',
    'state', 'CA',
    'zip', '91761'
 ),
 34.063344,
 -117.650888
),
('Central Distribution Center',
 JSON_OBJECT(
    'street', '789 Supply Chain Dr',
    'city', 'Dallas',
    'state', 'TX',
    'zip', '75261'
 ),
 32.896828,
 -97.040443
);

-- Insert delivery zones (using first 3 digits of ZIP codes)
INSERT INTO delivery_zones (warehouse_id, zip_code_pattern, estimated_days_min, estimated_days_max) VALUES
-- East Coast Warehouse (NJ)
(1, '070%', 1, 2),  -- Northern NJ
(1, '080%', 1, 2),  -- Central NJ
(1, '190%', 2, 3),  -- Philadelphia
(1, '100%', 1, 2),  -- NYC
(1, '020%', 2, 3),  -- Boston

-- West Coast Warehouse (CA)
(2, '900%', 1, 2),  -- Los Angeles
(2, '940%', 2, 3),  -- San Francisco
(2, '980%', 2, 4),  -- Seattle
(2, '970%', 2, 4),  -- Portland
(2, '890%', 2, 3),  -- Las Vegas

-- Central Warehouse (TX)
(3, '750%', 1, 2),  -- Dallas
(3, '770%', 2, 3),  -- Houston
(3, '730%', 2, 3),  -- Oklahoma City
(3, '870%', 2, 3),  -- Little Rock
(3, '631%', 2, 4);  -- Kansas City

-- Insert sample inventory data
INSERT INTO warehouse_inventory (warehouse_id, product_id, quantity, restock_eta)
SELECT 
    w.id as warehouse_id,
    p.id as product_id,
    FLOOR(RAND() * 50) as quantity,
    CASE 
        WHEN RAND() < 0.2 THEN DATE_ADD(CURRENT_DATE, INTERVAL FLOOR(RAND() * 30) DAY)
        ELSE NULL
    END as restock_eta
FROM warehouses w
CROSS JOIN products p
WHERE p.id <= 10;  -- Only add inventory for first 10 products for this example 