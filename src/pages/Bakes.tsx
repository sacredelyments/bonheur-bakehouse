import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CakeSlice, Plus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { bakes, toneColors, type Bake } from '@/data/menu-data';
import { useOrder } from '@/context/OrderContext';
import { BONHEUR_DISPLAY_PHONE } from '@/lib/whatsapp';
import { DishOfTheDay } from '@/components/DishOfTheDay';

const filters = ['All', 'Gateaux', 'All day', 'Little treats'] as const;

function parseBakePrice(priceStr: string): number {
  const match = priceStr.match(/\d+[\d,]*/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ''), 10);
  }
  return 500;
}

function BakesHeader() {
  return (
    <div className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1340px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="eyebrow mb-5 text-[#d86343]">From the kitchen</p>
          <h1 className="display text-5xl font-semibold leading-[.92] tracking-[-.06em] sm:text-8xl">
            Small joys,<br /><span className="font-normal">made edible.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[420px] text-sm leading-7 text-[#6e5763]">
            A rotating selection of artisanal cakes and morning bakes. Pick any treat to order directly on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Bakes() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const { addItem, openDrawer } = useOrder();
  const { ref, isInView } = useInView();

  const filtered = activeFilter === 'All' ? bakes : bakes.filter((b) => b.category === activeFilter);

  const handleQuickAdd = (bake: Bake) => {
    const numericPrice = parseBakePrice(bake.price);
    addItem({
      name: bake.name,
      category: bake.category,
      priceNumeric: numericPrice,
      priceDisplay: bake.price,
      quantity: 1,
      weightOrSize: bake.category === 'Gateaux' ? '1/2 kg' : 'Standard',
      isEggless: false,
    });
  };

  return (
    <div className="page-enter">
      <BakesHeader />

      <DishOfTheDay className="pb-20 sm:pb-24" showTitleHeader={false} />

      <section className="mx-auto max-w-[1340px] px-5 pb-32 sm:px-8 lg:px-12">
        {/* Filter tabs */}
        <div className="hide-scrollbar mb-10 flex justify-center gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]'
                  : 'border-[#cfbea8] text-[#6e5763] hover:border-[#3d2339] hover:text-[#3d2339]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Magazine-style bakes grid */}
        <div
          ref={ref}
          className={`grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 section-reveal ${isInView ? 'in-view' : ''}`}
        >
          {filtered.map((bake, index) => (
            <article
              key={bake.name}
              className={`group flex flex-col ${index === 1 ? 'lg:mt-16' : ''} stagger-${(index % 3) + 1}`}
            >
              <div
                className="image-shine relative aspect-[.9] overflow-hidden rounded-[1.8rem] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: toneColors[bake.tone] }}
                onClick={() => handleQuickAdd(bake)}
              >
                {bake.image ? (
                  <img src={bake.image} alt={bake.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center p-10 text-center">
                    <CakeSlice size={56} strokeWidth={1} className="text-[#3d2339]/40" />
                    <span className="display mt-3 text-3xl text-[#3d2339]/60">{bake.name}</span>
                  </div>
                )}

                {/* Category tag */}
                <span className="absolute left-4 top-4 rounded-full bg-[#fff9f0]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#3d2339] shadow-sm backdrop-blur-sm">
                  {bake.category}
                </span>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd(bake);
                  }}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-[#25D366] text-white px-3.5 py-2.5 text-xs font-bold shadow-lg transition-transform hover:scale-105 hover:bg-[#20bd5a]"
                  aria-label={`Order ${bake.name} on WhatsApp`}
                >
                  <MessageCircle size={14} />
                  <span>Order</span>
                </button>
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="display text-[26px] font-semibold leading-tight">{bake.name}</h2>
                    <span className="shrink-0 text-sm font-bold text-[#d86343]">{bake.price}</span>
                  </div>
                  <p className="mt-2 text-[12px] leading-5 text-[#6e5763]">{bake.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#cfbea8]/40 flex items-center justify-between">
                  <button
                    onClick={() => handleQuickAdd(bake)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3d2339] hover:text-[#d86343] transition-colors"
                  >
                    <Plus size={14} className="text-[#d86343]" /> Add to Order Bag
                  </button>
                  <button
                    onClick={() => handleQuickAdd(bake)}
                    className="text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    Direct WhatsApp
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[#cfbea8] pt-8 sm:flex-row">
          <p className="text-sm text-[#6e5763]">Looking for custom party cakes or wedding dessert tables?</p>
          <div className="flex items-center gap-4">
            <button
              onClick={openDrawer}
              className="solid-button inline-flex items-center gap-2 rounded-full bg-[#3d2339] px-6 py-3 text-xs font-bold text-[#fff8ee] hover:bg-[#d86343] transition-colors"
            >
              <ShoppingBag size={14} /> View Order Bag
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold underline decoration-[#d86343] decoration-2 underline-offset-4 hover:text-[#d86343] transition-colors"
            >
              Custom Enquiry <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
