export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num) {
  if (!num && num !== 0) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function calculateAllowedQuantities(moq = 30, step = 5, maxStock = 2000, limit = 20) {
  const list = [];
  let current = Math.max(1, moq);
  while (current <= maxStock && list.length < limit) {
    list.push(current);
    current += Math.max(1, step);
  }
  return list;
}

export function validateOrderQuantity(quantity, moq = 30, step = 5, stock = 1000) {
  if (quantity < moq) {
    return { valid: false, message: `Minimum order quantity is ${moq} PCS` };
  }
  if ((quantity - moq) % step !== 0) {
    return { valid: false, message: `Quantity must increase in steps of ${step} PCS from MOQ ${moq}` };
  }
  if (quantity > stock) {
    return { valid: false, message: `Quantity exceeds available stock (${stock} PCS)` };
  }
  return { valid: true };
}

export function getStockBadge(stock, moq = 30) {
  if (stock <= 0) {
    return { label: 'Out of Stock', color: 'bg-red-100 text-red-800 border-red-200' };
  }
  if (stock <= moq * 2) {
    return { label: `Limited Stock (${stock} PCS)`, color: 'bg-amber-100 text-amber-800 border-amber-200' };
  }
  return { label: 'In Stock', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
}
