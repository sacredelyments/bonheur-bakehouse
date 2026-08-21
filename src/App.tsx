import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CakeSlice,
  Check,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import heroCake from '@/assets/hero-cake.jpg';
import gateauSlice from '@/assets/gateau-slice.jpg';
import morningBakes from '@/assets/morning-bakes.jpg';

type CakePrice = {
  name: string;
  half: number;
  one: number;
  two: number;
};

type MenuItem = {
  name: string;
  price: string;
  category: 'Patties & puff' | 'Cookies' | 'Cupcakes' | 'Display' | 'Desserts' | 'Gateaux';
  note?: string;
};

const cakeSections: { name: string; items: CakePrice[] }[] = [
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

const menuItems: MenuItem[] = [
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

type Bake = {
  name: string;
  description: string;
  price: string;
  category: 'All day' | 'Gateaux' | 'Little treats';
  image?: string;
  tone: string;
};

const bakes: Bake[] = [
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
    tone: 'butter',
  },
  {
    name: 'Lemon Curd Tart',
    description: 'Bright, buttery and just sharp enough to keep you coming back.',
    price: '₹280',
    category: 'Little treats',
    tone: 'lemon',
  },
  {
    name: 'Strawberry Fraisier',
    description: 'Vanilla sponge, crème mousseline and the prettiest berries we can find.',
    price: 'from ₹1,450',
    category: 'Gateaux',
    tone: 'blush',
  },
  {
    name: 'Brown Butter Financier',
    description: 'Small almond cakes with crisp edges and a soft, nutty centre.',
    price: '₹160',
    category: 'Little treats',
    tone: 'cocoa',
  },
];

const baseUrl = import.meta.env.BASE_URL;
const jumpTo = (id: string) => `${baseUrl}${id}`;

function Logo() {
  return (
    <a href={jumpTo('#top')} className="flex items-center gap-2.5" data-testid="link-logo">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-[#3d2339] text-[#3d2339]">
        <CakeSlice size={17} strokeWidth={1.6} />
      </span>
      <span className="display text-[1.2rem] font-semibold leading-none tracking-[-.03em]">
        bonheur<span className="text-[#d86343]">.</span>
      </span>
    </a>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeMenuCategory, setActiveMenuCategory] = useState('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trayCount, setTrayCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredBakes =
    activeFilter === 'All'
      ? bakes
      : bakes.filter((bake) => bake.category === activeFilter);

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory =
      activeMenuCategory === 'All' || item.category === activeMenuCategory;
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="top" className="grain min-h-[100dvh] overflow-x-hidden bg-[#f8f2e8] text-[#3d2339]">
      <div className="bg-[#3d2339] px-5 py-2 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-[#f6d68f]">
        Delivering handmade sweetness across Bangalore
      </div>

      <header className={`sticky top-0 z-40 mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:px-8 lg:px-12 ${isScrolled ? 'bg-[#f8f2e8]/90 shadow-[0_10px_30px_rgba(80,42,47,.07)] backdrop-blur-md' : 'bg-transparent'}`}>
        <Logo />
        <nav className="hidden items-center gap-8 text-[12px] font-semibold md:flex" aria-label="Primary navigation">
          <a className="menu-link" href={jumpTo('#about')} data-testid="link-about">About</a>
          <a className="menu-link" href={jumpTo('#menu')} data-testid="link-menu">Menu</a>
          <a className="menu-link" href={jumpTo('#bakes')} data-testid="link-bakes">The bakes</a>
          <a className="menu-link" href={jumpTo('#celebrate')} data-testid="link-celebrate">Celebrate</a>
          <a className="menu-link" href={jumpTo('#visit')} data-testid="link-visit">Visit us</a>
          <a className="menu-link" href={jumpTo('#contact')} data-testid="link-contact">Say hello</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.instagram.com/bonheurbakehouse/"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full border border-[#3d2339] px-4 text-[11px] font-bold md:flex"
            data-testid="link-instagram-header"
          >
            <Instagram size={14} strokeWidth={1.8} /> @bonheurbakehouse
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-[#d86343] text-[#fff8ee] md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button
            className="solid-button hidden rounded-full bg-[#d86343] px-5 py-3 text-[11px] font-bold text-[#fff8ee] md:block"
            onClick={() => setEnquiryOpen(true)}
            data-testid="button-header-enquire"
          >
            Enquire for a cake
          </button>
        </div>
        {mobileMenuOpen && (
           <div id="mobile-navigation" className="absolute left-5 right-5 top-[76px] rounded-2xl border border-[#cfbea8] bg-[#fff9f0] p-5 shadow-[0_18px_45px_rgba(80,42,47,.13)] md:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              <a href={jumpTo('#about')} onClick={closeMobileMenu} data-testid="mobile-link-about">About</a>
              <a href={jumpTo('#menu')} onClick={closeMobileMenu} data-testid="mobile-link-menu">Menu</a>
              <a href={jumpTo('#bakes')} onClick={closeMobileMenu} data-testid="mobile-link-bakes">The bakes</a>
              <a href={jumpTo('#celebrate')} onClick={closeMobileMenu} data-testid="mobile-link-celebrate">Celebrate</a>
              <a href={jumpTo('#visit')} onClick={closeMobileMenu} data-testid="mobile-link-visit">Visit us</a>
              <a href={jumpTo('#contact')} onClick={closeMobileMenu} data-testid="mobile-link-contact">Say hello</a>
              <button className="solid-button rounded-full bg-[#d86343] px-4 py-3 text-left text-xs font-bold text-[#fff8ee]" onClick={() => { closeMobileMenu(); setEnquiryOpen(true); }} data-testid="button-mobile-enquire">Enquire for a cake <ArrowRight className="ml-2 inline" size={14} /></button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-[1320px] items-center gap-9 px-5 pb-16 pt-7 sm:px-8 lg:grid-cols-[.87fr_1.13fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-12">
          <div className="reveal max-w-[560px]">
            <p className="eyebrow mb-6 flex items-center gap-2 text-[#d86343]"><span className="h-px w-8 bg-[#d86343]" />A neighbourhood pastry atelier</p>
            <h1 className="display max-w-[590px] text-[clamp(3.6rem,8vw,7.7rem)] font-semibold leading-[.88] tracking-[-.075em]">
              A little<br /><em className="font-normal text-[#d86343]">happiness,</em><br />baked daily.
            </h1>
            <p className="mt-8 max-w-[390px] text-[15px] leading-7 text-[#6e5763]">
              Handmade celebration cakes, patisserie and gateaux for the ordinary Tuesday and the very big day in Bangalore.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={jumpTo('#bakes')} className="solid-button inline-flex items-center gap-3 rounded-full bg-[#d86343] px-6 py-4 text-xs font-bold text-[#fff8ee]" data-testid="button-browse-bakes">Browse the bakes <ArrowDown size={15} /></a>
              <button onClick={() => setEnquiryOpen(true)} className="outline-button inline-flex items-center gap-2 rounded-full border border-[#3d2339] px-6 py-4 text-xs font-bold" data-testid="button-custom-cake">Custom cakes <ArrowRight size={14} /></button>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-[#cfbea8] pt-5 text-xs text-[#6e5763]">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#b9c6a1]" />Made fresh in small batches</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#cfbea8] sm:block" />
              <span className="hidden sm:block">HSR · Bangalore</span>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative min-h-[490px] sm:min-h-[620px]">
            <div className="absolute inset-x-0 top-0 h-[88%] overflow-hidden rounded-[11rem_11rem_1.5rem_1.5rem] bg-[#b9c6a1]">
              <img src={heroCake} alt="A coral flower cake from Bonheur Bakehouse" className="h-full w-full object-cover" data-testid="img-hero-cake" />
            </div>
            <div className="float-note absolute bottom-5 left-0 max-w-[205px] rounded-2xl bg-[#f6d68f] p-5 shadow-[0_15px_30px_rgba(80,42,47,.12)] sm:bottom-0 sm:left-[-18px]">
              <Sparkles size={17} className="mb-8 text-[#d86343]" />
              <p className="display text-[22px] leading-[1.05]">Made for the moment you say, “just one more slice.”</p>
            </div>
            <div className="absolute right-2 top-8 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border border-[#fff9f0] text-center text-[9px] font-bold uppercase leading-3 tracking-[.12em] text-[#fff9f0] sm:right-8">
              Since<br />the good<br />things
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-[#cfbea8] bg-[#f6d68f] py-4">
          <div className="flex min-w-max animate-[marquee_24s_linear_infinite] items-center gap-8 text-[11px] font-bold uppercase tracking-[.17em]">
            {['Handmade with care', 'Celebration cakes', 'Patisserie & gateaux', 'Delivering across Bangalore', 'Handmade with care', 'Celebration cakes', 'Patisserie & gateaux', 'Delivering across Bangalore'].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-8"><span>{item}</span><span className="text-[#d86343]">•</span></span>
            ))}
          </div>
        </div>

        <section id="about" data-reveal className="section-reveal scroll-mt-6 bg-[#fff9f0] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1130px] items-center gap-12 lg:grid-cols-[.86fr_1.14fr]">
            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="absolute -inset-3 rotate-[-3deg] rounded-[2rem] bg-[#f6d68f]" />
              <img src={`${baseUrl}images/bonheur-chef-sushmita.jpg`} alt="Sushmita, chef and artisan at Bonheur Bakehouse" className="relative aspect-[.82] w-full rounded-[1.8rem] object-cover object-[center_58%]" data-testid="img-chef-sushmita" />
              <span className="absolute -bottom-5 -right-4 rounded-full bg-[#d86343] px-5 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#fff8ee]">Made by hand</span>
            </div>
            <div>
              <p className="eyebrow mb-5 text-[#d86343]">Meet the maker</p>
              <h2 className="display max-w-[700px] text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">The hands<br /><span className="font-normal">behind the happy.</span></h2>
              <p className="mt-7 max-w-[600px] text-base leading-7 text-[#6e5763]">Sushmita is the main bakery chef and artisan behind Bonheur Bakehouse. From delicate gateaux to celebration cakes made for a very specific feeling, she brings a patient, personal touch to everything that leaves the kitchen.</p>
              <p className="mt-5 max-w-[600px] text-base leading-7 text-[#6e5763]">Her kind of baking is thoughtful without being precious: good ingredients, careful detail, and something that makes people pause before the first bite.</p>
              <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold"><span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Chef & artisan</span><span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Custom cakes</span><span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Bangalore</span></div>
            </div>
          </div>
        </section>

        <section id="menu" data-reveal className="section-reveal scroll-mt-6 bg-[#f8f2e8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div><p className="eyebrow mb-4 text-[#d86343]">The complete menu</p><h2 className="display max-w-[680px] text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">Pick your<br /><span className="font-normal">kind of happy.</span></h2></div>
              <div className="max-w-[320px]"><p className="text-sm leading-6 text-[#6e5763]">From a quick puff to a cake sized for the whole table. Cake prices are shown for ½ kg, 1 kg and 2 kg.</p><input value={menuSearch} onChange={(event) => setMenuSearch(event.target.value)} placeholder="Search the menu" aria-label="Search the menu" className="mt-5 w-full border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#a38c91] focus:border-[#d86343]" data-testid="input-menu-search" /></div>
            </div>
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
              {['All', 'Patties & puff', 'Cookies', 'Cupcakes', 'Display', 'Desserts'].map((category) => <button key={category} onClick={() => setActiveMenuCategory(category)} className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${activeMenuCategory === category ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]' : 'border-[#cfbea8] text-[#6e5763] hover:border-[#3d2339] hover:text-[#3d2339]'}`} data-testid={`button-menu-category-${category.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{category}</button>)}
            </div>
            {filteredMenuItems.length > 0 ? <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filteredMenuItems.map((item) => <article key={`${item.category}-${item.name}`} className="group rounded-[1.2rem] border border-[#cfbea8] bg-[#fff9f0] p-5 transition-transform hover:-translate-y-1"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#d86343]">{item.category}</p><h3 className="display mt-2 text-2xl font-semibold leading-tight">{item.name}</h3>{item.note && <p className="mt-2 text-xs leading-5 text-[#6e5763]">{item.note}</p>}</div><span className="shrink-0 rounded-full bg-[#f6d68f] px-3 py-2 text-xs font-bold text-[#3d2339]">{item.price}</span></div></article>)}</div> : <div className="mt-8 rounded-[1.2rem] border border-dashed border-[#cfbea8] px-6 py-12 text-center"><p className="display text-3xl">Nothing by that name just yet.</p><button onClick={() => setMenuSearch('')} className="mt-3 text-xs font-bold underline underline-offset-4">Clear search</button></div>}
            <div className="mt-16">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="eyebrow text-[#d86343]">Celebration cakes</p><h3 className="display mt-2 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Gateaux by the kilo.</h3></div><p className="text-xs text-[#6e5763]">Prices in INR · seasonal flavours depend on availability</p></div>
              <div className="grid gap-4 lg:grid-cols-2">{cakeSections.map((section) => <div key={section.name} className="overflow-hidden rounded-[1.4rem] border border-[#cfbea8] bg-[#fff9f0]"><div className="flex items-center justify-between bg-[#3d2339] px-5 py-4 text-[#fff8ee]"><h4 className="display text-2xl font-semibold">{section.name}</h4><span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#f6d68f]">Gateaux</span></div><div className="overflow-x-auto"><table className="w-full min-w-[430px] text-left text-sm"><thead className="border-b border-[#eadbc9] text-[10px] font-bold uppercase tracking-[.12em] text-[#8d767c]"><tr><th className="px-5 py-3">Flavour</th><th className="px-3 py-3">½ kg</th><th className="px-3 py-3">1 kg</th><th className="px-5 py-3">2 kg</th></tr></thead><tbody>{section.items.map((cake) => <tr key={cake.name} className="border-b border-[#eadbc9] last:border-0"><td className="px-5 py-4 font-semibold">{cake.name}</td><td className="px-3 py-4 text-[#d86343]">₹{cake.half}</td><td className="px-3 py-4 text-[#d86343]">₹{cake.one}</td><td className="px-5 py-4 text-[#d86343]">₹{cake.two}</td></tr>)}</tbody></table></div></div>)}</div>
            </div>
            <div className="mt-10 flex flex-col gap-5 rounded-[1.4rem] bg-[#b9c6a1] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="eyebrow text-[#3d2339]">Need something custom?</p><p className="display mt-2 text-3xl font-semibold">Tell Sushmita the feeling.</p></div><button onClick={() => setEnquiryOpen(true)} className="inline-flex w-fit items-center gap-3 rounded-full bg-[#3d2339] px-6 py-4 text-xs font-bold text-[#fff8ee]" data-testid="button-menu-enquire">Start an enquiry <ArrowRight size={15} /></button></div>
          </div>
        </section>

        <section id="bakes" data-reveal className="section-reveal mx-auto max-w-[1320px] scroll-mt-6 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4 text-[#d86343]">From the kitchen</p>
              <h2 className="display max-w-[600px] text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">Small joys,<br /><span className="font-normal">made edible.</span></h2>
            </div>
            <p className="max-w-[310px] text-sm leading-6 text-[#6e5763]">A rotating selection of things we love to make, share and eat standing at the kitchen counter.</p>
          </div>
          <div className="hide-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
            {['All', 'Gateaux', 'All day', 'Little treats'].map((filter) => (
              <button key={filter} className={`rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${activeFilter === filter ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]' : 'border-[#cfbea8] text-[#6e5763] hover:border-[#3d2339] hover:text-[#3d2339]'}`} onClick={() => setActiveFilter(filter)} data-testid={`button-filter-${filter.toLowerCase().replace(' ', '-')}`}>{filter}</button>
            ))}
          </div>
          <div className="mt-7 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBakes.map((bake, index) => (
              <article key={bake.name} className={`group ${index === 1 ? 'lg:mt-16' : ''}`} data-testid={`card-bake-${index}`}>
                <div
                  className="image-shine relative aspect-[.9] overflow-hidden rounded-[1.4rem]"
                  style={{
                    backgroundColor:
                      bake.tone === 'sage' ? '#b9c6a1' :
                        bake.tone === 'butter' ? '#f6d68f' :
                          bake.tone === 'lemon' ? '#d9dba2' :
                            bake.tone === 'blush' ? '#e5b9a8' :
                              bake.tone === 'cocoa' ? '#9e7664' : '#d86343',
                  }}
                >
                  {bake.image ? <img src={bake.image} alt={bake.name} className="h-full w-full object-cover" data-testid={`img-bake-${index}`} /> : <div className="grid h-full place-items-center p-10 text-center"><CakeSlice size={58} strokeWidth={1} className="text-[#3d2339]/50" /><span className="display mt-3 text-3xl">{bake.name}</span></div>}
                  <button onClick={() => setTrayCount((count) => count + 1)} className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-[#fff9f0] text-[#3d2339] opacity-0 shadow-md transition-opacity group-hover:opacity-100" aria-label={`Add ${bake.name} to enquiry`} data-testid={`button-add-bake-${index}`}><Plus size={18} /></button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div><h3 className="display text-[25px] font-semibold leading-tight">{bake.name}</h3><p className="mt-2 max-w-[240px] text-[12px] leading-5 text-[#6e5763]">{bake.description}</p></div>
                  <span className="shrink-0 pt-1 text-[11px] font-bold text-[#d86343]">{bake.price}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#cfbea8] pt-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-[#6e5763]">What you see is what we are excited to bake right now.</p>
            <button onClick={() => setEnquiryOpen(true)} className="inline-flex items-center gap-2 text-xs font-bold underline decoration-[#d86343] decoration-2 underline-offset-4" data-testid="button-ask-whats-fresh">Ask what’s fresh <ArrowRight size={14} /></button>
          </div>
        </section>

        <section data-reveal className="section-reveal relative overflow-hidden bg-[#3d2339] px-5 py-20 text-[#fff8ee] sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1130px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="eyebrow mb-5 text-[#f6d68f]">A note from our counter</p>
              <blockquote className="display max-w-[690px] text-4xl font-medium leading-[1.04] tracking-[-.035em] sm:text-6xl">“The best part is the bit before the first bite — when everyone leans in.”</blockquote>
              <p className="mt-7 max-w-[380px] text-sm leading-6 text-[#d9c6c8]">Bonheur means happiness. We think it belongs in the details: the neat little piping, the good vanilla, the box you do not want to throw away.</p>
            </div>
            <div className="relative mx-auto w-full max-w-[370px] rotate-2 rounded-[10rem_10rem_1rem_1rem] bg-[#b9c6a1] p-3">
              <img src={morningBakes} alt="Fresh pastries arranged on a bakery counter" className="aspect-[.82] w-full rounded-[9rem_9rem_.65rem_.65rem] object-cover" data-testid="img-counter-pastries" />
              <span className="absolute -bottom-5 -left-8 rounded-full bg-[#d86343] px-5 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#fff8ee]">Come hungry</span>
            </div>
          </div>
        </section>

        <section id="celebrate" data-reveal className="section-reveal mx-auto max-w-[1320px] scroll-mt-6 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid overflow-hidden rounded-[2rem] bg-[#b9c6a1] lg:grid-cols-[.72fr_1.28fr]">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                <p className="eyebrow mb-5 text-[#3d2339]">For the big feelings</p>
                <h2 className="display max-w-[440px] text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">Your story,<br /><span className="font-normal">in cake.</span></h2>
                <p className="mt-7 max-w-[355px] text-sm leading-6 text-[#4d4d3e]">Birthdays, new chapters, wedding weekends and the “we just felt like it” kind. Tell us the feeling; we will find the flavour.</p>
              </div>
              <button className="mt-12 flex w-fit items-center gap-3 rounded-full bg-[#3d2339] px-6 py-4 text-xs font-bold text-[#fff8ee] transition-transform hover:-translate-y-0.5" onClick={() => setEnquiryOpen(true)} data-testid="button-start-cake">Start a cake conversation <ArrowRight size={15} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-[#d8dfc8] p-3 sm:p-5">
              <div className="relative overflow-hidden rounded-[1.4rem] bg-[#f6d68f] p-5 sm:p-8"><span className="eyebrow text-[#d86343]">01 /</span><p className="display mt-20 text-2xl font-semibold leading-tight sm:mt-28 sm:text-4xl">Custom<br />cakes</p><CakeSlice className="absolute bottom-5 right-5 text-[#d86343]" size={30} strokeWidth={1.2} /></div>
              <div className="relative mt-8 overflow-hidden rounded-[1.4rem] bg-[#d86343] p-5 text-[#fff8ee] sm:mt-14 sm:p-8"><span className="eyebrow text-[#f6d68f]">02 /</span><p className="display mt-20 text-2xl font-semibold leading-tight sm:mt-28 sm:text-4xl">Wedding<br />cakes</p><Sparkles className="absolute bottom-5 right-5 text-[#f6d68f]" size={30} strokeWidth={1.2} /></div>
              <div className="col-span-2 flex items-center justify-between rounded-[1.4rem] bg-[#fff9f0] px-5 py-4 text-xs font-semibold text-[#6e5763] sm:px-8 sm:py-5"><span>Made slowly. Collected happily.</span><span className="flex items-center gap-2 text-[#3d2339]">Enquire to begin <ArrowRight size={14} /></span></div>
            </div>
          </div>
        </section>

        <section id="visit" data-reveal className="section-reveal scroll-mt-6 bg-[#f6d68f] px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1130px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-[#d86343]">The little shop</p>
              <h2 className="display text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">See you<br /><span className="font-normal">at the counter.</span></h2>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <div className="border-t border-[#3d2339]/30 pt-4"><MapPin size={18} className="mb-5 text-[#d86343]" strokeWidth={1.6} /><p className="text-sm font-semibold leading-6">101/B, 17th Main Road,<br />near HSR Government School,<br />SR Layout, Bangalore</p><a href="https://www.google.com/maps/search/?api=1&query=101%2FB%2017th%20Main%20Road%20HSR%20Bangalore" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4" data-testid="link-map">Open in maps <ArrowRight size={13} /></a></div>
              <div className="border-t border-[#3d2339]/30 pt-4"><Clock3 size={18} className="mb-5 text-[#d86343]" strokeWidth={1.6} /><p className="text-sm font-semibold leading-6">We bake in small batches,<br />so the counter changes.<br /><span className="font-normal text-[#6e5763]">Drop us a line before visiting.</span></p><button onClick={() => setEnquiryOpen(true)} className="mt-4 text-xs font-bold underline underline-offset-4" data-testid="button-check-today">Check today’s bakes <ArrowRight className="ml-1 inline" size={13} /></button></div>
            </div>
          </div>
        </section>

        <section id="contact" data-reveal className="section-reveal mx-auto max-w-[1320px] scroll-mt-6 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="eyebrow mb-5 text-[#d86343]">Let’s make a plan</p>
              <h2 className="display text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">Tell us what<br /><span className="font-normal">you’re celebrating.</span></h2>
              <p className="mt-7 max-w-[330px] text-sm leading-6 text-[#6e5763]">A date, a guest count, a flavour you love — a rough idea is more than enough. We will take it from there.</p>
              <a href="https://www.instagram.com/bonheurbakehouse/" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 text-xs font-bold" data-testid="link-instagram-contact"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#3d2339] text-[#fff8ee]"><Instagram size={16} /></span> See what’s coming out of the oven</a>
            </div>
            <div className="rounded-[1.6rem] bg-[#fff9f0] p-6 shadow-[0_18px_45px_rgba(80,42,47,.08)] sm:p-10">
              {submitted ? (
                <div className="flex min-h-[350px] flex-col items-start justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#b9c6a1] text-[#3d2339]"><Check size={21} /></span>
                  <h3 className="display mt-7 text-4xl font-semibold">We’ve got it.</h3>
                  <p className="mt-3 max-w-[330px] text-sm leading-6 text-[#6e5763]">Thank you for dropping by. We’ll get back to you soon with something delicious to discuss.</p>
                  <button onClick={() => { setSubmitted(false); setEnquiryOpen(false); }} className="mt-8 text-xs font-bold underline underline-offset-4" data-testid="button-send-another">Send another note</button>
                </div>
              ) : (
                <form onSubmit={submitEnquiry} className="grid gap-5" data-testid="form-enquiry">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold">Your name<input required name="name" placeholder="A happy human" className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]" data-testid="input-name" /></label>
                    <label className="grid gap-2 text-xs font-bold">Email or phone<input required name="contact" placeholder="How can we reach you?" className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]" data-testid="input-contact" /></label>
                  </div>
                  <label className="grid gap-2 text-xs font-bold">I’m looking for<select name="occasion" className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none focus:border-[#d86343]" data-testid="select-occasion"><option> a celebration cake</option><option> a wedding cake</option><option> gateaux for a gathering</option><option> something sweet for today</option></select></label>
                  <label className="grid gap-2 text-xs font-bold">A few details<textarea required name="details" rows={3} placeholder="Date, flavours, number of people — whatever you know." className="resize-none border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]" data-testid="textarea-details" /></label>
                  <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center"><p className="text-[11px] leading-5 text-[#8d767c]">We usually reply within a day.<br />No elaborate brief required.</p><button type="submit" className="solid-button inline-flex items-center justify-center gap-3 rounded-full bg-[#d86343] px-6 py-4 text-xs font-bold text-[#fff8ee]" data-testid="button-submit-enquiry">Send the note <ArrowRight size={15} /></button></div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3d2339] px-5 py-10 text-[#fff8ee] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div><div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#f6d68f] text-[#f6d68f]"><CakeSlice size={17} strokeWidth={1.6} /></span><span className="display text-[1.2rem] font-semibold">bonheur<span className="text-[#f6d68f]">.</span></span></div><p className="mt-5 max-w-[290px] text-xs leading-5 text-[#d9c6c8]">A neighbourhood bakehouse for everyday cravings and once-in-a-lifetime celebrations.</p></div>
          <div className="flex flex-col gap-4 text-xs font-semibold sm:flex-row sm:items-center sm:gap-8"><a href={jumpTo('#about')} data-testid="footer-link-about">About Sushmita</a><a href={jumpTo('#menu')} data-testid="footer-link-menu">Full menu</a><a href={jumpTo('#bakes')} data-testid="footer-link-bakes">The bakes</a><a href={jumpTo('#celebrate')} data-testid="footer-link-celebrate">Custom cakes</a><a href={jumpTo('#visit')} data-testid="footer-link-visit">Find us</a><a href="https://www.instagram.com/bonheurbakehouse/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" data-testid="footer-link-instagram"><Instagram size={14} /> Instagram</a></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1320px] justify-between border-t border-[#684955] pt-5 text-[10px] uppercase tracking-[.14em] text-[#b99ea5]"><span>Bonheur Bakehouse · Bangalore</span><span>Made with care</span></div>
      </footer>

      {trayCount > 0 && !enquiryOpen && (
        <button onClick={() => setEnquiryOpen(true)} className="fixed bottom-5 right-5 z-30 flex items-center gap-3 rounded-full bg-[#d86343] px-5 py-4 text-xs font-bold text-[#fff8ee] shadow-[0_12px_28px_rgba(216,99,67,.3)]" data-testid="button-open-tray"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#f6d68f] text-[10px] text-[#3d2339]">{trayCount}</span> Add to an enquiry <ArrowRight size={14} /></button>
      )}

      {enquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#3d2339]/45 p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Cake enquiry">
          <div className="relative max-h-[94dvh] w-full max-w-[700px] overflow-y-auto rounded-[1.6rem] bg-[#f8f2e8] p-6 shadow-[0_25px_70px_rgba(35,17,32,.25)] sm:p-10">
            <button onClick={() => setEnquiryOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#cfbea8]" aria-label="Close enquiry" data-testid="button-close-enquiry"><X size={16} /></button>
            <p className="eyebrow text-[#d86343]">A sweet little shortcut</p>
            <h2 className="display mt-4 max-w-[500px] text-5xl font-semibold leading-[.95] tracking-[-.05em]">Let’s talk cake.</h2>
            <p className="mt-4 max-w-[460px] text-sm leading-6 text-[#6e5763]">Share a few details and we’ll help you find the right shape, flavour and amount of happy.</p>
            <form onSubmit={(event) => { submitEnquiry(event); }} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-xs font-bold">Your name<input required name="modal-name" placeholder="Your name" className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none focus:border-[#d86343]" data-testid="modal-input-name" /></label><label className="grid gap-2 text-xs font-bold">Phone / email<input required name="modal-contact" placeholder="Phone or email" className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none focus:border-[#d86343]" data-testid="modal-input-contact" /></label></div>
              <label className="grid gap-2 text-xs font-bold">Tell us about it<textarea required name="modal-details" rows={3} placeholder="What are we celebrating?" className="resize-none border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none focus:border-[#d86343]" data-testid="modal-textarea-details" /></label>
              <button type="submit" className="solid-button mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-[#d86343] px-6 py-4 text-xs font-bold text-[#fff8ee]" data-testid="button-modal-submit">Send enquiry <ArrowRight size={15} /></button>
            </form>
            {submitted && <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#56704d]" data-testid="status-enquiry-sent"><Check size={16} /> Note received — we’ll be in touch soon.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;