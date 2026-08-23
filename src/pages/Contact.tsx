import { type FormEvent, useState } from 'react';
import { ArrowRight, Check, Instagram } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { logOrderToWebhook, BONHEUR_DISPLAY_PHONE } from '@/lib/whatsapp';

function ContactHeader() {
  return (
    <div className="bg-[#fff9f0] px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-[#d86343]">Let's make a plan</p>
            <h1 className="display text-6xl font-semibold leading-[.88] tracking-[-.07em] sm:text-8xl">
              Tell us what<br /><span className="font-normal">you're<br />celebrating.</span>
            </h1>
          </div>
          <div>
            <p className="max-w-[380px] text-base leading-7 text-[#6e5763]">
              A date, a guest count, a flavour you love — a rough idea is more than enough. We will take it from there.
            </p>
            <a
              href="https://www.instagram.com/bonheurbakehouse/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold transition-opacity hover:opacity-70"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#3d2339] text-[#fff8ee]">
                <Instagram size={16} />
              </span>
              See what's coming out of the oven
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    occasion: 'a celebration cake',
    details: '',
  });
  const { ref, isInView } = useInView();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    logOrderToWebhook({
      customer: {
        name: formData.name,
        phone: formData.contact,
        deliveryType: 'pickup',
        notes: `Occasion: ${formData.occasion} | Details: ${formData.details}`,
      },
      items: [],
      timestamp: new Date().toISOString(),
      sourceUrl: window.location.href,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `🎂 *CAKE / EVENT ENQUIRY — Bonheur Bakehouse*\n━━━━━━━━━━━━━━━━━━\n*Customer:* ${formData.name || 'Friend'}\n*Contact:* ${formData.contact || '-'}\n*Occasion:* ${formData.occasion}\n*Details:* ${formData.details || 'I want to place an order.'}\n━━━━━━━━━━━━━━━━━━\n_Sent via bonheur-bakehouse.com_`
  );

  return (
    <section
      ref={ref}
      className={`mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 section-reveal ${isInView ? 'in-view' : ''}`}
    >
      <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        {/* Left: info */}
        <div className="flex flex-col gap-8">
          <div className="rounded-[1.6rem] border border-[#cfbea8] bg-[#fff9f0] p-6">
            <p className="eyebrow mb-3 text-[#d86343]">Response time</p>
            <p className="display text-2xl font-semibold">Within a day.</p>
            <p className="mt-2 text-sm leading-6 text-[#6e5763]">No elaborate brief required. We're good listeners.</p>
          </div>
          <div className="rounded-[1.6rem] border border-[#cfbea8] bg-[#fff9f0] p-6">
            <p className="eyebrow mb-3 text-[#d86343]">Quick Connect</p>
            <p className="text-sm text-[#6e5763] mb-4">Chat with us directly to discuss custom sizes, flavours, or delivery.</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/919870449479?text=Hi%20Bonheur%20Bakehouse!%20I'd%20like%20to%20order%20a%20cake."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-bold text-[#ffffff] transition-transform hover:-translate-y-0.5"
              >
                WhatsApp: {BONHEUR_DISPLAY_PHONE} <ArrowRight size={13} />
              </a>
              <a
                href="tel:+919870449479"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3d2339] px-5 py-2.5 text-xs font-bold text-[#3d2339] transition-transform hover:-translate-y-0.5"
              >
                Call: {BONHEUR_DISPLAY_PHONE}
              </a>
            </div>
          </div>
          <div className="rounded-[1.6rem] border border-[#cfbea8] bg-[#fff9f0] p-6">
            <p className="eyebrow mb-3 text-[#d86343]">Follow along</p>
            <a
              href="https://www.instagram.com/bonheurbakehouse/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm font-bold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#3d2339] text-[#fff8ee]">
                <Instagram size={15} />
              </span>
              @bonheurbakehouse
            </a>
          </div>
          <div className="rounded-[1.6rem] bg-[#f6d68f] p-6">
            <p className="eyebrow mb-3 text-[#d86343]">Location</p>
            <p className="text-sm font-semibold leading-6">
              101/B, 17th Main Road,<br />
              near HSR Government School,<br />
              HSR Layout, Bangalore
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-[2rem] bg-[#fff9f0] p-7 shadow-[0_20px_50px_rgba(80,42,47,.08)] sm:p-12">
          {submitted ? (
            <div className="flex min-h-[380px] flex-col items-start justify-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#b9c6a1] text-[#3d2339]">
                <Check size={24} />
              </span>
              <h2 className="display mt-7 text-4xl font-semibold">We've got it.</h2>
              <p className="mt-3 max-w-[360px] text-sm leading-7 text-[#6e5763]">
                Thank you for dropping by. We'll get back to you soon with something delicious to discuss.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/919870449479?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="solid-button inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-bold text-[#ffffff]"
                >
                  Send note on WhatsApp ({BONHEUR_DISPLAY_PHONE}) <ArrowRight size={14} />
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', contact: '', occasion: 'a celebration cake', details: '' });
                  }}
                  className="text-xs font-bold underline underline-offset-4 transition-opacity hover:opacity-60 text-[#6e5763]"
                >
                  Send another note
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-bold">
                  Your name
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="A happy human"
                    className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343] transition-colors"
                  />
                </label>
                <label className="grid gap-2 text-xs font-bold">
                  Email or phone
                  <input
                    required
                    name="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="How can we reach you?"
                    className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343] transition-colors"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-xs font-bold">
                I'm looking for
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none focus:border-[#d86343] transition-colors cursor-pointer"
                >
                  <option>a celebration cake</option>
                  <option>a wedding cake</option>
                  <option>gateaux for a gathering</option>
                  <option>something sweet for today</option>
                  <option>a delivery order</option>
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold">
                A few details
                <textarea
                  required
                  name="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={4}
                  placeholder="Date, flavours, number of people — whatever you know."
                  className="resize-none border-b border-[#cfbea8] bg-transparent px-0 py-3 text-sm font-normal outline-none placeholder:text-[#a38c91] focus:border-[#d86343] transition-colors"
                />
              </label>
              <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <p className="text-[11px] leading-5 text-[#8d767c]">
                  We usually reply within a day.<br />No elaborate brief required.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="solid-button inline-flex items-center justify-center gap-3 rounded-full bg-[#d86343] px-7 py-4 text-xs font-bold text-[#fff8ee]"
                  >
                    Send note <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <div className="page-enter">
      <ContactHeader />
      <ContactForm />
    </div>
  );
}
