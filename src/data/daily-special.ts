import strawberryFraisier from '@/assets/strawberry-fraisier.jpg';
import lemonTart from '@/assets/lemon-tart.jpg';
import mangoCake from '@/assets/mango-cake.jpg';
import financiers from '@/assets/financiers.jpg';
import gateauSlice from '@/assets/gateau-slice.jpg';

export interface DailySpecial {
  id: string;
  name: string;
  tagline: string;
  description: string;
  chefNote: string;
  price: number;
  originalPrice?: number;
  freshTime: string; // e.g. "Pulled from oven at 10:30 AM"
  batchCount: string; // e.g. "Limited batch of 14 portions"
  remainingCount: number; // e.g. 5
  totalBatch: number; // e.g. 14
  image: string;
  isEggless: boolean;
  dietary: string[];
  isAvailable: boolean;
  accentTone: string; // e.g. '#c44d68' (berry), '#b97a20' (amber/citrus), '#567a42' (pistachio)
}

/**
 * Dish of the Day Configuration
 * ----------------------------------------------------
 * You can update this file anytime to change today's special!
 * Changes take effect across the entire website instantly.
 */
export const currentDailySpecial: DailySpecial = {
  id: 'dish-of-the-day-strawberry-fraisier',
  name: 'Vanilla Bean & Wild Strawberry Fraisier',
  tagline: 'Delicate Genoise · Madagascar Mousseline · Fresh Hill Strawberries',
  description:
    'A classic French patisserie masterpiece crafted with layers of light sponge steeped in fragrant Madagascar vanilla syrup, silky kirsch mousseline cream, and sweet farm-fresh strawberries with a mirror-shine glaze.',
  chefNote:
    '“We received fresh, hand-picked strawberries from Nilgiris this morning. We set aside just one small morning batch for today’s display counter!” — Chef Sushmita',
  price: 395,
  originalPrice: 450,
  freshTime: 'Fresh from oven at 11:00 AM',
  batchCount: 'Small Batch of 14 Portions Crafted Today',
  remainingCount: 4,
  totalBatch: 14,
  image: strawberryFraisier,
  isEggless: false,
  dietary: ['100% Scratch-Made', 'Real Madagascar Vanilla', 'Signature Daily Bake'],
  isAvailable: true,
  accentTone: '#c44d68',
};

/**
 * Optional archive / catalogue of rotating specials you can swap in easily:
 */
export const upcomingSpecialsCatalog: Partial<DailySpecial>[] = [
  {
    name: 'Meyer Lemon & Toasted Meringue Tart',
    tagline: 'Crisp Pâte Sablée · Zesty Curd · Torched Swiss Meringue',
    price: 340,
    image: lemonTart,
    isEggless: false,
    accentTone: '#b97a20',
  },
  {
    name: 'Alphonso Mango & Passionfruit Gateau',
    tagline: 'Whipped White Chocolate Ganache · Alphonso Reduction',
    price: 420,
    image: mangoCake,
    isEggless: true,
    accentTone: '#d86343',
  },
  {
    name: 'Brown Butter & Toasted Almond Financiers (Box of 4)',
    tagline: 'Beurre Noisette · Roasted Almond Flour · Sea Salt Flakes',
    price: 360,
    image: financiers,
    isEggless: false,
    accentTone: '#567a42',
  },
  {
    name: 'Valrhona Dark Chocolate Truffle Gateau',
    tagline: '70% Guanaja Dark Chocolate · Cocoa Nib Crunch',
    price: 410,
    image: gateauSlice,
    isEggless: true,
    accentTone: '#3d2339',
  },
];
