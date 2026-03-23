export interface Product {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  weight: string
  category: string
  image: string
  inStock: boolean
  featured: boolean
}

export const categories = [
  'All Products',
  'Tropical Fruits',
  'Seasonal Specials',
  'Berry Collection',
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Mango Pulp',
    description: 'Sweet and tangy mango pulp from Alphonso mangoes',
    fullDescription: `Experience the king of fruits in its purest form. Our Alphonso Mango Pulp is sourced from the finest farms in Udaipur, handpicked at peak ripeness to ensure maximum sweetness and flavor.\n\nPerfect for making smoothies, desserts, or simply enjoying as is. No added sugar, no preservatives - just 100% natural mango goodness.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 450,
    weight: '1kg',
    category: 'Tropical Fruits',
    image: '/images/mango-pulp.png',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Jamun Pulp',
    description: 'Rich and nutritious black plum pulp with natural sweetness',
    fullDescription: `Discover the unique flavor of Jamun (Black Plum), a superfruit known for its health benefits and distinctive taste. Our Jamun Pulp captures the essence of this seasonal delicacy.\n\nHigh in antioxidants and natural nutrients, perfect for health-conscious consumers. Great for making refreshing drinks, desserts, or traditional Indian sweets.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 480,
    weight: '1kg',
    category: 'Seasonal Specials',
    image: '/images/jamun-pulp.jpg',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Guava Pulp',
    description: 'Aromatic and sweet guava pulp packed with vitamin C',
    fullDescription: `Our Guava Pulp brings the tropical taste of fresh guavas right to your kitchen. Sourced from the lush farms of Udaipur, each batch is carefully processed to retain the natural aroma and nutritional value.\n\nRich in Vitamin C and dietary fiber, perfect for boosting immunity. Ideal for smoothies, juices, ice creams, and traditional desserts.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 420,
    weight: '1kg',
    category: 'Tropical Fruits',
    image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWF2YSUyMGZydWl0fGVufDF8fHx8MTc3Mzg0NzY0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Strawberry Pulp',
    description: 'Fresh and vibrant strawberry pulp with natural sweetness',
    fullDescription: `Indulge in the sweet and tangy flavor of premium strawberries. Our Strawberry Pulp is made from carefully selected berries, processed to maintain their vibrant color and fresh taste.\n\nPerfect for milkshakes, cakes, pastries, and breakfast bowls. Contains no artificial colors or flavors - just pure strawberry goodness.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 520,
    weight: '1kg',
    category: 'Berry Collection',
    image: '/images/strawberry-pulp.jpg',
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    name: 'Papaya Pulp',
    description: 'Smooth and creamy papaya pulp rich in enzymes',
    fullDescription: `Experience the tropical goodness of ripe papayas in our pure pulp form. Known for its digestive properties and rich nutritional profile, our Papaya Pulp is a healthy addition to your diet.\n\nContains natural papain enzyme for better digestion. Great for smoothies, baby food, and tropical desserts.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 400,
    weight: '1kg',
    category: 'Tropical Fruits',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBheWElMjBmcnVpdHxlbnwxfHx8fDE3NzM4NDc2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Mixed Berry Pulp',
    description: 'A delightful blend of strawberries, blueberries, and raspberries',
    fullDescription: `Our signature Mixed Berry Pulp combines the finest berries for a burst of flavors and antioxidants. This premium blend is perfect for health enthusiasts and flavor lovers alike.\n\nPacked with vitamins, minerals, and antioxidants. Perfect for smoothie bowls, yogurt parfaits, and gourmet desserts.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 550,
    weight: '1kg',
    category: 'Berry Collection',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMGJlcnJpZXN8ZW58MXx8fHwxNzczODQ3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: false,
    featured: false,
  },
  {
    id: '7',
    name: 'Pineapple Pulp',
    description: 'Tangy and sweet pineapple pulp bursting with tropical flavor',
    fullDescription: `Transport yourself to the tropics with our fresh Pineapple Pulp. Made from handpicked pineapples, this pulp retains all the natural sweetness and tanginess that makes pineapple so beloved.\n\nRich in Vitamin C and bromelain enzyme. Perfect for tropical drinks, desserts, and marinades.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 440,
    weight: '1kg',
    category: 'Tropical Fruits',
    image: 'https://images.unsplash.com/photo-1550828486-e4ac3d5b3f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBmcnVpdHxlbnwxfHx8fDE3NzM4NDc2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Pomegranate Pulp',
    description: 'Ruby red pomegranate pulp with sweet-tart flavor',
    fullDescription: `Our Pomegranate Pulp captures the jewel-like essence of fresh pomegranates. Known for its numerous health benefits, this superfruit pulp is both delicious and nutritious.\n\nRich in antioxidants and anti-inflammatory properties. Perfect for juices, smoothies, and gourmet dishes.\n\nStorage: Keep refrigerated after opening. Consume within 3 days of opening.`,
    price: 500,
    weight: '1kg',
    category: 'Seasonal Specials',
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb21lZ3JhbmF0ZSUyMGZydWl0fGVufDF8fHx8MTc3Mzg0NzY0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    featured: false,
  },
]
