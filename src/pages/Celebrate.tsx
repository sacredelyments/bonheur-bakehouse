import { Link } from 'wouter';
import { ArrowRight, CakeSlice, Heart, Sparkles, Star } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import gateauSlice from '@/assets/gateau-slice.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';

function Hero() {
  return (
    <section className="bg-[#b9c6a1] px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1340px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow mb-6 text-[#3d2339]">For the big feelings</p>
          <h1 className="display text-6xl font-semibold leading-[.88] tracking-[-.07em] sm:text-[8rem]">
            Your story,<br /><em className="font-normal text-[#3d2339]/60">in cake.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-[440px] text-base leading-7 text-[#4d4d3e]">
            Birthdays, new chapters, wedding weekends and the "we just felt like it" kind. Tell us the feeling; we will find the flavour.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="solid-button inline-flex items-center gap-3 rounded-full bg-[#3d2339] px-8 py-4.5 text-xs font-bold text-[#fff8ee] hover:bg-[#d86343] transition-colors"
            >
              Start a cake conversation <ArrowRight size={15} />
            </Link>
            <Link
              href="/menu"
              className="outline-button inline-flex items-center gap-2 rounded-full border border-[#3d2339] px-8 py-4.5 text-xs font-bold hover:bg-[#3d2339] hover:text-[#fff8ee] transition-colors"
            >
              See cake prices <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`mx-auto max-w-[1340px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Custom Cakes */}
        <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#f6d68f] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-8 sm:p-12">
            <span className="eyebrow text-[#d86343]">01 /</span>
            <div className="mt-6 flex items-start justify-between">
              <h2 className="display max-w-[300px] text-5xl font-semibold leading-[.92] tracking-[-.055em]">
                Custom cakes
              </h2>
              <CakeSlice size={32} className="text-[#d86343]" strokeWidth={1.2} />
            </div>
            <p className="mt-6 max-w-[360px] text-sm leading-7 text-[#3d2339]/70">
              Every celebration deserves a cake made for it. You choose the occasion — and the feeling — and Sushmita builds the cake around it. Flavour, size, finish: all tailored to you.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold">
              {['Birthdays', 'Anniversaries', 'Baby showers', 'Graduations', 'Corporate gifts', 'Any occasion'].map((o) => (
                <li key={o} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d86343]" /> {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-60 overflow-hidden">
            <img src={gateauSlice} alt="Custom celebration cake" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-6 mt-auto">
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold underline decoration-[#d86343] decoration-2 underline-offset-4 hover:text-[#d86343] transition-colors">
              Order a custom cake <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Wedding Cakes */}
        <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#3d2339] text-[#fff8ee] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-8 sm:p-12">
            <span className="eyebrow text-[#f6d68f]">02 /</span>
            <div className="mt-6 flex items-start justify-between">
              <h2 className="display max-w-[300px] text-5xl font-semibold leading-[.92] tracking-[-.055em]">
                Wedding cakes
              </h2>
              <Sparkles size={32} className="text-[#f6d68f]" strokeWidth={1.2} />
            </div>
            <p className="mt-6 max-w-[360px] text-sm leading-7 text-[#d9c6c8]">
              The cake that ends the evening and starts a hundred photographs. Sushmita takes wedding cakes seriously — which means she takes your relationship seriously, too.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold text-[#b99ea5]">
              {['Multi-tier designs', 'Floral details', 'Custom flavours', 'Eggless options', 'Tasting sessions', 'Full consultation'].map((o) => (
                <li key={o} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f6d68f]" /> {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-60 overflow-hidden">
            <img src={weddingCake} alt="Artisanal wedding cake" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="mt-auto p-6">
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#f6d68f] underline underline-offset-4 hover:text-[#fff8ee] transition-colors">
              Enquire for a wedding cake <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { ref, isInView } = useInView();
  const steps = [
    {
      num: '01',
      icon: Heart,
      title: 'Tell us the feeling',
      text: 'Share a few details — the occasion, who it\'s for, what you love to eat. No brief required.',
    },
    {
      num: '02',
      icon: CakeSlice,
      title: 'We design together',
      text: 'Sushmita suggests flavours, sizes and finishes. You refine until it feels just right.',
    },
    {
      num: '03',
      icon: Star,
      title: 'Collect & celebrate',
      text: 'Pick up your cake from the bakehouse or arrange delivery across Bangalore.',
    },
  ];

  return (
    <section className="bg-[#f8f2e8] px-5 py-24 sm:px-8 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1180px] section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="eyebrow mb-4 text-[#d86343]">How it works</p>
          <h2 className="display text-5xl font-semibold leading-[.93] tracking-[-.055em] sm:text-6xl">
            Simple as<br /><span className="font-normal">a good slice.</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`rounded-[1.8rem] bg-[#fff9f0] p-8 border border-[#cfbea8] stagger-${i + 1}`}
            >
              <span className="eyebrow text-[#d86343]">{step.num}</span>
              <step.icon size={28} className="mt-5 mb-5 text-[#3d2339]" strokeWidth={1.4} />
              <h3 className="display text-2xl font-semibold leading-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6e5763]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CelebrateCta() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`px-5 py-24 sm:px-8 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#d86343] px-8 py-16 text-center text-[#fff8ee] sm:px-12 sm:py-20">
          <p className="eyebrow mb-4 text-[#f6d68f]">Ready to begin?</p>
          <h2 className="display mx-auto max-w-[560px] text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">
            Let's make something worth remembering.
          </h2>
          <p className="mx-auto mt-6 max-w-[400px] text-sm leading-7 text-[#f6d68f]">
            A date, a guest count, a flavour you love — a rough idea is more than enough.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#fff8ee] px-8 py-4.5 text-xs font-bold text-[#d86343] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,.15)]"
          >
            Send us a note <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Celebrate() {
  return (
    <div className="page-enter">
      <Hero />
      <Services />
      <Process />
      <CelebrateCta />
    </div>
  );
}
