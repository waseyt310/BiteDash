import { db } from './firebase';
import { collection, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';
import { GroceryProduct, GroceryCategory, ExclusiveDeal } from '../types/store';

const CATEGORIES: GroceryCategory[] = [
  { id: '1', name: 'Fruits & Vegetables', icon: '🍎' },
  { id: '2', name: 'Meat & Seafood', icon: '🥩' },
  { id: '3', name: 'Dairy Products', icon: '🥛' },
  { id: '4', name: 'Frozen Foods', icon: '🍦' },
  { id: '5', name: 'Snacks', icon: '🍟' },
  { id: '6', name: 'Beverages', icon: '🥤' },
  { id: '7', name: 'Bakery', icon: '🥐' },
  { id: '8', name: 'Instant Noodles', icon: '🍜' },
  { id: '9', name: 'Rice & Grains', icon: '🌾' },
  { id: '10', name: 'Breakfast Items', icon: '🥣' },
  { id: '11', name: 'Condiments & Sauces', icon: '🥫' },
  { id: '12', name: 'Personal Care', icon: '🧴' },
  { id: '13', name: 'Household Essentials', icon: '🧹' },
  { id: '14', name: 'Baby Products', icon: '👶' },
  { id: '15', name: 'Pet Supplies', icon: '🐕' },
  { id: '16', name: 'Organic Products', icon: '🌿' },
];

const BRANDS = ['Nature Choice', 'Golden Farm', 'Fresh Cuts', 'Coca-Cola', 'Pampers', 'Colgate', 'Nestle', 'Kraft', 'Unilever', 'Selecta', 'Gardenia', 'Lucky Me', 'San Miguel'];

function generateProductsForCategory(categoryName: string, count: number): GroceryProduct[] {
  const products: GroceryProduct[] = [];
  const baseImages: Record<string, string[]> = {
    'Fruits & Vegetables': [
      'https://images.unsplash.com/photo-1571771894821-ad9902537327?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1550258114-63027b4097f4?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400',
    ],
    'Meat & Seafood': [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400',
    ],
    'Dairy Products': [
      'https://images.unsplash.com/photo-1518562144211-12c8751dbd66?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1486297678162-ad2a19b05840?auto=format&fit=crop&w=400',
    ],
    'Snacks': [
      'https://images.unsplash.com/photo-1599490659213-e2b9527ec087?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400',
    ],
    'Beverages': [
      'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400',
    ],
  };

  const productNames: Record<string, string[]> = {
    'Fruits & Vegetables': ['Bananas', 'Red Apples', 'Navel Oranges', 'Ripe Mangoes', 'Seedless Watermelon', 'Iceberg Lettuce', 'Cherry Tomatoes', 'Russet Potatoes', 'Red Onions', 'Baby Carrots', 'Broccoli Florets', 'Fresh Garlic', 'Bell Peppers', 'Organic Spinach', 'English Cucumbers'],
    'Meat & Seafood': ['Chicken Breast', 'Whole Chicken', 'Pork Belly', 'Angus Beef Steak', 'Ground Beef 90/10', 'Atlantic Salmon Fillet', 'White Shrimp', 'Fresh Tuna', 'Live Crab', 'Frozen Squid Ring', 'Smoked Bacon', 'Breakfast Sausages'],
    'Dairy Products': ['Fresh Whole Milk', 'Low Fat Milk', 'Cheddar Cheese Block', 'Salted Butter', 'Greek Yogurt', 'Cream Cheese', 'Whipping Cream', 'Large Brown Eggs', 'Margarine Spread'],
    'Frozen Foods': ['French Fries', 'Vanilla Ice Cream', 'Chicken Nuggets', 'Frozen Pepperoni Pizza', 'Pork Dumplings', 'Mixed Vegetables', 'Fish Balls', 'Beef Hotdogs'],
    'Snacks': ['Classic Potato Chips', 'Chocolate Chip Cookies', 'Dark Chocolate Bar', 'Salted Crackers', 'Butter Popcorn', 'Gummy Candy', 'Trail Mix', 'Whey Protein Bar'],
    'Beverages': ['Coca-Cola 1.5L', 'Mineral Water 500ml', 'Fresh Orange Juice', 'Energy Drink', 'Instant Coffee Pack', 'Green Tea Bags', 'Isotonic Sports Drink', 'Classic Milk Tea'],
    'Bakery': ['White Sliced Bread', 'Whole Wheat Bread', 'Butter Croissant', 'Glazed Donuts', 'Blueberry Muffins', 'Chocolate Ganache Cake', 'Oatmeal Cookies', 'Soft Pandesal'],
    'Instant Noodles': ['Lucky Me Pancit Canton', 'Nissin Seafood Ramen', 'Cup Noodles Beef', 'Samyang Spicy Noodles', 'Beef Pares Noodles', 'Chicken Mami Noodles'],
    'Rice & Grains': ['Premium Jasmine Rice', 'Healthy Brown Rice', 'Thai Sticky Rice', 'Instant Rolled Oats', 'Organic Quinoa', 'White Corn Grits'],
    'Breakfast Items': ['Honey Nut Cheerios', 'Instant Oatmeal', 'Pancake Mix', 'Maple Syrup', 'Creamy Peanut Butter', 'Strawberry Jam', 'Coffee Creamer'],
    'Condiments & Sauces': ['Tomato Ketchup', 'Real Mayonnaise', 'Premium Soy Sauce', 'Cane Vinegar', 'Sweet Chili Sauce', 'Marinara Pasta Sauce', 'Caesar Salad Dressing'],
    'Personal Care': ['Anti-Dandruff Shampoo', 'Moisturizing Soap', 'Whitening Toothpaste', 'Soft Toothbrush', 'Body Lotion', 'Sport Deodorant', 'Gentle Facial Wash'],
    'Household Essentials': ['Liquid Laundry Detergent', 'Lemon Dishwashing Liquid', 'Large Trash Bags', 'Soft Tissue 12pk', 'Kitchen Paper Towels', 'Multipurpose Cleaning Spray'],
    'Baby Products': ['Ultra Soft Diapers', 'Fragrance-Free Wipes', 'Premium Baby Formula', 'No-Tears Baby Shampoo', 'Soothing Baby Powder'],
    'Pet Supplies': ['Adult Dog Food 5kg', 'Gourmet Cat Food', 'Natural Pet Shampoo', 'Tasty Dog Treats', 'Clumping Cat Litter'],
    'Organic Products': ['Organic Spinach', 'Organic Free-Range Eggs', 'Organic Raw Milk', 'Organic Kale Chips', 'Fair Trade Organic Coffee'],
  };

  const names = productNames[categoryName] || ['Sample Product'];
  const images = baseImages[categoryName] || ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400'];

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : '');
    const price = parseFloat((Math.random() * 20 + 2).toFixed(2));
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30 + 5) : undefined;
    
    products.push({
      id: `prod_${categoryName.toLowerCase().replace(/\s/g, '_')}_${i}`,
      name,
      brand: BRANDS[Math.floor(Math.random() * BRANDS.length)],
      category: categoryName,
      subcategory: 'General',
      description: `Premium quality ${name} sourced from top suppliers. Perfect for your daily needs.`,
      price,
      originalPrice: discount ? parseFloat((price / (1 - discount / 100)).toFixed(2)) : undefined,
      discount,
      unit: i % 2 === 0 ? '1kg' : '500g',
      image: images[i % images.length],
      inStock: true,
      stockCount: Math.floor(Math.random() * 100 + 10),
      deliveryEta: `${Math.floor(Math.random() * 30 + 15)} mins`,
      isFlashSale: Math.random() > 0.9,
      flashSaleEnds: Date.now() + 3600000 * 4,
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 500 + 10),
      isBestseller: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      isOrganic: categoryName === 'Organic Products' || Math.random() > 0.85,
      sku: `SKU-${Math.random().toString(36).substring(7).toUpperCase()}`,
      ingredients: 'Organic components, essential vitamins, natural preservatives.',
      nutritionalInfo: 'Calories: 150, Fat: 5g, Protein: 4g, Carbs: 20g',
      tags: [categoryName, 'Fresh', 'Popular'],
      createdAt: Date.now(),
    });
  }

  return products;
}

