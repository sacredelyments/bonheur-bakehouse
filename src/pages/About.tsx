import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

function Hero() {
  return (
    <section className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="absolute -inset-4 rotate-[-3deg] rounded-[2.2rem] bg-[#f6d68f]" />
          <div className="relative aspect-[.82] w-full overflow-hidden rounded-[2rem]">
            <img
              src="/images/bonheur-chef-sushmita.jpg"
              alt="Sushmita, chef and artisan at Bonheur Bakehouse"
              className="h-full w-full object-cover object-[center_58%]"
            />
          </div>
          <span className="absolute -bottom-5 -right-4 rounded-full bg-[#d86343] px-5 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#fff8ee]">
            Made by hand
          </span>
        </div>
        <div className="reveal">
          <p className="eyebrow mb-5 text-[#d86343]">Meet the maker</p>
          <h1 className="display max-w-[640px] text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">
            The hands<br /><span className="font-normal">behind the happy.</span>
          </h1>
          <p className="mt-7 max-w-[560px] text-base leading-7 text-[#6e5763]">
            Sushmita is the main bakery chef and artisan behind Bonheur Bakehouse. From delicate gateaux to celebration cakes made for a very specific feeling, she brings a patient, personal touch to everything that leaves the kitchen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold">
            <span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Chef & artisan</span>
            <span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Custom cakes</span>
            <span className="rounded-full border border-[#cfbea8] px-4 py-2.5">Bangalore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const { ref, isInView } = useInView();
  return (
    <section
      ref={ref}
      className={`mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-5 text-[#d86343]">The story</p>
          <blockquote className="display text-4xl font-medium leading-[1.1] tracking-[-.035em] text-[#3d2339] sm:text-5xl">
            "Her kind of baking is thoughtful without being precious."
          </blockquote>
        </div>
        <div className="flex flex-col justify-center gap-5 text-base leading-7 text-[#6e5763]">
          <p>
            Her kind of baking is thoughtful without being precious: good ingredients, careful detail, and something that makes people pause before the first bite.
          </p>
          <p>
            Every cake that leaves Bonheur is made slowly and with intention. There are no shortcuts and no compromises — just the right butter, the right vanilla, the kind of chocolate that makes the whole room go quiet.
          </p>
          <p>
            Sushmita learned early that baking is as much about listening as it is about technique. A brief moment of conversation before every custom order — what you love, who it's for, what it needs to feel like — and she takes it from there.
          </p>
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
    <section className="bg-[#3d2339] px-5 py-24 sm:px-8 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1180px] section-reveal ${isInView ? 'in-view' : ''}`}
      >
        <p className="eyebrow mb-5 text-[#f6d68f]">What we believe in</p>
        <h2 className="display mb-14 max-w-[560px] text-5xl font-semibold leading-[.93] tracking-[-.05em] text-[#fff8ee] sm:text-7xl">
          Baked with<br /><span className="font-normal">conviction.</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`flex flex-col justify-between rounded-[1.8rem] p-7 sm:p-9 stagger-${i + 1}`}
              style={{ backgroundColor: v.bg }}
            >
              <div>
                <p className="eyebrow mb-4 text-[#3d2339]">0{i + 1} /</p>
                <h3 className="display text-3xl font-semibold leading-tight tracking-[-.04em] text-[#3d2339]">{v.label}</h3>
                <p className="mt-5 text-sm leading-6 text-[#3d2339]/70">{v.text}</p>
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
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow mb-3 text-[#d86343]">Let's make something together</p>
          <h2 className="display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
            Ready to start?
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
      <Story />
      <Values />
      <AboutCta />
    </div>
  );
}

