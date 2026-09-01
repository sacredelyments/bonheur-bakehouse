import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowDown, ArrowRight, CakeSlice, Sparkles } from 'lucide-react';
import heroCake from '@/assets/hero-cake.jpg';
import gateauSlice from '@/assets/gateau-slice.jpg';
import morningBakes from '@/assets/morning-bakes.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';
import { useInView } from '@/hooks/use-in-view';
import { bakes, toneColors } from '@/data/menu-data';
import { HeroParticles } from '@/components/HeroParticles';
import { DishOfTheDay } from '@/components/DishOfTheDay';

const featured = bakes.slice(0, 3);

const typewriterWords = [
  { text: 'happiness,', color: '#d86343' },       // signature terracotta coral
  { text: 'sweetness,', color: '#c44d68' },       // artisanal berry rose
  { text: 'celebration,', color: '#b97a20' },     // warm honey golden
  { text: 'magic,', color: '#567a42' },           // fresh pistachio sage
  { text: 'indulgence,', color: '#9e5638' },      // warm cocoa amber
  { text: 'memories,', color: '#7a4270' },        // royal plum velvet
];

function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const targetWord = typewriterWords[wordIndex].text;
  const targetColor = typewriterWords[wordIndex].color;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < targetWord.length) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, 60);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typewriterWords.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, targetWord]);

  return (
    <span className="inline-flex items-baseline">
      <em
        className="font-normal italic transition-colors duration-300"
        style={{ color: targetColor }}
      >
        {currentText}
      </em>
      <span
        className="typewriter-cursor inline-block h-[0.75em] w-[4px] ml-1.5 align-baseline transition-colors duration-300 rounded-full"
        style={{ backgroundColor: targetColor }}
      />
    </span>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100dvh-96px)] max-w-[1340px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-12 lg:pb-24 lg:pt-14 overflow-hidden">
      <HeroParticles />
      <div className="reveal relative z-10 max-w-[580px]">
        <p className="eyebrow mb-6 flex items-center gap-2.5 text-[#d86343]">
          <span className="h-px w-8 bg-[#d86343]" />
          A neighbourhood pastry atelier
        </p>
        <h1 className="display text-[clamp(3.4rem,8.5vw,7.8rem)] font-semibold leading-[1.02] tracking-[-0.06em] sm:tracking-[-0.08em]">
          <span>A little</span>
          <span className="block pt-1 pb-1">
            <TypewriterWord />
          </span>
          <span>baked daily.</span>
        </h1>
        <p className="mt-8 max-w-[380px] text-[15px] leading-7 text-[#6e5763]">
          Handmade celebration cakes, patisserie and gateaux for the ordinary Tuesday and the very big day — in Bangalore.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/bakes"
            className="solid-button inline-flex items-center gap-3 rounded-full bg-[#d86343] px-7 py-4 text-xs font-bold text-[#fff8ee] hover:bg-[#c44d68] transition-colors"
          >
            Browse the bakes <ArrowDown size={15} />
          </Link>
          <Link
            href="/celebrate"
            className="outline-button inline-flex items-center gap-2 rounded-full border border-[#3d2339] px-7 py-4 text-xs font-bold hover:bg-[#3d2339] hover:text-[#fff8ee] transition-colors"
          >
            Custom cakes <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-12 flex items-center gap-5 border-t border-[#cfbea8] pt-5 text-xs text-[#6e5763]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#b9c6a1]" />
            Made fresh in small batches
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[#cfbea8] sm:block" />
          <span className="hidden sm:block">HSR Layout · Bangalore</span>
        </div>
      </div>

      <div className="reveal reveal-delay-2 relative z-10 min-h-[500px] sm:min-h-[640px]">
        <div className="h-[480px] sm:h-[580px] w-full overflow-hidden rounded-[10rem_10rem_1.5rem_1.5rem] bg-[#b9c6a1] shadow-2xl">
          <img
            src={heroCake}
            alt="A coral flower cake from Bonheur Bakehouse"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="float-note absolute bottom-5 left-0 max-w-[200px] rounded-2xl bg-[#f6d68f] p-5 shadow-[0_18px_40px_rgba(80,42,47,.14)] sm:bottom-0 sm:left-[-16px] z-20">
          <Sparkles size={16} className="mb-6 text-[#d86343]" />
          <p className="display text-[21px] leading-[1.07]">Made for the moment you say, "just one more slice."</p>
        </div>
        <div className="absolute right-2 top-8 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border border-[#fff9f0] text-center text-[9px] font-bold uppercase leading-3 tracking-[.12em] text-[#fff9f0] sm:right-8 z-20">
          Since<br />the good<br />things
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['Handmade with care', 'Celebration cakes', 'Patisserie & gateaux', 'Delivering across Bangalore'];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#cfbea8] bg-[#f6d68f] py-4">
      <div className="flex min-w-max animate-[marquee_24s_linear_infinite] items-center gap-8 text-[11px] font-bold uppercase tracking-[.17em]">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[#d86343]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedBakes() {
  const { ref, isInView } = useInView();
  return (
    <section className="mx-auto max-w-[1340px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div
        ref={ref}
        className={`section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#d86343]">From the kitchen</p>
            <h2 className="display max-w-[540px] text-5xl font-semibold leading-[.93] tracking-[-.055em] sm:text-7xl">
              Small joys,<br /><span className="font-normal">made edible.</span>
            </h2>
          </div>
          <Link
            href="/bakes"
            className="inline-flex shrink-0 items-center gap-2 text-xs font-bold underline decoration-[#d86343] decoration-2 underline-offset-4 hover:text-[#d86343] transition-colors"
          >
            See all bakes <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((bake, i) => (
            <article
              key={bake.name}
              className={`group stagger-${i + 1}`}
            >
              <div
                className="image-shine relative aspect-[.88] overflow-hidden rounded-[1.6rem] shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: toneColors[bake.tone] }}
              >
                {bake.image ? (
                  <img src={bake.image} alt={bake.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full place-items-center p-10 text-center">
                    <CakeSlice size={52} strokeWidth={1} className="text-[#3d2339]/40" />
                    <span className="display mt-3 text-3xl">{bake.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2339]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="display text-[24px] font-semibold leading-tight">{bake.name}</h3>
                  <p className="mt-1.5 max-w-[240px] text-[12px] leading-5 text-[#6e5763]">{bake.description}</p>
                </div>
                <span className="shrink-0 pt-1 text-[11px] font-bold text-[#d86343]">{bake.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  const { ref, isInView } = useInView();
  return (
    <section className="relative overflow-hidden bg-[#3d2339] px-5 py-24 text-[#fff8ee] sm:px-8 lg:py-32">
      <div
        ref={ref}
        className={`mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.1fr_.9fr] section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <div>
          <p className="eyebrow mb-6 text-[#f6d68f]">A note from our counter</p>
          <blockquote className="display max-w-[680px] text-4xl font-medium leading-[1.06] tracking-[-.035em] sm:text-6xl">
            "The best part is the bit before the first bite — when everyone leans in."
          </blockquote>
          <p className="mt-7 max-w-[380px] text-sm leading-7 text-[#d9c6c8]">
            Bonheur means happiness. We think it belongs in the details: the neat little piping, the good vanilla, the box you do not want to throw away.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#f6d68f] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Meet Sushmita <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="rotate-2 overflow-hidden rounded-[9rem_9rem_1rem_1rem] bg-[#b9c6a1] p-3 shadow-[0_30px_70px_rgba(0,0,0,.3)]">
            <img
              src={morningBakes}
              alt="Fresh pastries at Bonheur"
              className="aspect-[.82] w-full rounded-[8rem_8rem_.6rem_.6rem] object-cover"
            />
          </div>
          <span className="absolute -bottom-5 -left-6 rounded-full bg-[#d86343] px-5 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#fff8ee]">
            Come hungry
          </span>
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
      className={`mx-auto max-w-[1340px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="grid overflow-hidden rounded-[2.5rem] bg-[#b9c6a1] lg:grid-cols-[.65fr_1.35fr]">
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
          <div>
            <p className="eyebrow mb-5 text-[#3d2339]">For the big feelings</p>
            <h2 className="display max-w-[420px] text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">
              Your story,<br /><span className="font-normal">in cake.</span>
            </h2>
            <p className="mt-6 max-w-[340px] text-sm leading-6 text-[#4d4d3e]">
              Birthdays, new chapters, wedding weekends and the "we just felt like it" kind. Tell us the feeling; we will find the flavour.
            </p>
          </div>
          <Link
            href="/celebrate"
            className="solid-button mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#3d2339] px-7 py-4 text-xs font-bold text-[#fff8ee]"
          >
            Start a cake conversation <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-[#d8dfc8] p-3 sm:p-5">
          <div className="image-shine relative overflow-hidden rounded-[1.6rem] aspect-[.88]">
            <img
              src={gateauSlice}
              alt="A gateau cake slice"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#3d2339]/70 via-transparent to-transparent p-5">
              <p className="display text-2xl font-semibold text-[#fff8ee] leading-tight sm:text-4xl">Custom<br />cakes</p>
            </div>
          </div>
          <div className="image-shine relative overflow-hidden rounded-[1.6rem] aspect-[.88]">
            <img
              src={weddingCake}
              alt="Artisanal wedding cake"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#3d2339]/70 via-transparent to-transparent p-5">
              <p className="display text-2xl font-semibold text-[#fff8ee] leading-tight sm:text-4xl">Wedding<br />cakes</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-[1.4rem] bg-[#fff9f0] px-5 py-4 sm:px-8 sm:py-5">
            <span className="text-xs font-semibold text-[#6e5763]">Made slowly. Collected happily.</span>
            <Link href="/celebrate" className="flex items-center gap-2 text-xs font-bold text-[#3d2339]">
              Enquire to begin <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page-enter">
      <HeroSection />
      <Marquee />
      <DishOfTheDay className="py-16 sm:py-24 bg-[#fff9f0]/70 border-b border-[#cfbea8]/40" />
      <FeaturedBakes />
      <QuoteSection />
      <CelebrateCta />
    </div>
  );
}
