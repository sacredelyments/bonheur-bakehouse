import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowLeft,
  ArrowRight,
  CakeSlice,
  Check,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { OrderDrawer } from '@/components/OrderDrawer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { logOrderToWebhook, createWhatsAppLink, BONHEUR_DISPLAY_PHONE } from '@/lib/whatsapp';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Founder Chef Sushmita' },
  { href: '/menu', label: 'Menu' },
  { href: '/bakes', label: 'Bakes' },
  { href: '/celebrate', label: 'Celebrate' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
];

function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', contact: '', details: '' });

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', contact: '', details: '' });
      }, 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const whatsappMessage = encodeURIComponent(
    `🎂 *CAKE ENQUIRY — Bonheur Bakehouse*\n━━━━━━━━━━━━━━━━━━\n*Name:* ${formState.name || 'Friend'}\n*Contact:* ${formState.contact || '-'}\n*Enquiry Details:* ${formState.details || 'I would like to order a custom cake'}\n━━━━━━━━━━━━━━━━━━\n_Sent via bonheur-bakehouse.com_`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    logOrderToWebhook({
      customer: {
        name: formState.name,
        phone: formState.contact,
        deliveryType: 'pickup',
        notes: formState.details,
      },
      items: [],
      timestamp: new Date().toISOString(),
      sourceUrl: window.location.href,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#3d2339]/50 p-3 backdrop-blur-sm sm:items-center sm:p-6 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Cake enquiry"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-h-[94dvh] w-full max-w-[680px] overflow-y-auto rounded-[2rem] bg-[#f8f2e8] p-7 shadow-[0_30px_80px_rgba(35,17,32,.3)] sm:p-12 modal-panel">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#cfbea8] bg-[#fff9f0] transition-colors hover:bg-[#3d2339] hover:text-[#fff8ee]"
          aria-label="Close enquiry"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="flex min-h-[300px] flex-col items-start justify-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#b9c6a1] text-[#3d2339]">
              <Check size={24} />
            </span>
            <h3 className="display mt-7 text-4xl font-semibold">We've got it.</h3>
            <p className="mt-3 max-w-[340px] text-sm leading-7 text-[#6e5763]">
              Thank you for dropping by. We'll get back to you soon with something delicious to discuss.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/919113892539?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="solid-button inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#ffffff] px-6 py-3.5 text-xs font-bold shadow-md hover:bg-[#20bd5a]"
              >
                Send via WhatsApp ({BONHEUR_DISPLAY_PHONE}) <ArrowRight size={14} />
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', contact: '', details: '' });
                  onClose();
                }}
                className="text-xs font-bold text-[#6e5763] underline underline-offset-4 hover:text-[#3d2339]"
              >
                Close & return
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow text-[#d86343]">A sweet little shortcut</p>
            <h2 className="display mt-4 text-5xl font-semibold leading-[.92] tracking-[-.05em]">
              Let's talk cake.
            </h2>
            <p className="mt-4 max-w-[440px] text-sm leading-7 text-[#6e5763]">
              Share a few details and we'll help you find the right shape, flavour and amount of happy.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-bold">
                  Your name
                  <input
                    required
                    name="modal-name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]"
                  />
                </label>
                <label className="grid gap-2 text-xs font-bold">
                  Phone / email
                  <input
                    required
                    name="modal-contact"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    placeholder="Phone or email"
                    className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-xs font-bold">
                Tell us about it
                <textarea
                  required
                  name="modal-details"
                  value={formState.details}
                  onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                  rows={3}
                  placeholder="What are we celebrating?"
                  className="resize-none border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343]"
                />
              </label>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="solid-button inline-flex items-center justify-center gap-3 rounded-full bg-[#d86343] px-7 py-4 text-xs font-bold text-[#fff8ee]"
                >
                  Send enquiry <ArrowRight size={15} />
                </button>
                <a
                  href={`https://wa.me/919113892539?text=${encodeURIComponent("Hi Bonheur Bakehouse! I'd like to enquire about ordering a celebration cake.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-button inline-flex items-center gap-2 rounded-full border border-[#3d2339] px-6 py-4 text-xs font-bold text-[#3d2339]"
                >
                  WhatsApp: {BONHEUR_DISPLAY_PHONE} <ArrowRight size={14} />
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const { openDrawer, totalCount, totalAmount } = useOrder();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-[#f8f2e8] text-[#3d2339]">
      <SmoothScroll />

      {/* Continuous Moving Announcement Marquee Bar */}
      <div className="overflow-hidden bg-[#3d2339] py-2.5 border-b border-[#3d2339]/50 select-none">
        <div className="flex min-w-max animate-[marquee-ltr_28s_linear_infinite] items-center gap-10">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-8 text-[11px] font-semibold text-[#fff8ee]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#b9c6a1]/20 px-3.5 py-1 text-[#e5f0d3] border border-[#b9c6a1]/40 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b9c6a1] animate-pulse" />
                Small Batch Fresh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6d68f]/15 px-3.5 py-1 text-[#f6d68f] border border-[#f6d68f]/40 shadow-2xs">
                📍 Delivering Across Bangalore
              </span>
              <a
                href="https://wa.me/919113892539"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1 text-white hover:bg-[#20bd5a] transition-all font-bold shadow-xs"
              >
                <Phone size={11} /> WhatsApp: {BONHEUR_DISPLAY_PHONE}
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c44d68]/20 px-3.5 py-1 text-[#f7c2cf] border border-[#c44d68]/40 shadow-2xs">
                🎂 Custom Celebration Cakes
              </span>
              <span className="text-[#f6d68f]/60 font-light text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#f8f2e8]/90 shadow-[0_2px_12px_rgba(61,35,57,0.06)] backdrop-blur-lg border-b border-[#cfbea8]/40'
            : 'bg-[#f8f2e8]/60 backdrop-blur-xs'
        }`}
      >
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#3d2339] text-[#3d2339] transition-all duration-300 group-hover:bg-[#3d2339] group-hover:text-[#fff8ee] group-hover:rotate-6">
              <CakeSlice size={17} strokeWidth={1.6} />
            </span>
            <span className="display text-[1.2rem] font-semibold leading-none tracking-[-.03em]">
              Bonheur Bakehouse<span className="text-[#d86343]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-5 xl:gap-8 text-xs font-semibold lg:flex shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link whitespace-nowrap ${
                  (link.href === '/' ? location === '/' : location.startsWith(link.href))
                    ? 'nav-link-active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Bag Button */}
            <button
              onClick={openDrawer}
              className="relative flex h-9 items-center gap-2 rounded-full border border-[#3d2339]/35 bg-[#fff9f0] px-3 text-[11px] font-bold text-[#3d2339] shadow-2xs transition-all hover:bg-[#3d2339] hover:text-[#fff8ee] hover:border-[#3d2339]"
              aria-label="View Order Bag"
            >
              <ShoppingBag size={14} className="text-[#d86343]" />
              <span className="hidden sm:inline">Bag</span>
              {totalCount > 0 ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#d86343] px-1 text-[10px] font-bold text-[#fff8ee]">
                  {totalCount}
                </span>
              ) : (
                <span className="text-[10px] text-[#6e5763]">(0)</span>
              )}
            </button>

            {/* WhatsApp link on xl+ */}
            <a
              href="https://wa.me/919113892539"
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 text-[11px] font-bold text-[#1b7e3e] transition-all hover:bg-[#25D366] hover:text-white xl:flex"
              title="Order on WhatsApp"
            >
              <MessageCircle size={13} strokeWidth={1.8} className="text-[#25D366]" />
              <span>{BONHEUR_DISPLAY_PHONE}</span>
            </a>

            {/* Instagram link on 2xl+ */}
            <a
              href="https://www.instagram.com/bonheurbakehouse/"
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-2 rounded-full border border-[#3d2339]/30 px-3.5 text-[11px] font-bold transition-all hover:bg-[#3d2339] hover:text-[#fff8ee] 2xl:flex"
            >
              <Instagram size={13} strokeWidth={1.8} />
              @bonheurbakehouse
            </a>

            {/* Enquire CTA */}
            <button
              className="solid-button hidden rounded-full bg-[#d86343] px-5 py-2.5 text-[11px] font-bold text-[#fff8ee] sm:inline-flex hover:bg-[#c44d68] transition-all shadow-xs"
              onClick={() => setEnquiryOpen(true)}
            >
              Enquire for a cake
            </button>

            {/* Mobile / Tablet Drawer Toggle */}
            <button
              className="grid h-9 w-9 place-items-center rounded-full bg-[#3d2339] text-[#fff8ee] lg:hidden hover:bg-[#d86343] transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer with colorful badges */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="border-t border-[#cfbea8] bg-[#fff9f0] px-5 py-6">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location === '/'
                    ? 'bg-[#3d2339] text-[#fff8ee]'
                    : 'bg-[#3d2339]/5 text-[#3d2339] hover:bg-[#3d2339]/10'
                }`}
              >
                <span>Home</span>
                <span className="rounded-full bg-[#f6d68f] px-2 py-0.5 text-[10px] font-bold text-[#3d2339]">Atelier</span>
              </Link>

              <Link
                href="/bakes"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/bakes')
                    ? 'bg-[#d86343] text-white'
                    : 'bg-[#d86343]/10 text-[#d86343] hover:bg-[#d86343]/20'
                }`}
              >
                <span>Bakes</span>
                <span className="rounded-full bg-[#d86343] px-2 py-0.5 text-[10px] font-bold text-white">Daily Fresh</span>
              </Link>

              <Link
                href="/menu"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/menu')
                    ? 'bg-[#b97a20] text-white'
                    : 'bg-[#f6d68f]/40 text-[#9e6315] hover:bg-[#f6d68f]/60'
                }`}
              >
                <span>Menu & Prices</span>
                <span className="rounded-full bg-[#b97a20] px-2 py-0.5 text-[10px] font-bold text-white">Full Menu</span>
              </Link>

              <Link
                href="/celebrate"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/celebrate')
                    ? 'bg-[#c44d68] text-white'
                    : 'bg-[#c44d68]/10 text-[#c44d68] hover:bg-[#c44d68]/20'
                }`}
              >
                <span>Celebration Cakes</span>
                <span className="rounded-full bg-[#c44d68] px-2 py-0.5 text-[10px] font-bold text-white">Custom</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/about') || location.startsWith('/founders')
                    ? 'bg-[#567a42] text-white'
                    : 'bg-[#b9c6a1]/30 text-[#426630] hover:bg-[#b9c6a1]/50'
                }`}
              >
                <span>Founder Chef Sushmita</span>
                <span className="rounded-full bg-[#567a42] px-2 py-0.5 text-[10px] font-bold text-white">Story</span>
              </Link>

              <Link
                href="/visit"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/visit')
                    ? 'bg-[#7a4270] text-white'
                    : 'bg-[#7a4270]/10 text-[#7a4270] hover:bg-[#7a4270]/20'
                }`}
              >
                <span>Visit Us</span>
                <span className="rounded-full bg-[#7a4270] px-2 py-0.5 text-[10px] font-bold text-white">HSR Layout</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  location.startsWith('/contact')
                    ? 'bg-[#3d2339] text-[#fff8ee]'
                    : 'bg-[#3d2339]/5 text-[#3d2339] hover:bg-[#3d2339]/10'
                }`}
              >
                <span>Contact</span>
                <span className="rounded-full bg-[#3d2339] px-2 py-0.5 text-[10px] font-bold text-[#fff8ee]">Direct</span>
              </Link>

              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => { setMobileOpen(false); openDrawer(); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3d2339] px-5 py-3 text-xs font-bold text-[#fff8ee]"
                >
                  <ShoppingBag size={15} /> View Order Bag ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                </button>
                <a
                  href="https://wa.me/919113892539"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-bold text-[#ffffff]"
                >
                  <MessageCircle size={15} /> WhatsApp: {BONHEUR_DISPLAY_PHONE}
                </a>
                <button
                  className="solid-button inline-flex items-center justify-center gap-3 rounded-full bg-[#d86343] px-5 py-3.5 text-xs font-bold text-[#fff8ee]"
                  onClick={() => { setMobileOpen(false); setEnquiryOpen(true); }}
                >
                  Enquire for a cake <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Breadcrumb & Smart Back Navigation Bar on Inner Pages */}
      {location !== '/' && (
        <div className="border-b border-[#cfbea8]/40 bg-[#fff9f0]/90 backdrop-blur-md sticky top-[65px] z-30 transition-all">
          <div className="mx-auto flex max-w-[1340px] items-center justify-between px-5 py-2.5 sm:px-8 lg:px-12 text-xs">
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  setLocation('/');
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#cfbea8]/60 bg-[#f8f2e8] px-3.5 py-1.5 font-bold text-[#3d2339] shadow-xs transition-all hover:bg-[#3d2339] hover:text-[#fff8ee]"
              aria-label="Go back to previous page"
            >
              <ArrowLeft size={13} strokeWidth={2.2} />
              <span>Back</span>
            </button>

            <nav className="flex items-center gap-2 text-[11px] font-semibold text-[#8d767c]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#d86343] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#3d2339] font-bold capitalize">
                {location === '/about' || location === '/founders'
                  ? 'Founder Chef Sushmita'
                  : location.replace('/', '').replace(/-/g, ' ') || 'Page'}
              </span>
            </nav>
          </div>
        </div>
      )}

      <main>{children}</main>

      {/* Floating Quick WhatsApp & Bag Button (Sticky Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {totalCount > 0 && (
          <button
            onClick={openDrawer}
            className="flex items-center gap-2.5 rounded-full bg-[#3d2339] px-4 py-3 text-xs font-bold text-[#fff8ee] shadow-2xl transition-all hover:scale-105 hover:bg-[#d86343]"
            aria-label="Open Order Bag"
          >
            <ShoppingBag size={15} className="text-[#f6d68f]" />
            <span>Bag ({totalCount}) · ₹{totalAmount.toLocaleString('en-IN')}</span>
            <ArrowRight size={13} />
          </button>
        )}
        <a
          href="https://wa.me/919113892539?text=Hi%20Bonheur%20Bakehouse!%20I'd%20like%20to%20order%20a%20cake."
          target="_blank"
          rel="noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#20bd5a]"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      {/* Modals and Drawers */}
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <OrderDrawer />

      {/* Footer */}
      <footer className="bg-[#3d2339] px-5 py-16 text-[#fff8ee] sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1340px]">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#f6d68f] text-[#f6d68f]">
                  <CakeSlice size={17} strokeWidth={1.6} />
                </span>
                <span className="display text-[1.2rem] font-semibold">
                  Bonheur Bakehouse<span className="text-[#f6d68f]">.</span>
                </span>
              </div>
              <p className="mt-5 max-w-[280px] text-xs leading-6 text-[#b99ea5]">
                A neighbourhood bakehouse for everyday cravings and once-in-a-lifetime celebrations. Handmade in small batches, HSR Layout, Bangalore.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="https://wa.me/919113892539"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] transition-opacity hover:opacity-80"
                >
                  <MessageCircle size={14} /> WhatsApp: {BONHEUR_DISPLAY_PHONE}
                </a>
                <a
                  href="tel:+919113892539"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#f6d68f] transition-opacity hover:opacity-80"
                >
                  <Phone size={14} /> Call: {BONHEUR_DISPLAY_PHONE}
                </a>
                <a
                  href="https://www.instagram.com/bonheurbakehouse/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#d9c6c8] transition-opacity hover:opacity-70"
                >
                  <Instagram size={14} /> @bonheurbakehouse
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#684955]">Explore</p>
                <div className="flex flex-col gap-3 text-xs font-semibold">
                  <Link href="/" className="transition-opacity hover:opacity-60">Home</Link>
                  <Link href="/about" className="transition-opacity hover:opacity-60">Founder Chef Sushmita</Link>
                  <Link href="/bakes" className="transition-opacity hover:opacity-60">The Bakes</Link>
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#684955]">Order</p>
                <div className="flex flex-col gap-3 text-xs font-semibold">
                  <Link href="/menu" className="transition-opacity hover:opacity-60">Full Menu</Link>
                  <Link href="/celebrate" className="transition-opacity hover:opacity-60">Custom Cakes</Link>
                  <Link href="/celebrate" className="transition-opacity hover:opacity-60">Wedding Cakes</Link>
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#684955]">Visit & Connect</p>
                <div className="flex flex-col gap-3 text-xs font-semibold">
                  <Link href="/visit" className="transition-opacity hover:opacity-60">Find Us</Link>
                  <Link href="/contact" className="transition-opacity hover:opacity-60">Say Hello</Link>
                  <a href="https://wa.me/919113892539" target="_blank" rel="noreferrer" className="text-[#25D366] transition-opacity hover:opacity-80">WhatsApp Us</a>
                  <a href="https://www.instagram.com/bonheurbakehouse/" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-60">Instagram</a>
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#684955]">Address</p>
                <p className="text-xs leading-6 text-[#b99ea5]">
                  101/B, 17th Main Road,<br />
                  near HSR Government School,<br />
                  HSR Layout, Bangalore
                </p>
              </div>
            </div>
          </div>
          <div className="mt-14 flex justify-between border-t border-[#684955] pt-6 text-[10px] uppercase tracking-[.14em] text-[#684955]">
            <span>Bonheur Bakehouse · Bangalore</span>
            <span>Made with care</span>
          </div>
        </div>
      </footer>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}

