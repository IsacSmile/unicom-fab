import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../lib/utils';
import { Trash2, ShoppingBag, ShieldCheck, Building2, MapPin, Phone, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

export function MyOrder() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalWholesaleAmount, totalQuantityCount } = useCart();
  const { user, isAuthenticated, promptGoogleAuth } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Form details
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      promptGoogleAuth('/my-order');
      return;
    }

    if (!companyName || !phone || !deliveryAddress || !city || !state || !pincode) {
      addToast('Please fill in all company and shipping address details', 'error');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          colour: item.colour,
          size: item.size,
          quantity: item.quantity,
        })),
        companyName,
        phone,
        deliveryAddress,
        city,
        state,
        pincode,
        notes,
      };

      const res = await api.submitOrder(orderPayload);
      setSubmittedOrder(res.order);
      clearCart();
      addToast('Wholesale purchase order submitted successfully!', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to submit order', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Order Submitted Confirmation View
  if (submittedOrder) {
    return (
      <div className="py-16 max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-2xl space-y-6 animate-slide-up">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase">
              WHOLESALE ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 mt-1">
              ORDER REQUEST RECEIVED
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Thank you for ordering with UNICOM FAB. Order Reference ID:{' '}
              <strong className="font-mono text-brand-950 font-bold">{submittedOrder.id}</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 text-sm">
            <div className="flex justify-between pb-2 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-400">CUSTOMER / COMPANY</span>
              <span className="font-bold text-brand-950">{submittedOrder.companyName} ({submittedOrder.userName})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-400">TOTAL QUANTITY</span>
              <span className="font-bold text-brand-950">{submittedOrder.totalQuantity} PCS</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-400">ESTIMATED AMOUNT</span>
              <span className="font-bold text-brand-950 text-base">{formatCurrency(submittedOrder.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">STATUS</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold uppercase">
                {submittedOrder.status}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our logistics team will verify stock allocation and send commercial tax invoices & freight dispatch schedules directly to <strong className="text-slate-800">{submittedOrder.userEmail}</strong>.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/catalogue">
              <Button variant="primary" icon={ArrowRight}>
                Continue Browsing Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-4">
        <EmptyState
          title="Your Wholesale Order is Empty"
          description="Browse our B2B catalogue to select items, colours, sizes and minimum order quantities."
          actionText="Explore Wholesale Catalogue"
          onAction={() => (window.location.href = '/catalogue')}
          icon={ShoppingBag}
        />
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
          B2B PURCHASING CART
        </span>
        <h1 className="font-serif text-3xl font-bold text-brand-950 mt-1">
          Review Wholesale Order ({totalQuantityCount} PCS)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Order Items Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold font-mono text-slate-500 uppercase">
              <span>Product & Batch</span>
              <span>Quantity Controls</span>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Product Metadata */}
                  <div className="flex items-start gap-4">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl border shrink-0" />
                    ) : (
                      <div className="w-16 h-20 bg-slate-100 rounded-xl border flex items-center justify-center text-slate-400">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-amber-700 font-bold uppercase block">
                        BATCH: {item.batchNumber}
                      </span>
                      <h4 className="font-serif font-bold text-base text-brand-950">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700">
                          Colour: {item.colour}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700 font-mono">
                          Size: {item.size}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 mt-2 block">
                        {formatCurrency(item.wholesalePrice)} / PC
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls & Delete */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))}
                        className="py-1.5 px-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 bg-white"
                      >
                        {Array.from({ length: 25 }).map((_, idx) => {
                          const val = item.minOrderQuantity + idx * item.quantityStep;
                          if (val > item.stockQuantity) return null;
                          return (
                            <option key={val} value={val}>
                              {val} PCS
                            </option>
                          );
                        })}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Line Subtotal</span>
                      <span className="font-display font-bold text-base text-brand-950">
                        {formatCurrency(item.wholesalePrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Clear Entire Cart
            </button>
            <span className="text-xs text-slate-400 font-mono">
              MOQ and Step Increments Server Verified
            </span>
          </div>
        </div>

        {/* Right Column: Auth Gate & Order Checkout Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-xl text-brand-950 pb-3 border-b border-slate-100">
              Wholesale Order Summary
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Unique Variants:</span>
                <span className="font-bold text-slate-900">{cartItems.length} Lines</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Units:</span>
                <span className="font-bold text-slate-900">{totalQuantityCount} PCS</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t border-slate-200 text-brand-950">
                <span>Est. Wholesale Total:</span>
                <span className="font-display text-2xl text-amber-700">
                  {formatCurrency(totalWholesaleAmount)}
                </span>
              </div>
            </div>

            {/* Order Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
              {isAuthenticated ? (
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authenticated: {user.name} ({user.email})</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center gap-2 text-xs text-amber-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Google Sign-In will be prompted at checkout</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Company / Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Apparel Pvt Ltd"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Phone / Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Commercial Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Warehouse / Store Delivery Address..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="MH"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400001"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Special Shipping Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pallet packing required, call prior to delivery"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                variant={isAuthenticated ? "primary" : "gold"}
                size="lg"
                className="w-full font-bold shadow-xl"
              >
                {isAuthenticated ? "Submit Wholesale Order Request" : "Sign in with Google to Place Order"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
