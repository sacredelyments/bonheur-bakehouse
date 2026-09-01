import { Link } from 'wouter';
import { ArrowRight, Sparkles, Heart, ChefHat, Flame, Compass, Award } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

function Hero() {
  return (
    <section className="bg-[#fff9f0] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1220px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-4 rotate-[-3deg] rounded-[2.5rem] bg-[#f6d68f] transition-transform duration-500 hover:rotate-[-1deg]" />
          <div className="relative aspect-[.84] w-full overflow-hidden rounded-[2.2rem] shadow-xl">
            <img
              src="/images/bonheur-chef-sushmita.jpg"
              alt="Sushmita, founder and pastry chef at Bonheur Bakehouse"
              className="h-full w-full object-cover object-[center_55%] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d2339]/40 via-transparent to-transparent" />
          </div>
          <span className="absolute -bottom-5 -right-3 sm:-right-5 rounded-full bg-[#d86343] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#fff8ee] shadow-lg flex items-center gap-2">
            <Sparkles size={14} className="animate-spin text-[#f6d68f]" style={{ animationDuration: '8s' }} />
            Founder & Chef
          </span>
          <div className="absolute -top-4 -left-3 sm:-left-5 rounded-2xl bg-[#fff8ee] border border-[#cfbea8] px-4 py-2.5 shadow-md flex items-center gap-2 text-xs font-bold text-[#3d2339]">
            <Heart size={14} className="text-[#d86343] fill-[#d86343]" />
            <span>Bangalore, India</span>
          </div>
        </div>

        <div className="reveal">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-[#d86343]">
            <span className="h-px w-6 bg-[#d86343]" />
            Meet the Founder & Artisan
          </p>
          <h1 className="display max-w-[680px] text-5xl font-semibold leading-[.95] tracking-[-.055em] text-[#3d2339] sm:text-7xl lg:text-[5.2rem]">
            The hands<br />
            <span className="font-normal text-[#d86343] italic">behind the happy.</span>
          </h1>
          <p className="mt-7 max-w-[580px] text-lg leading-relaxed text-[#6e5763]">
            From an accidental molten lava cake in school to running our thriving atelier in Bangalore, every single treat from Sushmita’s oven is rooted in honest grit, quiet patience, and deep human connection.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-bold text-[#3d2339]">
            <span className="rounded-full bg-[#f6d68f]/60 border border-[#e4c278] px-4 py-2 flex items-center gap-1.5">
              <ChefHat size={14} className="text-[#d86343]" /> APCA Bangalore Alum
            </span>
            <span className="rounded-full bg-[#b9c6a1]/40 border border-[#a4b48a] px-4 py-2 flex items-center gap-1.5">
              <Award size={14} className="text-[#4e6b36]" /> Ex-Smoor Pastry Chef
            </span>
            <span className="rounded-full bg-[#e5b9a8]/50 border border-[#d39c89] px-4 py-2 flex items-center gap-1.5">
              <Flame size={14} className="text-[#d86343]" /> 100% Scratch-Made
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundersStory() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className={`mx-auto max-w-[1220px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      {/* Section Header */}
      <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
        <p className="eyebrow mb-3.5 text-[#d86343] flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#d86343]" />
          Our Journey
          <span className="h-px w-8 bg-[#d86343]" />
        </p>
        <h2 className="display text-4xl font-semibold leading-[1.05] tracking-[-.045em] text-[#3d2339] sm:text-6xl">
          The story behind every slice
        </h2>
        <p className="mt-4 text-base text-[#6e5763] max-w-[540px] mx-auto">
          No corporate shortcuts. No premixes. Just a girl with an oven, relentless passion, and the courage to pursue what brings people joy.
        </p>
      </div>

      {/* Featured Hook Quote */}
      <div className="relative mb-16 sm:mb-20 overflow-hidden rounded-[2.2rem] bg-[#3d2339] p-8 text-[#fff8ee] sm:p-12 lg:p-16 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#d86343]/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-[#f6d68f]/10 blur-3xl" />
        
        <div className="relative z-10 max-w-[880px]">
          <span className="display text-6xl leading-none text-[#f6d68f] opacity-60">“</span>
          <blockquote className="display -mt-4 text-3xl font-medium leading-[1.18] tracking-[-.03em] sm:text-5xl text-[#fff8ee]">
            It all started with an <span className="text-[#f6d68f] italic underline decoration-[#d86343] decoration-2 underline-offset-8">accidental molten lava cake</span>.
          </blockquote>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#d9c6c8] max-w-[720px]">
            Long before our ovens ran seven days a week, baking was just a childhood obsession—messing up recipes after school, rolling handmade bonbons, and discovering that a failed cake could turn into a gooey chocolate masterpiece.
          </p>
        </div>
      </div>

      {/* Chapter Grid Flow */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        
        {/* Chapter 1: The Crossroads */}
        <div className="group flex flex-col justify-between rounded-[2rem] bg-[#fff9f0] border border-[#cfbea8] p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-[#d86343]/40">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="eyebrow rounded-full bg-[#f6d68f] px-3.5 py-1.5 text-[#3d2339] font-bold">
                Chapter 01
              </span>
              <Compass size={20} className="text-[#d86343]" />
            </div>
            <h3 className="display text-2xl sm:text-3xl font-semibold leading-tight text-[#3d2339] mb-4">
              A fork in the road: BBA vs. The Kitchen
            </h3>
            <p className="text-base leading-relaxed text-[#6e5763]">
              When college ended, the conventional road was clear: take the BBA degree and head straight for business school. But a corporate desk couldn't compete with the precision, heat, and creativity of a professional kitchen. While everyone around pushed for the safe route, the pull toward pastry was undeniable.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#cfbea8]/60 flex items-center gap-3 text-xs font-semibold text-[#3d2339]">
            <span className="h-2 w-2 rounded-full bg-[#d86343]" />
            <span>Choosing passion over the conventional desk</span>
          </div>
        </div>

        {/* Chapter 2: The Pro Grind & Mastery */}
        <div className="group flex flex-col justify-between rounded-[2rem] bg-[#fdf2df] border border-[#cfbea8] p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-[#d86343]/40">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="eyebrow rounded-full bg-[#b9c6a1] px-3.5 py-1.5 text-[#3d2339] font-bold">
                Chapter 02
              </span>
              <ChefHat size={20} className="text-[#4e6b36]" />
            </div>
            <h3 className="display text-2xl sm:text-3xl font-semibold leading-tight text-[#3d2339] mb-4">
              Forged in fire: Mayfair, APCA & Smoor
            </h3>
            <p className="text-base leading-relaxed text-[#6e5763]">
              The real craft took shape behind the Mamma Mia counter at Mayfair, building tiered cakes under pressure. That hands-on grind earned a spot at the Academy of Pastry & Culinary Arts (APCA) in Bangalore, leading to a role as Pastry Chef at Smoor Chocolates.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#cfbea8]/60 flex items-center gap-3 text-xs font-semibold text-[#3d2339]">
            <span className="h-2 w-2 rounded-full bg-[#4e6b36]" />
            <span>Refining classical pastry techniques with relentless precision</span>
          </div>
        </div>

        {/* Chapter 3: 2020 Lockdown & Mom's Kitchen (Full width highlight) */}
        <div className="md:col-span-2 rounded-[2.2rem] bg-[#e5b9a8]/40 border-2 border-[#d86343]/30 p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Heart size={260} className="text-[#d86343]" />
          </div>
          <div className="max-w-[840px] relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow rounded-full bg-[#d86343] px-4 py-1.5 text-[#fff8ee] font-bold">
                The Turning Point · 2020
              </span>
              <span className="text-xs font-bold text-[#d86343] uppercase tracking-wider">Back to the roots</span>
            </div>
            <h3 className="display text-3xl sm:text-4xl font-semibold leading-tight text-[#3d2339] mb-5">
              Then came 2020. Baking with Mom in Odisha.
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-[#5c3e50] mb-6">
              Back home in Odisha during the lockdowns, the professional kitchens were closed, but the ovens didn't stop. Baking alongside Mom—filling the house with the aroma of warm butter and vanilla—turned into an overnight local favorite.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#5c3e50] font-medium italic border-l-4 border-[#d86343] pl-5">
              That humble home setup brought everything back into focus: baking isn't just about technique; it's about comfort and connection.
            </p>
          </div>
        </div>

        {/* Chapter 4: The Leap to Bangalore */}
        <div className="group flex flex-col justify-between rounded-[2rem] bg-[#fff9f0] border border-[#cfbea8] p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-[#d86343]/40">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="eyebrow rounded-full bg-[#f6d68f] px-3.5 py-1.5 text-[#3d2339] font-bold">
                Chapter 03
              </span>
              <Flame size={20} className="text-[#d86343]" />
            </div>
            <h3 className="display text-2xl sm:text-3xl font-semibold leading-tight text-[#3d2339] mb-4">
              The leap: An empty room & a reliable oven
            </h3>
            <p className="text-base leading-relaxed text-[#6e5763]">
              When Bangalore called again, there was no hesitation. No corporate safety net, no hesitation—just an empty room, a reliable oven, and a commitment to doing things from scratch.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#cfbea8]/60 flex items-center gap-3 text-xs font-semibold text-[#3d2339]">
            <span className="h-2 w-2 rounded-full bg-[#d86343]" />
            <span>Built from scratch with zero compromises</span>
          </div>
        </div>

        {/* Chapter 5: Four Years Later (Today) */}
        <div className="group flex flex-col justify-between rounded-[2rem] bg-[#b9c6a1]/30 border border-[#cfbea8] p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-[#4e6b36]/40">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="eyebrow rounded-full bg-[#b9c6a1] px-3.5 py-1.5 text-[#3d2339] font-bold">
                Today · 4 Years Later
              </span>
              <Sparkles size={20} className="text-[#4e6b36]" />
            </div>
            <h3 className="display text-2xl sm:text-3xl font-semibold leading-tight text-[#3d2339] mb-4">
              A thriving bakehouse built on grit & craft
            </h3>
            <p className="text-base leading-relaxed text-[#6e5763]">
              Four years later, that unplanned leap is our thriving bakehouse. From our signature melt-in-your-mouth tres leches and crisp, savory patties to bespoke celebration cakes, every single bake carries the same love, grit, and craft that started in a home kitchen.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#cfbea8]/60 flex items-center gap-3 text-xs font-semibold text-[#3d2339]">
            <span className="h-2 w-2 rounded-full bg-[#4e6b36]" />
            <span>Handmade daily for celebrations across Bangalore</span>
          </div>
        </div>

      </div>

      {/* Heartfelt Closing Card: "Pull up a chair. We saved you a slice." */}
      <div className="mt-14 sm:mt-18 rounded-[2.5rem] bg-gradient-to-br from-[#f6d68f] via-[#f9e2b0] to-[#f4cf7f] p-8 sm:p-14 text-center border border-[#e4c278] shadow-xl relative overflow-hidden">
        <div className="mx-auto max-w-[620px] relative z-10">
          <Sparkles className="mx-auto mb-4 text-[#d86343]" size={28} />
          <h3 className="display text-4xl sm:text-5xl font-semibold leading-tight tracking-[-.04em] text-[#3d2339]">
            “Pull up a chair.<br />
            <span className="text-[#d86343] italic">We saved you a slice.”</span>
          </h3>
          <p className="mt-4 text-sm sm:text-base text-[#614524] font-medium">
            Warmly welcoming you to experience the handcrafted difference at Bonheur Bakehouse.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="solid-button inline-flex items-center gap-2 rounded-full bg-[#3d2339] px-7 py-4 text-xs font-bold text-[#fff8ee] hover:bg-[#d86343] transition-colors shadow-md"
            >
              Explore Our Menu <ArrowRight size={15} />
            </Link>
            <Link
              href="/celebrate"
              className="outline-button inline-flex items-center gap-2 rounded-full border-2 border-[#3d2339] px-7 py-4 text-xs font-bold text-[#3d2339] hover:bg-[#3d2339] hover:text-[#fff8ee] transition-colors"
            >
              Order Celebration Cake <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const { ref, isInView } = useInView();
  const values = [
    {
      label: 'Small batches',
      text: 'Everything is baked to order or in carefully controlled quantities. Nothing sits. Nothing waits.',
      bg: '#f6d68f',
    },
    {
      label: 'Honest ingredients',
      text: 'Real butter. Good chocolate. Seasonal fruit. No fillers, no shortcuts, no compromises on flavour.',
      bg: '#b9c6a1',
    },
    {
      label: 'Made with patience',
      text: 'Some things simply take the time they need. We are not in a rush. And we hope you can taste it.',
      bg: '#e5b9a8',
    },
  ];
  return (
    <section className="bg-[#3d2339] px-5 py-24 sm:px-8 lg:py-28 text-[#fff8ee]">
      <div
        ref={ref}
        className={`mx-auto max-w-[1220px] section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <p className="eyebrow mb-4 text-[#f6d68f]">What we believe in</p>
        <h2 className="display mb-14 max-w-[560px] text-5xl font-semibold leading-[.93] tracking-[-.05em] text-[#fff8ee] sm:text-7xl">
          Baked with<br /><span className="font-normal text-[#f6d68f]">conviction.</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`flex flex-col justify-between rounded-[2rem] p-8 sm:p-10 shadow-lg stagger-${i + 1} transition-transform duration-300 hover:-translate-y-1`}
              style={{ backgroundColor: v.bg }}
            >
              <div>
                <p className="eyebrow mb-4 text-[#3d2339]">0{i + 1} /</p>
                <h3 className="display text-3xl font-semibold leading-tight tracking-[-.04em] text-[#3d2339]">{v.label}</h3>
                <p className="mt-5 text-sm leading-6 text-[#3d2339]/80 font-medium">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`bg-[#f6d68f] px-5 py-20 sm:px-8 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="mx-auto flex max-w-[1220px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow mb-3 text-[#d86343]">Let's bake something memorable</p>
          <h2 className="display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl text-[#3d2339]">
            Have a celebration in mind?
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="solid-button inline-flex items-center gap-3 rounded-full bg-[#3d2339] px-7 py-4 text-xs font-bold text-[#fff8ee]"
          >
            Say hello <ArrowRight size={15} />
          </Link>
          <Link
            href="/menu"
            className="outline-button inline-flex items-center gap-2 rounded-full border border-[#3d2339] px-7 py-4 text-xs font-bold"
          >
            View the menu <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="page-enter">
      <Hero />
      <FoundersStory />
      <Values />
      <AboutCta />
    </div>
  );
}


