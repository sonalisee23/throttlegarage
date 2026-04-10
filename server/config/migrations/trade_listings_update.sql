-- Update trade_listings table
ALTER TABLE trade_listings
    MODIFY COLUMN condition ENUM('New', 'Like New', 'Good', 'Fair', 'Poor') NOT NULL,
    MODIFY COLUMN price DECIMAL(10, 2) NOT NULL,
    MODIFY COLUMN trade_preference VARCHAR(255),
    MODIFY COLUMN category ENUM('Engine Parts', 'Body Parts', 'Accessories', 'Electronics', 'Other') NOT NULL,
    MODIFY COLUMN images JSON,
    MODIFY COLUMN status ENUM('Active', 'Pending', 'Sold', 'Traded', 'Inactive') DEFAULT 'Active'; 