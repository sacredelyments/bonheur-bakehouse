import { Link } from 'wouter';
import { ArrowRight, Clock3, Instagram, MapPin } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import morningBakes from '@/assets/morning-bakes.jpg';

function Hero() {
  return (
    <section className="bg-[#f6d68f] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow mb-5 text-[#d86343]">The little shop</p>
          <h1 className="display text-6xl font-semibold leading-[.88] tracking-[-.07em] sm:text-8xl">
            See you<br /><span className="font-normal">at the<br />counter.</span>
          </h1>
        </div>
        <p className="max-w-[380px] text-base leading-7 text-[#6e5763]">
          We're a small neighbourhood bakehouse in HSR Layout. The best way to experience Bonheur is to walk in and see what's out of the oven — but drop us a message first, we bake in small batches.
        </p>
      </div>
    </section>
  );
}

function Info() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: info */}
        <div className="flex flex-col gap-10">
          <div className="rounded-[1.8rem] border border-[#cfbea8] bg-[#fff9f0] p-8">
            <MapPin size={20} className="mb-5 text-[#d86343]" strokeWidth={1.6} />
            <p className="eyebrow mb-3 text-[#d86343]">Address</p>
            <p className="text-base font-semibold leading-7">
              101/B, 17th Main Road,<br />
              near HSR Government School,<br />
              HSR Layout, Bangalore — 560102
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=101%2FB%2017th%20Main%20Road%20HSR%20Bangalore"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold underline decoration-[#d86343] decoration-2 underline-offset-4"
            >
              Open in maps <ArrowRight size={13} />
            </a>
          </div>

          <div className="rounded-[1.8rem] border border-[#cfbea8] bg-[#fff9f0] p-8">
            <Clock3 size={20} className="mb-5 text-[#d86343]" strokeWidth={1.6} />
            <p className="eyebrow mb-3 text-[#d86343]">Hours & Orders</p>
            <p className="text-base font-semibold leading-7">
              We bake in small batches,<br />
              so the counter changes daily.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#6e5763]">
              Drop us a line on WhatsApp before visiting to check what's fresh out of the oven. Pre-orders are always welcome.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://wa.me/919870449479?text=Hi%20Bonheur%20Bakehouse!%20What%20bakes%20are%20available%20today%3F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-[#ffffff]"
              >
                WhatsApp: +91 98704 49479 <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-[#3d2339] p-8 text-[#fff8ee]">
            <p className="eyebrow mb-3 text-[#f6d68f]">Stay in the loop</p>
            <p className="text-sm leading-6 text-[#d9c6c8]">
              We post what's coming out of the oven on Instagram first. Follow along to see daily bakes.
            </p>
            <a
              href="https://www.instagram.com/bonheurbakehouse/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#f6d68f] transition-opacity hover:opacity-70"
            >
              <Instagram size={13} /> @bonheurbakehouse <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="image-shine rotate-1 overflow-hidden rounded-[1.8rem] shadow-[0_30px_60px_rgba(80,42,47,.14)]">
            <img
              src={morningBakes}
              alt="Inside Bonheur Bakehouse"
              className="aspect-[.85] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-0 rounded-[1.4rem] bg-[#f6d68f] px-6 py-5 shadow-[0_14px_30px_rgba(80,42,47,.12)]">
            <p className="eyebrow text-[#d86343]">HSR Layout</p>
            <p className="display mt-1.5 text-2xl font-semibold">Bangalore</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryBanner() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`bg-[#b9c6a1] px-5 py-16 sm:px-8 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow mb-3 text-[#3d2339]">Delivery available</p>
          <h2 className="display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
            Can't make it in?
          </h2>
          <p className="mt-3 max-w-[380px] text-sm leading-6 text-[#4d4d3e]">
            We deliver across Bangalore. Get in touch with your address and we'll sort it out.
          </p>
        </div>
        <Link
          href="/contact"
          className="solid-button inline-flex w-fit items-center gap-3 rounded-full bg-[#3d2339] px-7 py-4 text-xs font-bold text-[#fff8ee]"
        >
          Arrange delivery <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export default function Visit() {
  return (
    <div className="page-enter">
      <Hero />
      <Info />
      <DeliveryBanner />
    </div>
  );
}
