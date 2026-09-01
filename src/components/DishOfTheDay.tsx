import { useState } from 'react';
import { ShoppingBag, MessageCircle, Sparkles, Flame, Clock, Heart, Check, ArrowRight } from 'lucide-react';
import { currentDailySpecial } from '@/data/daily-special';
import { useOrder } from '@/context/OrderContext';
import { BONHEUR_PHONE } from '@/lib/whatsapp';

interface DishOfTheDayProps {
  className?: string;
  showTitleHeader?: boolean;
}

export function DishOfTheDay({ className = '', showTitleHeader = true }: DishOfTheDayProps) {
  const special = currentDailySpecial;
  const { addItem, openDrawer } = useOrder();
  const [added, setAdded] = useState(false);

  if (!special || !special.isAvailable) {
    return null;
  }

  const handleAddToBag = () => {
    addItem({
      name: `[Dish of the Day] ${special.name}`,
      price: special.price,
      quantity: 1,
      isEggless: special.isEggless,
      category: 'Desserts',
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 450);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Bonheur Bakehouse! I would like to reserve today's Chef Special: *${special.name}* (₹${special.price}). Is a box still available for pickup/delivery today?`
  );
  const whatsappUrl = `https://wa.me/${BONHEUR_PHONE}?text=${whatsappMessage}`;

  const remainingPercent = Math.round((special.remainingCount / special.totalBatch) * 100);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {showTitleHeader && (
        <div className="mx-auto max-w-[1220px] px-5 sm:px-8 mb-8 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d86343]/15 border border-[#d86343]/30 px-4 py-1.5 text-xs font-bold text-[#d86343] mb-3 shadow-2xs">
            <Sparkles size={14} className="text-[#d86343] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Today’s Oven Special</span>
          </div>
          <h2 className="display text-3xl sm:text-5xl font-semibold tracking-[-.04em] text-[#3d2339]">
            Dish of the Day
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6e5763] max-w-[560px] mx-auto">
            Small-batch creation baked fresh this morning by Chef Sushmita. Once today’s batch sells out, it’s gone until next time.
          </p>
        </div>
      )}

      <div className="mx-auto max-w-[1220px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#fff9f0] border border-[#cfbea8]/80 shadow-[0_20px_50px_rgba(61,35,57,0.08)] transition-all hover:shadow-[0_24px_60px_rgba(61,35,57,0.12)]">
          {/* Subtle Ambient Gradient */}
          <div
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: special.accentTone || '#d86343' }}
          />

          <div className="grid lg:grid-cols-[1.1fr_1fr] items-stretch">
            {/* Image Column */}
            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-[#3d2339]/5">
              <img
                src={special.image}
                alt={special.name}
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2339]/60 via-transparent to-transparent lg:hidden" />

              {/* Status Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3d2339]/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#f6d68f] border border-[#f6d68f]/30 shadow-md">
                  <Flame size={13} className="text-[#d86343]" />
                  <span>Chef's Daily Special</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff8ee]/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#3d2339] border border-[#cfbea8] shadow-md">
                  <Clock size={12} className="text-[#d86343]" />
                  <span>{special.freshTime}</span>
                </span>
              </div>

              {special.originalPrice && (
                <div className="absolute bottom-4 right-4 z-10 rounded-2xl bg-[#d86343] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
                  Special Save ₹{special.originalPrice - special.price}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
              <div>
                {/* Dietary Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {special.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f8f2e8] border border-[#cfbea8]/70 px-3 py-0.5 text-[11px] font-bold text-[#5a424e]"
                    >
                      {tag}
                    </span>
                  ))}
                  {special.isEggless && (
                    <span className="rounded-full bg-[#567a42]/15 border border-[#567a42]/30 px-3 py-0.5 text-[11px] font-bold text-[#426630]">
                      100% Eggless
                    </span>
                  )}
                </div>

                {/* Dish Title */}
                <h3 className="display text-2xl sm:text-4xl font-semibold tracking-[-.035em] text-[#3d2339] leading-[1.1]">
                  {special.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-[#d86343] tracking-wide">
                  {special.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6e5763]">
                  {special.description}
                </p>

                {/* Chef Note Box */}
                {special.chefNote && (
                  <div className="mt-5 rounded-2xl bg-[#f8f2e8]/90 border border-[#e8dac7] p-4 sm:p-5 shadow-2xs">
                    <p className="text-xs sm:text-sm italic leading-relaxed text-[#5a424e]">
                      {special.chefNote}
                    </p>
                  </div>
                )}

                {/* Live Availability Bar */}
                <div className="mt-6 rounded-2xl border border-[#cfbea8]/60 bg-[#fffdfa] p-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-[#3d2339]">
                      <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                      {special.batchCount}
                    </span>
                    <span className="text-[#d86343]">{special.remainingCount} left today</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#f8f2e8]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d86343] to-[#f6d68f] transition-all duration-500"
                      style={{ width: `${Math.max(15, remainingPercent)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Price & Order Action Bar */}
              <div className="mt-8 pt-6 border-t border-[#cfbea8]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="display text-3xl sm:text-4xl font-bold text-[#3d2339]">
                    ₹{special.price}
                  </span>
                  {special.originalPrice && (
                    <span className="text-base text-[#8d767c] line-through">
                      ₹{special.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-medium text-[#6e5763]">/ portion</span>
                </div>

                <div className="flex w-full sm:w-auto items-center gap-2.5">
                  <button
                    onClick={handleAddToBag}
                    className={`solid-button flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold transition-all shadow-md ${
                      added
                        ? 'bg-[#567a42] text-white'
                        : 'bg-[#d86343] text-white hover:bg-[#c44d68]'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={16} /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} /> Add to Bag
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-3.5 text-xs font-bold text-[#1b7e3e] transition-all hover:bg-[#25D366] hover:text-white shadow-xs"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle size={15} className="text-[#25D366]" />
                    <span className="hidden xs:inline">WhatsApp Order</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
