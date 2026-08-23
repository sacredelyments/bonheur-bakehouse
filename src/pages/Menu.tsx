import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Search, Plus } from 'lucide-react';
import { cakeSections, menuItems, type MenuItem } from '@/data/menu-data';
import { useInView } from '@/hooks/use-in-view';
import { useOrder } from '@/context/OrderContext';

const categories = ['All', 'Patties & puff', 'Cookies', 'Cupcakes', 'Display', 'Desserts'] as const;

function parseNumericPrice(str: string): number {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 100;
}

function MenuHeader({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div className="bg-[#3d2339] px-5 py-24 text-[#fff8ee] sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1340px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="eyebrow mb-5 text-[#f6d68f]">Counter catalogue</p>
          <h1 className="display text-5xl font-semibold leading-[.92] tracking-[-.06em] sm:text-8xl">
            Everything<br /><span className="font-normal text-[#d9c6c8]">in the case.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[420px] text-sm leading-7 text-[#d9c6c8]">
            Savouries, afternoon pastries and celebration gateaux. Click any price or item to add to your order.
          </p>

          <div className="relative mx-auto mt-10 max-w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cfbea8]" size={16} />
            <input
              type="text"
              placeholder="Search croissants, brownies, tarts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#cfbea8]/40 bg-[#fff9f0]/10 py-3.5 pl-11 pr-5 text-xs text-[#fff8ee] placeholder-[#d9c6c8]/60 backdrop-blur-sm outline-none transition-colors focus:border-[#f6d68f]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CounterItems({
  search,
  activeCategory,
  setActiveCategory,
}: {
  search: string;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const { ref, isInView } = useInView();
  const { addItem } = useOrder();

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch =
        search === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const handleAddItem = (item: MenuItem) => {
    addItem({
      name: item.name,
      category: item.category,
      priceNumeric: parseNumericPrice(item.price),
      priceDisplay: item.price,
      quantity: 1,
      weightOrSize: 'Standard',
      isEggless: false,
    });
  };

  return (
    <section className="mx-auto max-w-[1340px] px-5 py-16 sm:px-8 lg:px-12">
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${
              activeCategory === cat
                ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]'
                : 'border-[#cfbea8] text-[#6e5763] hover:border-[#3d2339] hover:text-[#3d2339]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={ref} className={`mt-8 section-reveal ${isInView ? 'in-view' : ''}`}>
        {filtered.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={`${item.category}-${item.name}`}
                onClick={() => handleAddItem(item)}
                className="group cursor-pointer rounded-[1.4rem] border border-[#cfbea8] bg-[#fff9f0] p-5 transition-all hover:-translate-y-1 hover:border-[#d86343] hover:shadow-[0_12px_30px_rgba(80,42,47,.09)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#d86343]">{item.category}</p>
                    <h3 className="display mt-1 text-2xl font-semibold leading-tight text-[#3d2339] group-hover:text-[#d86343] transition-colors">
                      {item.name}
                    </h3>
                    {item.note && <p className="mt-2 text-xs leading-5 text-[#6e5763]">{item.note}</p>}
                    <p className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#6e5763] group-hover:text-[#3d2339]">
                      <Plus size={13} className="text-[#d86343]" /> Add to Order
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#f6d68f] px-3.5 py-2 text-xs font-bold text-[#3d2339]">
                    {item.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.6rem] border border-dashed border-[#cfbea8] px-6 py-16 text-center">
            <p className="display text-3xl">Nothing by that name just yet.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-3 text-xs font-bold underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function CakePricing() {
  const { ref, isInView } = useInView();
  const { addItem } = useOrder();

  const handleAddCake = (cakeName: string, weightStr: string, priceVal: number) => {
    addItem({
      name: cakeName,
      category: 'Gateaux',
      priceNumeric: priceVal,
      priceDisplay: `₹${priceVal}`,
      quantity: 1,
      weightOrSize: weightStr,
      isEggless: false,
    });
  };

  return (
    <section className="bg-[#f8f2e8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1340px] section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-[#d86343]">Celebration cakes</p>
            <h2 className="display mt-2 text-5xl font-semibold tracking-[-.05em]">Gateaux by the kilo.</h2>
          </div>
          <p className="text-xs text-[#6e5763]">Click any price to add that size to your order</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {cakeSections.map((section) => (
            <div
              key={section.name}
              className="overflow-hidden rounded-[1.6rem] border border-[#cfbea8] bg-[#fff9f0]"
            >
              <div className="flex items-center justify-between bg-[#3d2339] px-6 py-4 text-[#fff8ee]">
                <h3 className="display text-2xl font-semibold">{section.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#f6d68f]">Gateaux</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="border-b border-[#eadbc9] text-[10px] font-bold uppercase tracking-[.12em] text-[#8d767c]">
                    <tr>
                      <th className="px-6 py-3">Flavour</th>
                      <th className="px-3 py-3 text-center">½ kg</th>
                      <th className="px-3 py-3 text-center">1 kg</th>
                      <th className="px-6 py-3 text-center">2 kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((cake) => (
                      <tr key={cake.name} className="border-b border-[#eadbc9] last:border-0 hover:bg-[#f8f2e8] transition-colors">
                        <td className="px-6 py-3.5 font-semibold text-[#3d2339]">{cake.name}</td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => handleAddCake(cake.name, '½ kg', cake.half)}
                            className="inline-flex items-center gap-1 rounded-full bg-[#f8f2e8] hover:bg-[#d86343] hover:text-[#fff8ee] px-2.5 py-1.5 text-xs font-bold text-[#d86343] transition-colors border border-[#cfbea8]/40"
                          >
                            <span>₹{cake.half}</span>
                            <Plus size={11} />
                          </button>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => handleAddCake(cake.name, '1 kg', cake.one)}
                            className="inline-flex items-center gap-1 rounded-full bg-[#f8f2e8] hover:bg-[#d86343] hover:text-[#fff8ee] px-2.5 py-1.5 text-xs font-bold text-[#d86343] transition-colors border border-[#cfbea8]/40"
                          >
                            <span>₹{cake.one}</span>
                            <Plus size={11} />
                          </button>
                        </td>
                        <td className="px-6 py-2 text-center">
                          <button
                            onClick={() => handleAddCake(cake.name, '2 kg', cake.two)}
                            className="inline-flex items-center gap-1 rounded-full bg-[#f8f2e8] hover:bg-[#d86343] hover:text-[#fff8ee] px-2.5 py-1.5 text-xs font-bold text-[#d86343] transition-colors border border-[#cfbea8]/40"
                          >
                            <span>₹{cake.two}</span>
                            <Plus size={11} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-[1.6rem] bg-[#b9c6a1] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="eyebrow text-[#3d2339]">Need something custom?</p>
            <p className="display mt-2 text-3xl font-semibold">Tell Sushmita the feeling.</p>
          </div>
          <Link
            href="/contact"
            className="solid-button inline-flex w-fit items-center gap-3 rounded-full bg-[#3d2339] px-7 py-4 text-xs font-bold text-[#fff8ee]"
          >
            Start a custom enquiry <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  return (
    <div className="page-enter">
      <MenuHeader search={search} setSearch={setSearch} />
      <CounterItems search={search} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <CakePricing />
    </div>
  );
}
