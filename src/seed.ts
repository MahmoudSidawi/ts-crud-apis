import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Category } from './models/category.model';
import { Supplier } from './models/supplier.model';
import { Product } from './models/product.model';
import { Customer } from './models/customer.model';
import { Order } from './models/order.model';

dotenv.config();

const seed = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Order.deleteMany({});
    console.log('Data cleared.');

    // 1. Create 5 Suppliers
    console.log('Seeding Suppliers...');
    const suppliers = await Supplier.insertMany([
      { name: 'Global Tech Dist', contactName: 'John Doe', email: 'john@globaltech.com', phone: '1234567890', paymentTerms: 'Net 30', leadTimeDays: 7, isActive: true },
      { name: 'Apex Logistics & Goods', contactName: 'Jane Smith', email: 'jane@apex.com', phone: '9876543210', paymentTerms: 'Net 15', leadTimeDays: 5, isActive: true },
      { name: 'Prime Manufacturing', contactName: 'Bob Johnson', email: 'bob@primeman.com', phone: '5551234567', paymentTerms: 'COD', leadTimeDays: 14, isActive: true },
      { name: 'Elite Imports Ltd', contactName: 'Alice Green', email: 'alice@elite.com', phone: '4449876543', paymentTerms: 'Net 60', leadTimeDays: 21, isActive: true },
      { name: 'Local Supply Co', contactName: 'Charlie Brown', email: 'charlie@localsupply.com', phone: '3335557777', paymentTerms: 'Net 30', leadTimeDays: 3, isActive: true }
    ]);
    console.log(`Seeded ${suppliers.length} suppliers.`);

    // 2. Create 25 Categories (Meets "at least one table has 23 items" rule)
    console.log('Seeding Categories...');
    const categoryData = [];
    const mainCategories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports'];
    
    // Insert parent categories
    const parents = await Category.insertMany(
      mainCategories.map(name => ({
        name,
        slug: name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
        description: `All items related to ${name}`
      }))
    );

    // Generate 20 subcategories to hit 25 categories total
    const subNames = [
      'Smartphones', 'Laptops', 'Audio Devices', 'Smartwatches', 'Accessories',
      'Mens Wear', 'Womens Wear', 'Kids Wear', 'Shoes', 'Activewear',
      'Cookware', 'Furniture', 'Bedding', 'Home Decor', 'Appliances',
      'Fiction', 'Non-Fiction', 'Textbooks', 'Comics', 'Biographies'
    ];

    for (let i = 0; i < subNames.length; i++) {
      const parentIndex = i % parents.length;
      const name = subNames[i];
      categoryData.push({
        name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        parentId: parents[parentIndex]._id,
        description: `Sub-category for ${name}`
      });
    }
    const subCategories = await Category.insertMany(categoryData);
    const allCategories = [...parents, ...subCategories];
    console.log(`Seeded ${allCategories.length} categories.`);

    // 3. Create 25 Products (Also satisfying the 23 items rule)
    console.log('Seeding Products...');
    const productsData = [];
    for (let i = 1; i <= 25; i++) {
      const cat = allCategories[i % allCategories.length];
      const sup = suppliers[i % suppliers.length];
      productsData.push({
        sku: `PROD-${1000 + i}`,
        name: `Product ${i} (${cat.name})`,
        description: `This is the detailed description for Product ${i} belonging to ${cat.name}.`,
        categoryId: cat._id,
        supplierId: sup._id,
        sellingPrice: Math.round((20 + i * 5.5) * 100) / 100,
        costPrice: Math.round((10 + i * 3.2) * 100) / 100,
        quantityOnHand: Math.floor(Math.random() * 100) + 10,
        reorderPoint: 15,
        isActive: true
      });
    }
    const products = await Product.insertMany(productsData);
    console.log(`Seeded ${products.length} products.`);

    // 4. Create 5 Customers
    console.log('Seeding Customers...');
    const customers = await Customer.insertMany([
      { firstName: 'David', lastName: 'Miller', email: 'david@test.com', phone: '1112223333', loyaltyPoints: 120, totalSpent: 450.50 },
      { firstName: 'Sarah', lastName: 'Connor', email: 'sarah@test.com', phone: '4445556666', loyaltyPoints: 340, totalSpent: 1250.00 },
      { firstName: 'Bruce', lastName: 'Wayne', email: 'bruce@wayne.com', phone: '9998887777', loyaltyPoints: 5000, totalSpent: 99999.99 },
      { firstName: 'Peter', lastName: 'Parker', email: 'peter@dailybugle.com', phone: '1237894560', loyaltyPoints: 50, totalSpent: 150.25 },
      { firstName: 'Diana', lastName: 'Prince', email: 'diana@themyscira.gov', phone: '7777777777', loyaltyPoints: 850, totalSpent: 3400.00 }
    ]);
    console.log(`Seeded ${customers.length} customers.`);

    // 5. Create 5 Orders
    console.log('Seeding Orders...');
    const ordersData = [];
    const statuses: ('pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled')[] = [
      'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
    ];

    for (let i = 0; i < 5; i++) {
      const cust = customers[i];
      const prod1 = products[i];
      const prod2 = products[i + 5];

      const item1Qty = 2;
      const item2Qty = 1;
      const item1Total = prod1.sellingPrice * item1Qty;
      const item2Total = prod2.sellingPrice * item2Qty;
      const subtotal = item1Total + item2Total;
      const tax = Math.round((subtotal * 0.1) * 100) / 100;
      const grandTotal = subtotal + tax;

      ordersData.push({
        orderNumber: `ORD-${2026000 + i}`,
        customerId: cust._id,
        status: statuses[i],
        items: [
          {
            productId: prod1._id,
            sku: prod1.sku,
            name: prod1.name,
            quantity: item1Qty,
            unitPrice: prod1.sellingPrice,
            lineTotal: item1Total
          },
          {
            productId: prod2._id,
            sku: prod2.sku,
            name: prod2.name,
            quantity: item2Qty,
            unitPrice: prod2.sellingPrice,
            lineTotal: item2Total
          }
        ],
        subtotal,
        tax,
        grandTotal
      });
    }
    const orders = await Order.insertMany(ordersData);
    console.log(`Seeded ${orders.length} orders.`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
