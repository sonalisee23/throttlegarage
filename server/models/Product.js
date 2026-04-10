const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['helmets', 'riding-gear', 'apparel', 'bike-parts']
    },
    subCategory: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    specifications: {
        type: Map,
        of: String
    },
    compatibleBikes: [{
        make: String,
        model: String,
        year: Number
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    isGovernmentApproved: {
        type: Boolean,
        default: false
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
    if (this.ratings.length > 0) {
        this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 