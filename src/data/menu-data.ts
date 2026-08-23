import gateauSlice from '@/assets/gateau-slice.jpg';
import morningBakes from '@/assets/morning-bakes.jpg';
import heroCake from '@/assets/hero-cake.jpg';
import mangoCake from '@/assets/mango-cake.jpg';
import lemonTart from '@/assets/lemon-tart.jpg';
import strawberryFraisier from '@/assets/strawberry-fraisier.jpg';
import financiers from '@/assets/financiers.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';

export {
  gateauSlice,
  morningBakes,
  heroCake,
  mangoCake,
  lemonTart,
  strawberryFraisier,
  financiers,
  weddingCake,
};

export type CakePrice = {
  name: string;
  half: number;
  one: number;
  two: number;
};

export type MenuItem = {
  name: string;
  price: string;
  category: 'Patties & puff' | 'Cookies' | 'Cupcakes' | 'Display' | 'Desserts';
  note?: string;
};

export type Bake = {
  name: string;
  description: string;
  price: string;
  category: 'All day' | 'Gateaux' | 'Little treats';
  image?: string;
  tone: string;
};

export const cakeSections: { name: string; items: CakePrice[] }[] = [
  {
    name: 'Vanilla',
    items: [
      { name: 'Rich Vanilla', half: 600, one: 1150, two: 2150 },
      { name: 'Lotus Biscoff', half: 600, one: 1250, two: 2400 },
      { name: 'Rasmalai', half: 750, one: 1400, two: 2600 },
      { name: 'Mocha Hazelnut', half: 700, one: 1350, two: 2500 },
      { name: 'Butterscotch', half: 700, one: 1350, two: 2500 },
      { name: 'Roasted Almond', half: 700, one: 1350, two: 2600 },
    ],
  },
  {
    name: 'Cheesecake',
    items: [
      { name: 'New York Cheesecake', half: 750, one: 1500, two: 2850 },
      { name: 'Lotus Biscoff Cheesecake', half: 850, one: 1650, two: 3100 },
      { name: 'Fruit Cheesecake · Seasonal', half: 850, one: 1650, two: 3100 },
    ],
  },
  {
    name: 'Chocolate',
    items: [
      { name: 'Dark Forest', half: 720, one: 1400, two: 2650 },
      { name: 'Choco Delight', half: 650, one: 1250, two: 2400 },
      { name: 'Nutty Delight', half: 720, one: 1400, two: 2700 },
      { name: 'Dark Fantasy', half: 700, one: 1350, two: 2600 },
      { name: 'Ferrero Rocher', half: 750, one: 1450, two: 2700 },
      { name: 'Dark Fantasy with Fresh Fruit · Seasonal', half: 820, one: 1600, two: 3000 },
      { name: 'Choco Delight with Hazelnut Spread', half: 700, one: 1350, two: 2550 },
    ],
  },
  {
    name: 'Fresh fruit',
    items: [
      { name: 'Fresh Mango', half: 650, one: 1350, two: 2600 },
      { name: 'Fresh Strawberry', half: 650, one: 1350, two: 2600 },
      { name: 'Fresh Blueberry', half: 720, one: 1400, two: 2700 },
      { name: 'Fresh Raspberry', half: 800, one: 1550, two: 3000 },
      { name: 'Lemon Blueberry', half: 780, one: 1500, two: 2850 },
      { name: 'Pineapple Pistachios', half: 780, one: 1500, two: 2900 },
      { name: 'Fresh Pineapple', half: 620, one: 1300, two: 2450 },
    ],
  },
  {
    name: 'Brownie & more',
    items: [
      { name: 'Walnut Brownie Cake', half: 700, one: 1400, two: 2700 },
      { name: 'Fudge Brownie Cake', half: 800, one: 1550, two: 2900 },
      { name: 'Tiramisu Cake', half: 750, one: 1400, two: 2700 },
      { name: 'Tres Leches Cake', half: 800, one: 1550, two: 3000 },
    ],
  },
];

