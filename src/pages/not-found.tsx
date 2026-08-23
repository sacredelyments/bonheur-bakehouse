import { Link } from 'wouter';
import { CakeSlice, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#f8f2e8] px-5 py-24 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#f6d68f] text-[#d86343] mb-6">
          <CakeSlice size={28} strokeWidth={1.5} />
        </span>
        <p className="eyebrow text-[#d86343] mb-2">404 Error</p>
        <h1 className="display text-5xl font-semibold text-[#3d2339] tracking-[-0.04em]">
          Lost your slice?
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#6e5763] max-w-sm">
          We couldn't find the page you were looking for. Maybe it was fresh out of the oven and already enjoyed.
        </p>
        <Link
          href="/"
          className="solid-button mt-8 inline-flex items-center gap-3 rounded-full bg-[#d86343] px-7 py-4 text-xs font-bold text-[#fff8ee]"
        >
          Back to the bakehouse <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
