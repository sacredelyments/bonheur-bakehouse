export const BONHEUR_PHONE = '919870449479';
export const BONHEUR_DISPLAY_PHONE = '+91 98704 49479';

export interface OrderItem {
  id: string;
  name: string;
  category?: string;
  weightOrSize?: string;
  priceNumeric: number;
  priceDisplay: string;
  quantity: number;
  isEggless?: boolean;
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  deliveryDate?: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  messageOnCake?: string;
  notes?: string;
}

/**
 * Generate a beautifully formatted WhatsApp ticket for Chef Sushmita / Bonheur Bakehouse
 */
export function formatWhatsAppOrderMessage(
  items: OrderItem[],
  customer: CustomerOrderDetails
): string {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceNumeric * item.quantity,
    0
  );

  let message = `🎂 *BONHEUR BAKEHOUSE — ORDER REQUEST*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• Name: *${customer.name.trim()}*\n`;
  message += `• Phone: *${customer.phone.trim()}*\n`;
  if (customer.deliveryDate) {
    message += `• Date Required: *${customer.deliveryDate}*\n`;
  }
  message += `• Fulfillment: *${customer.deliveryType === 'delivery' ? '🚗 Home Delivery' : '🏪 Counter Pickup (HSR Layout)'}*\n`;
  if (customer.deliveryType === 'delivery' && customer.address) {
    message += `• Delivery Address: ${customer.address.trim()}\n`;
  }
  message += `\n🍰 *SELECTED ITEMS:*\n`;

  items.forEach((item, index) => {
    const sizeStr = item.weightOrSize ? ` (${item.weightOrSize})` : '';
    const egglessStr = item.isEggless ? ` · 🌿 Eggless` : '';
    message += `${index + 1}. *${item.name}*${sizeStr}${egglessStr}\n`;
    message += `   Qty: ${item.quantity} × ${item.priceDisplay} = ₹${item.priceNumeric * item.quantity}\n`;
  });

  message += `\n💰 *ESTIMATED TOTAL:* ₹${totalAmount.toLocaleString('en-IN')}\n`;

  if (customer.messageOnCake && customer.messageOnCake.trim()) {
    message += `\n✍️ *Message / Inscription on Cake:*\n"${customer.messageOnCake.trim()}"\n`;
  }

  if (customer.notes && customer.notes.trim()) {
    message += `\n📝 *Special Instructions:*\n${customer.notes.trim()}\n`;
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Sent via Bonheur Bakehouse Online Atelier_\n`;
  message += `_Chef Sushmita · HSR Layout, Bangalore_`;

  return message;
}

/**
 * Creates the direct wa.me link with URL-encoded text
 */
export function createWhatsAppLink(message: string): string {
  return `https://wa.me/${BONHEUR_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Tier 2: Automated Lead & Order logging to webhook / cloud database with local fallback
 */
export async function logOrderToWebhook(payload: {
  customer: CustomerOrderDetails;
  items: OrderItem[];
  timestamp: string;
  sourceUrl: string;
}): Promise<{ success: boolean; error?: string }> {
  // 1. Always save to LocalStorage audit log (Instant Offline Resilience)
  try {
    const existingLogs = JSON.parse(
      localStorage.getItem('bonheur_orders_backup') || '[]'
    );
    existingLogs.unshift(payload);
    // Keep last 50 orders in local client cache
    localStorage.setItem(
      'bonheur_orders_backup',
      JSON.stringify(existingLogs.slice(0, 50))
    );
  } catch (err) {
    console.warn('LocalStorage backup skipped:', err);
  }

  // 2. Dispatch to remote webhook endpoint if configured (Google Apps Script / Webhook / Make / Zapier)
  const webhookUrl = (import.meta as any).env?.VITE_ORDER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      });
      if (resp.ok) return { success: true };
    } catch (err: any) {
      console.warn('Remote webhook dispatch error:', err);
      return { success: false, error: err?.message };
    }
  }

  return { success: true };
}