export const menuItems: MenuItem[] = [
  { name: 'Aloo Patties', price: '₹50', category: 'Patties & puff' },
  { name: 'Paneer Patties', price: '₹60', category: 'Patties & puff' },
  { name: 'Chicken Patties', price: '₹70', category: 'Patties & puff' },
  { name: 'Corn Cheese Puff', price: '₹80', category: 'Patties & puff' },
  { name: 'Masala Aloo Patties', price: '₹55', category: 'Patties & puff' },
  { name: 'Masala Paneer Patties', price: '₹65', category: 'Patties & puff' },
  { name: 'Double Chocolate Cookies', price: '₹235', category: 'Cookies' },
  { name: 'Oatmeal Raisin Cookies', price: '₹230', category: 'Cookies' },
  { name: 'Vanilla Blueberry Cookies', price: '₹225', category: 'Cookies' },
  { name: 'Jeera Cookies', price: '₹220', category: 'Cookies' },
  { name: 'Biscotti Cookies', price: '₹235', category: 'Cookies' },
  { name: 'European Chocolate Cupcake', price: '₹95', category: 'Cupcakes' },
  { name: 'Red Velvet Cupcake', price: '₹95', category: 'Cupcakes' },
  { name: 'Apple Pie', price: '₹170', category: 'Display' },
  { name: 'New York Cheesecake', price: '₹210', category: 'Display' },
  { name: 'Lotus Biscoff Cheesecake', price: '₹235', category: 'Display' },
  { name: 'Blueberry Cheesecake', price: '₹230', category: 'Display' },
  { name: 'Rich Vanilla Pastry', price: '₹160', category: 'Display' },
  { name: 'Lotus Biscoff Vanilla Pastry', price: '₹170', category: 'Display' },
  { name: 'Choco Delight Pastry', price: '₹170', category: 'Display' },
  { name: 'Nutty Delight Pastry', price: '₹175', category: 'Display' },
  { name: 'Tiramisu', price: '₹225', category: 'Desserts', note: 'Mascarpone, espresso, and cocoa dusted.' },
  { name: 'Tres Leches', price: '₹240', category: 'Desserts', note: 'A classic three-milk cake.' },
  { name: 'Cocoa Bliss', price: '₹240', category: 'Desserts', note: 'Deep dark chocolate indulgence.' },
  { name: 'Fudge Brownie', price: '₹130', category: 'Desserts', note: 'A rich, decadent chocolate brownie.' },
  { name: 'Fudge Brownie with Ice-Cream', price: '₹170', category: 'Desserts', note: 'Served with a scoop of vanilla.' },
  { name: 'Walnut Brownie', price: '₹105', category: 'Desserts', note: 'Brownie with crunchy walnuts.' },
  { name: 'Walnut Brownie with Ice-Cream', price: '₹150', category: 'Desserts', note: 'Served with a scoop of walnut-streaked ice-cream.' },
];

export const bakes: Bake[] = [
  {
    name: 'The Everyday Chocolate',
    description: 'A soft cocoa sponge, glossy ganache and a little sea salt.',
    price: 'from ₹950',
    category: 'Gateaux',
    image: gateauSlice,
    tone: 'coral',
  },
  {
    name: 'Pistachio Morning Bun',
    description: 'Laminated, sugar-crackly and finished with pistachio cream.',
    price: '₹220',
    category: 'All day',
    image: morningBakes,
    tone: 'sage',
  },
  {
    name: 'Mango & Vanilla Cloud',
    description: 'Seasonal Alphonso, vanilla chantilly and a tender almond base.',
    price: 'from ₹1,250',
    category: 'Gateaux',
    image: mangoCake,
    tone: 'butter',
  },
  {
    name: 'Lemon Curd Tart',
    description: 'Bright, buttery and just sharp enough to keep you coming back.',
    price: '₹280',
    category: 'Little treats',
    image: lemonTart,
    tone: 'lemon',
  },
  {
    name: 'Strawberry Fraisier',
    description: 'Vanilla sponge, crème mousseline and the prettiest berries we can find.',
    price: 'from ₹1,450',
    category: 'Gateaux',
    image: strawberryFraisier,
    tone: 'blush',
  },
  {
    name: 'Brown Butter Financier',
    description: 'Small almond cakes with crisp edges and a soft, nutty centre.',
    price: '₹160',
    category: 'Little treats',
    image: financiers,
    tone: 'cocoa',
  },
];

export const toneColors: Record<string, string> = {
  sage: '#b9c6a1',
  butter: '#f6d68f',
  lemon: '#d9dba2',
  blush: '#e5b9a8',
  cocoa: '#9e7664',
  coral: '#d86343',
};
