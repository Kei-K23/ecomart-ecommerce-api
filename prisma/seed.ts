import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Electronics', description: 'Electronic gadgets and devices' },
  { name: 'Clothing', description: 'Fashion apparels and accessories' },
  { name: 'Home Appliances', description: 'Appliances for home use' },
  { name: 'Books', description: 'Literature and educational materials' },
  {
    name: 'Sports & Outdoors',
    description: 'Equipment for sports and outdoor activities',
  },
];

async function main() {
  await prisma.category.createMany({
    data: categories,
  });

  const eleCategory = await prisma.category.findFirst({
    where: {
      name: 'Electronics',
    },
  });
  const clothingCategory = await prisma.category.findFirst({
    where: {
      name: 'Clothing',
    },
  });
  const homeCategory = await prisma.category.findFirst({
    where: {
      name: 'Home Appliances',
    },
  });
  const bookCategory = await prisma.category.findFirst({
    where: {
      name: 'Books',
    },
  });
  const sportCategory = await prisma.category.findFirst({
    where: {
      name: 'Sports & Outdoors',
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Smartphone X',
        description: 'Latest flagship smartphone',
        price: 999,
        stock: 100,
        categoryId: eleCategory.id,
      },
      {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 1499,
        stock: 50,
        categoryId: eleCategory.id,
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise-canceling headphones with Bluetooth',
        price: 199,
        stock: 200,
        categoryId: eleCategory.id,
      },
      {
        name: 'Smartwatch',
        description: 'Fitness tracker with smart features',
        price: 299,
        stock: 150,
        categoryId: eleCategory.id,
      },
      {
        name: 'Gaming Console',
        description: 'Next-gen gaming console for immersive gaming experiences',
        price: 499,
        stock: 80,
        categoryId: eleCategory.id,
      },
      {
        name: 'Tablet',
        description: 'Portable tablet for productivity and entertainment',
        price: 399,
        stock: 120,
        categoryId: eleCategory.id,
      },
      {
        name: 'Smart Speaker',
        description: 'Voice-controlled smart speaker for home automation',
        price: 129,
        stock: 100,
        categoryId: eleCategory.id,
      },
      {
        name: 'Camera',
        description: 'High-resolution camera for capturing memories',
        price: 899,
        stock: 70,
        categoryId: eleCategory.id,
      },
      {
        name: 'Wireless Earbuds',
        description: 'Sleek earbuds with long battery life',
        price: 129,
        stock: 150,
        categoryId: eleCategory.id,
      },
      {
        name: 'Power Bank',
        description: 'Portable charger for smartphones and tablets',
        price: 49,
        stock: 200,
        categoryId: eleCategory.id,
      },
    ],
  });
  await prisma.product.createMany({
    data: [
      {
        name: "Men's Jacket",
        description: 'Stylish jacket for men',
        price: 79,
        stock: 150,
        categoryId: clothingCategory.id,
      },
      {
        name: "Women's Dress",
        description: 'Elegant dress for women',
        price: 129,
        stock: 120,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Sports Shoes',
        description: 'Comfortable shoes for sports activities',
        price: 89,
        stock: 100,
        categoryId: clothingCategory.id,
      },
      {
        name: 'T-shirts (Pack of 3)',
        description: 'Cotton t-shirts for everyday wear',
        price: 39,
        stock: 200,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Jeans',
        description: 'Classic denim jeans for casual outings',
        price: 59,
        stock: 80,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Sweatshirt',
        description: 'Cozy sweatshirt for chilly evenings',
        price: 49,
        stock: 120,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Formal Shirt',
        description: 'Button-down shirt for formal occasions',
        price: 69,
        stock: 100,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Summer Dress',
        description: 'Lightweight dress perfect for summer',
        price: 99,
        stock: 150,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Pants',
        description: 'Casual pants for everyday comfort',
        price: 49,
        stock: 130,
        categoryId: clothingCategory.id,
      },
      {
        name: 'Skirts',
        description: 'Stylish skirts for versatile looks',
        price: 79,
        stock: 100,
        categoryId: clothingCategory.id,
      },
    ],
  });
  await prisma.product.createMany({
    data: [
      {
        name: 'Smart TV',
        description: 'Ultra HD Smart TV with built-in streaming services',
        price: 799,
        stock: 80,
        categoryId: homeCategory.id,
      },
      {
        name: 'Coffee Maker',
        description:
          'Automatic coffee maker for brewing your favorite beverages',
        price: 49,
        stock: 200,
        categoryId: homeCategory.id,
      },
      {
        name: 'Vacuum Cleaner',
        description: 'Robotic vacuum cleaner for automated cleaning',
        price: 299,
        stock: 50,
        categoryId: homeCategory.id,
      },
      {
        name: 'Air Purifier',
        description: 'HEPA air purifier for cleaner indoor air',
        price: 199,
        stock: 100,
        categoryId: homeCategory.id,
      },
      {
        name: 'Toaster Oven',
        description: 'Compact toaster oven for quick meals',
        price: 79,
        stock: 120,
        categoryId: homeCategory.id,
      },
      {
        name: 'Microwave',
        description: 'Countertop microwave oven for convenient cooking',
        price: 129,
        stock: 80,
        categoryId: homeCategory.id,
      },
      {
        name: 'Blender',
        description: 'High-speed blender for smoothies and shakes',
        price: 69,
        stock: 150,
        categoryId: homeCategory.id,
      },
      {
        name: 'Rice Cooker',
        description: 'Automatic rice cooker for perfectly cooked rice',
        price: 39,
        stock: 200,
        categoryId: homeCategory.id,
      },
      {
        name: 'Electric Kettle',
        description: 'Stainless steel electric kettle for boiling water',
        price: 29,
        stock: 180,
        categoryId: homeCategory.id,
      },
      {
        name: 'Food Processor',
        description: 'Versatile food processor for chopping and blending',
        price: 89,
        stock: 100,
        categoryId: homeCategory.id,
      },
    ],
  });
  await prisma.product.createMany({
    data: [
      {
        name: 'Fantasy Novel',
        description: 'Bestselling fantasy novel by renowned author',
        price: 19,
        stock: 300,
        categoryId: bookCategory.id,
      },
      {
        name: 'Educational Book Set',
        description: 'Set of educational books for children',
        price: 59,
        stock: 100,
        categoryId: bookCategory.id,
      },
      {
        name: 'Self-Help Guide',
        description: 'Guidebook for personal development and growth',
        price: 29,
        stock: 150,
        categoryId: bookCategory.id,
      },
      {
        name: 'Mystery Thriller',
        description: 'Suspenseful thriller novel with unexpected twists',
        price: 24,
        stock: 120,
        categoryId: bookCategory.id,
      },
      {
        name: 'Cookbook',
        description: 'Collection of recipes from around the world',
        price: 39,
        stock: 200,
        categoryId: bookCategory.id,
      },
      {
        name: 'Biography',
        description: 'Inspiring biography of a notable figure',
        price: 29,
        stock: 80,
        categoryId: bookCategory.id,
      },
      {
        name: 'Historical Fiction',
        description: 'Engaging historical fiction set in a bygone era',
        price: 21,
        stock: 150,
        categoryId: bookCategory.id,
      },
      {
        name: 'Science Fiction',
        description:
          'Imaginative science fiction novel exploring futuristic concepts',
        price: 26,
        stock: 100,
        categoryId: bookCategory.id,
      },
      {
        name: 'Poetry Collection',
        description: 'Compilation of evocative poems on various themes',
        price: 19,
        stock: 130,
        categoryId: bookCategory.id,
      },
      {
        name: 'Art Book',
        description: 'Beautifully illustrated art book showcasing masterpieces',
        price: 49,
        stock: 100,
        categoryId: bookCategory.id,
      },
    ],
  });
  await prisma.product.createMany({
    data: [
      {
        name: 'Trekking Backpack',
        description: 'Durable backpack for outdoor adventures',
        price: 129,
        stock: 80,
        categoryId: sportCategory.id,
      },
      {
        name: 'Camping Tent',
        description: 'Spacious tent for camping trips',
        price: 199,
        stock: 40,
        categoryId: sportCategory.id,
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for indoor and outdoor practice',
        price: 39,
        stock: 150,
        categoryId: sportCategory.id,
      },
      {
        name: 'Soccer Ball',
        description: 'Official size and weight soccer ball for matches',
        price: 29,
        stock: 200,
        categoryId: sportCategory.id,
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes for jogging and sprinting',
        price: 89,
        stock: 120,
        categoryId: sportCategory.id,
      },
      {
        name: 'Hiking Boots',
        description: 'Sturdy hiking boots for rough terrain',
        price: 129,
        stock: 100,
        categoryId: sportCategory.id,
      },
      {
        name: 'Swimming Goggles',
        description: 'Adjustable swimming goggles for clear underwater vision',
        price: 19,
        stock: 150,
        categoryId: sportCategory.id,
      },
      {
        name: 'Bicycle Helmet',
        description: 'Safety helmet for cycling enthusiasts',
        price: 49,
        stock: 80,
        categoryId: sportCategory.id,
      },
      {
        name: 'Tennis Racket',
        description: 'Carbon fiber tennis racket for powerful shots',
        price: 99,
        stock: 100,
        categoryId: sportCategory.id,
      },
      {
        name: 'Golf Clubs Set',
        description: 'Complete set of golf clubs for tee-off',
        price: 299,
        stock: 60,
        categoryId: sportCategory.id,
      },
    ],
  });
}

main()
  .then(() => console.log('Successfully seeded the database'))
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect());
