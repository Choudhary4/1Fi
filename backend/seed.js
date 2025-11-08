import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    variant: '256GB',
    price: 127400,
    originalPrice: 134900,
    mrp: 134900,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibVB1OWIzMk5Pa05pM0VtRDBtTXRCK3dUMngwVnJycmY0WkN2ZnNvOUpFNFVySWdQb3VEUWpYcGVsTHFTOGJoTUlHSUJ3a0VmOGVMVEgzQ0RPMWN2TERB&traceId=1',
    badge: 'NEW',
    colors: [
      {
        name: 'Desert Titanium',
        code: '#e4a07c',
        image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-model-unselect-gallery-2-202509_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=90&.v=dU9qRExIQUlQTzVKeDd1V1dtUE1MUWFRQXQ2R0JQTk5udUZxTkR3ZVlpTEJBSVhDREVhQVF4eThVb2E3Y2VibVB1OWIzMk5Pa05pM0VtRDBtTXRCK3dUMngwVnJycmY0WkN2ZnNvOUpFNFVySWdQb3VEUWpYcGVsTHFTOGJoTUlHSUJ3a0VmOGVMVEgzQ0RPMWN2TERB&traceId=1'
      },
      {
        name: 'Natural Titanium',
        code: '#c0c0c0',
        image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&q=80'
      },
      {
        name: 'White Titanium',
        code: '#f5f5f5',
        image: 'https://electronicparadise.in/cdn/shop/files/ZHHBBe1CSj-apple-iphone-17-pro-494741637-i-1-1200wx1200h_1.avif?v=1760446769&width=1000'
      },
      {
        name: 'Black Titanium',
        code: '#2c2c2c',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80'
      }
    ],
    emiPlans: [
      { tenure: 3, monthlyPayment: 44967, interestRate: 0 },
      { tenure: 6, monthlyPayment: 22483, interestRate: 0 },
      { tenure: 12, monthlyPayment: 11242, interestRate: 0 },
      { tenure: 24, monthlyPayment: 5621, interestRate: 0 },
      { tenure: 36, monthlyPayment: 4297, interestRate: 10.5, cashback: 7500 },
      { tenure: 48, monthlyPayment: 3385, interestRate: 10.5, cashback: 7500 },
      { tenure: 60, monthlyPayment: 2842, interestRate: 10.5, cashback: 7500 }
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    variant: '512GB',
    price: 119999,
    originalPrice: 129999,
    mrp: 129999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    badge: 'BESTSELLER',
    colors: [
      {
        name: 'Titanium Gray',
        code: '#8c8c8c',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'
      },
      {
        name: 'Titanium Black',
        code: '#1a1a1a',
        image: 'https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=800&q=80'
      },
      {
        name: 'Titanium Violet',
        code: '#9b59b6',
        image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80'
      }
    ],
    emiPlans: [
      { tenure: 3, monthlyPayment: 40000, interestRate: 0 },
      { tenure: 6, monthlyPayment: 20000, interestRate: 0 },
      { tenure: 12, monthlyPayment: 10000, interestRate: 0 },
      { tenure: 24, monthlyPayment: 5300, interestRate: 10.5, cashback: 5000 },
      { tenure: 36, monthlyPayment: 3850, interestRate: 10.5, cashback: 6000 },
      { tenure: 48, monthlyPayment: 3100, interestRate: 10.5, cashback: 6000 }
    ]
  },
  {
    name: 'OnePlus 12',
    slug: 'oneplus-12',
    variant: '256GB',
    price: 64999,
    originalPrice: 69999,
    mrp: 69999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    badge: 'HOT DEAL',
    colors: [
      {
        name: 'Flowy Emerald',
        code: '#50c878',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
      },
      {
        name: 'Silky Black',
        code: '#000000',
        image: 'https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=800&q=80'
      }
    ],
    emiPlans: [
      { tenure: 3, monthlyPayment: 21666, interestRate: 0 },
      { tenure: 6, monthlyPayment: 10833, interestRate: 0 },
      { tenure: 12, monthlyPayment: 5417, interestRate: 0 },
      { tenure: 24, monthlyPayment: 2900, interestRate: 10.5, cashback: 3000 },
      { tenure: 36, monthlyPayment: 2100, interestRate: 10.5, cashback: 3500 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Database seeded successfully with products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
