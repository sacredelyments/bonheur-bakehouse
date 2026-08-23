import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import {
  BONHEUR_DISPLAY_PHONE,
  formatWhatsAppOrderMessage,
  createWhatsAppLink,
  logOrderToWebhook,
  type CustomerOrderDetails,
} from '@/lib/whatsapp';

export function OrderDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearBag,
    isDrawerOpen,
    closeDrawer,
    totalCount,
    totalAmount,
  } = useOrder();

  const [customer, setCustomer] = useState<CustomerOrderDetails>({
    name: '',
    phone: '',
    deliveryDate: '',
    deliveryType: 'pickup',
    address: '',
    messageOnCake: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOrderSent(false);
      setErrorMessage('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Handle ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMessage('Please provide your name and WhatsApp phone number.');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your bag is currently empty. Please select an item to order.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Tier 2: Automated lead/order logging to webhook and localStorage audit backup
    try {
      await logOrderToWebhook({
        customer,
        items,
        timestamp: new Date().toISOString(),
        sourceUrl: window.location.href,
      });
    } catch (err) {
      console.warn('Logging error:', err);
    }

    // Tier 1: Generate structured WhatsApp ticket message & open WhatsApp
    const message = formatWhatsAppOrderMessage(items, customer);
    const waLink = createWhatsAppLink(message);

    // Open WhatsApp in new tab/window
    window.open(waLink, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setOrderSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end bg-[#3d2339]/50 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Your Order Bag"
      onClick={(e) => e.target === e.currentTarget && closeDrawer()}
    >
      <div className="relative flex h-full w-full max-w-[560px] flex-col bg-[#fffaf3] shadow-2xl transition-transform duration-300 sm:rounded-l-[2.5rem]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#cfbea8]/40 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d86343] text-[#fff8ee]">
              <ShoppingBag size={18} />
            </span>
            <div>
              <h2 className="display text-2xl font-semibold text-[#3d2339]">Your Order Bag</h2>
              <p className="text-xs text-[#6e5763]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} · Direct WhatsApp fulfillment
              </p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#cfbea8] bg-[#fff9f0] text-[#3d2339] transition-colors hover:bg-[#3d2339] hover:text-[#fff8ee]"
            aria-label="Close Bag"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {orderSent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                <CheckCircle size={36} />
              </span>
              <h3 className="display mt-6 text-3xl font-semibold text-[#3d2339]">
                Ticket Sent to WhatsApp!
              </h3>
              <p className="mt-3 max-w-[380px] text-sm leading-relaxed text-[#6e5763]">
                We have generated your order ticket and redirected you to chat directly with Chef Sushmita at{' '}
                <strong className="text-[#3d2339]">{BONHEUR_DISPLAY_PHONE}</strong>.
              </p>
              <div className="mt-6 w-full rounded-2xl bg-[#f6d68f]/30 p-4 text-left text-xs leading-6 text-[#4d4d3e]">
                <p className="font-bold text-[#3d2339]">Next Steps:</p>
                <p>1. Send the pre-filled message on WhatsApp to confirm your slot.</p>
                <p>2. Chef Sushmita will confirm availability and share UPI details.</p>
                <p>3. Your bake will be prepared fresh for your requested date.</p>
              </div>
              <div className="mt-8 flex flex-col w-full gap-3">
                <button
                  onClick={() => {
                    clearBag();
                    closeDrawer();
                  }}
                  className="solid-button rounded-full bg-[#3d2339] py-3.5 text-xs font-bold text-[#fff8ee]"
                >
                  Start New Order
                </button>
                <button
                  onClick={closeDrawer}
                  className="outline-button rounded-full border border-[#cfbea8] py-3 text-xs font-bold text-[#6e5763]"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f8f2e8] text-[#cfbea8]">
                <ShoppingBag size={24} />
              </span>
              <p className="display mt-4 text-2xl font-semibold text-[#3d2339]">Your bag is empty</p>
              <p className="mt-2 text-xs leading-5 text-[#6e5763]">
                Browse our fresh cakes and daily patisserie to add treats to your order.
              </p>
              <button
                onClick={closeDrawer}
                className="solid-button mt-6 rounded-full bg-[#d86343] px-6 py-3 text-xs font-bold text-[#fff8ee]"
              >
                Explore Bakes & Cakes
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
              {/* Selected Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#d86343]">Selected Bakes</span>
                  <button
                    type="button"
                    onClick={clearBag}
                    className="text-[11px] font-semibold text-[#6e5763] hover:text-[#d86343]"
                  >
                    Clear all
                  </button>
                </div>

                <div className="divide-y divide-[#cfbea8]/30 rounded-2xl border border-[#cfbea8]/50 bg-[#fff9f0] p-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-[#3d2339] truncate">{item.name}</p>
                          {item.isEggless && (
                            <span className="rounded bg-[#b9c6a1]/40 px-1.5 py-0.5 text-[10px] font-bold text-[#3d2339]">
                              Eggless
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6e5763]">
                          {item.weightOrSize ? `${item.weightOrSize} · ` : ''}
                          {item.priceDisplay} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-[#cfbea8] bg-[#fffaf3]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="grid h-7 w-7 place-items-center text-[#3d2339] hover:bg-[#cfbea8]/30 rounded-l-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#3d2339]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="grid h-7 w-7 place-items-center text-[#3d2339] hover:bg-[#cfbea8]/30 rounded-r-full"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#6e5763] hover:text-[#d86343] p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between rounded-xl bg-[#d8dfc8]/40 px-4 py-3 text-xs">
                  <span className="font-medium text-[#3d2339]">Estimated Subtotal</span>
                  <span className="display text-lg font-bold text-[#3d2339]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-4 pt-2">
                <span className="eyebrow text-[#d86343]">Your Details</span>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                      Your Name <span className="text-[#d86343]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] placeholder-[#a89a8c] focus:border-[#d86343] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                      WhatsApp Phone <span className="text-[#d86343]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] placeholder-[#a89a8c] focus:border-[#d86343] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                      Date Required
                    </label>
                    <input
                      type="date"
                      value={customer.deliveryDate}
                      onChange={(e) => setCustomer({ ...customer, deliveryDate: e.target.value })}
                      className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] focus:border-[#d86343] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                      Fulfillment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, deliveryType: 'pickup' })}
                        className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                          customer.deliveryType === 'pickup'
                            ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]'
                            : 'border-[#cfbea8] bg-[#fffaf3] text-[#6e5763]'
                        }`}
                      >
                        Pickup (HSR)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, deliveryType: 'delivery' })}
                        className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                          customer.deliveryType === 'delivery'
                            ? 'border-[#3d2339] bg-[#3d2339] text-[#fff8ee]'
                            : 'border-[#cfbea8] bg-[#fffaf3] text-[#6e5763]'
                        }`}
                      >
                        Bangalore Delivery
                      </button>
                    </div>
                  </div>
                </div>

                {customer.deliveryType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                      Delivery Address / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sector 2, HSR Layout / Koramangala / Indiranagar"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] placeholder-[#a89a8c] focus:border-[#d86343] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                    Message / Name on Cake (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 30th Birthday Anya! 🌟"
                    value={customer.messageOnCake}
                    onChange={(e) => setCustomer({ ...customer, messageOnCake: e.target.value })}
                    className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] placeholder-[#a89a8c] focus:border-[#d86343] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3d2339] uppercase tracking-wider mb-1">
                    Special Dietary / Flavour Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Less sweet, extra chocolate ganache, specific time slot..."
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full rounded-xl border border-[#cfbea8] bg-[#fffaf3] px-3.5 py-2.5 text-xs text-[#3d2339] placeholder-[#a89a8c] focus:border-[#d86343] focus:outline-none"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-[#d86343]/10 p-3 text-xs font-semibold text-[#d86343]">
                  {errorMessage}
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="solid-button flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] py-4 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.01] hover:bg-[#20bd5a] disabled:opacity-50"
                >
                  <MessageSquare size={16} />
                  <span>Send Order to WhatsApp ({BONHEUR_DISPLAY_PHONE})</span>
                  <ArrowRight size={14} />
                </button>
                <p className="mt-2.5 text-center text-[10px] text-[#6e5763]">
                  ⚡ Automated lead capture + direct chat confirmation with Chef Sushmita
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