export async function seedGroceryData() {
  const categoriesRef = collection(db, 'grocery_categories');
  const productsRef = collection(db, 'groceries');
  
  const catsSnapshot = await getDocs(categoriesRef);
  const prodsSnapshot = await getDocs(productsRef);
  
  if (catsSnapshot.empty || prodsSnapshot.size < 10) {
    console.log('Starting extensive seed process (Data missing or insufficient)...');
    const batch = writeBatch(db);
    
    CATEGORIES.forEach(cat => {
      const docRef = doc(categoriesRef, cat.id);
      batch.set(docRef, cat);
    });

    const productsRef = collection(db, 'groceries');
    let totalSeeded = 0;

    for (const cat of CATEGORIES) {
      const prods = generateProductsForCategory(cat.name, 15); // 15 per category = 240 products total
      prods.forEach(prod => {
        const docRef = doc(productsRef, prod.id);
        batch.set(docRef, prod);
        totalSeeded++;
      });
    }

    const exclusivesRef = collection(db, 'exclusives');
    const exclusives: ExclusiveDeal[] = [
      {
        id: 'e1',
        title: 'Japanese Wagyu Beef',
        description: 'A5 Grade Wagyu beef imported directly from Hokkaido. Known for its intense marbling and melt-in-your-mouth texture.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200',
        category: 'Premium Meat',
        discount: 20,
        rating: 5.0,
        reviews: 124,
        limitedStock: true,
        endsAt: Date.now() + 3600000 * 24,
        isVipOnly: false,
        badge: 'EXCLUSIVE'
      },
      {
        id: 'e2',
        title: 'Korean Premium Snack Box',
        description: 'A curated selection of the most popular and rare snacks from South Korea. Limited monthly edition.',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800',
        category: 'Imported Snacks',
        discount: 10,
        rating: 4.8,
        reviews: 89,
        limitedStock: false,
        endsAt: Date.now() + 3600000 * 48,
        isVipOnly: true,
        badge: 'VIP ACCESS'
      },
      {
        id: 'e3',
        title: 'Vintage Bordeaux 2015',
        description: 'A rich, complex red wine with notes of dark berries and subtle oak. Perfect for celebratory dinners.',
        image: 'https://images.unsplash.com/photo-1510850478974-bc23a9503fe2?auto=format&fit=crop&w=800',
        category: 'Wine & Spirits',
        discount: 15,
        rating: 4.9,
        reviews: 56,
        limitedStock: true,
        endsAt: Date.now() + 3600000 * 72,
        isVipOnly: true,
        badge: 'PREMIUM'
      }
    ];

    exclusives.forEach(exc => {
      const docRef = doc(exclusivesRef, exc.id);
      batch.set(docRef, exc);
    });

    await batch.commit();
    console.log(`Seeding complete. Seeded ${CATEGORIES.length} categories and ${totalSeeded} products.`);
  }
}
