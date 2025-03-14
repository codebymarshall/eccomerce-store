import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear previous data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const hashedPassword = await bcrypt.hash('adminpassword', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
    },
  });

  console.log('Created admin user:', admin.email);

  // Create regular user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      password: await bcrypt.hash('userpassword', 10),
    },
  });

  console.log('Created regular user:', user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Clothing',
        description: 'Shirts, pants, and other wearables',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home & Garden',
        description: 'Items for your home and garden',
        image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGFuZCUyMGdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D',
      },
    }),
  ]);

  console.log('Created categories:', categories.map(c => c.name).join(', '));

  // Create products
  const products = await Promise.all([
    // Electronics products
    prisma.product.create({
      data: {
        name: 'Smartphone X',
        description: 'Latest flagship smartphone with amazing features',
        price: 899.99,
        inventory: 50,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D',
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBob25lfGVufDB8fDB8fHww',
        ],
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Pro',
        description: 'Powerful laptop for professionals',
        price: 1299.99,
        inventory: 30,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
        ],
        categoryId: categories[0].id,
      },
    }),
    
    // Clothing products
    prisma.product.create({
      data: {
        name: 'Classic T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 24.99,
        inventory: 100,
        isFeatured: false,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
          'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
        ],
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans',
        price: 49.99,
        inventory: 75,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGplYW5zfGVufDB8fDB8fHww',
        ],
        categoryId: categories[1].id,
      },
    }),
    
    // Home & Garden products
    prisma.product.create({
      data: {
        name: 'Ceramic Planter',
        description: 'Beautiful ceramic planter for indoor plants',
        price: 29.99,
        inventory: 40,
        isFeatured: false,
        images: [
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRlcnxlbnwwfHwwfHx8MA%3D%3D',
          'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnRlcnxlbnwwfHwwfHx8MA%3D%3D',
        ],
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Kitchen Knife Set',
        description: 'Professional 5-piece kitchen knife set',
        price: 89.99,
        inventory: 25,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a25pZmUlMjBzZXR8ZW58MHx8MHx8fDA%3D',
          'https://images.unsplash.com/photo-1566454055883-b0a3a5178252?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a25pZmUlMjBzZXR8ZW58MHx8MHx8fDA%3D',
        ],
        categoryId: categories[2].id,
      },
    }),
  ]);

  console.log('Created products:', products.map(p => p.name).join(', '));

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'PROCESSING',
      total: 924.98,
      paymentIntentId: 'pi_' + Math.random().toString(36).substring(2, 15),
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA',
      },
    },
  });

  // Add order items
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: products[0].id, // Smartphone
      quantity: 1,
      price: 899.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: products[4].id, // Ceramic Planter
      quantity: 1,
      price: 24.99,
    },
  });

  // Create another order
  const order2 = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'DELIVERED',
      total: 1349.98,
      paymentIntentId: 'pi_' + Math.random().toString(36).substring(2, 15),
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA',
      },
    },
  });

  // Add order items
  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: products[1].id, // Laptop Pro
      quantity: 1,
      price: 1299.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: products[2].id, // Classic T-Shirt
      quantity: 2,
      price: 24.99,
    },
  });

  console.log('Created orders with items');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 