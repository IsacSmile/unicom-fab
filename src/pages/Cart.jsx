import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../lib/utils';
import { Trash2, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight, Plus, Minus, ChevronDown, Send } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

function CustomStateSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStates = INDIAN_STATES.filter((st) =>
    st.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900 flex items-center justify-between shadow-2xs hover:border-slate-400 transition-colors"
      >
        <span className="truncate">{value || 'Select State'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-slate-200/90 py-1.5 z-50 animate-fade-in max-h-52 overflow-y-auto">
          <div className="px-2 pb-1.5 mb-1 border-b border-slate-100 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="Search state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 font-medium"
            />
          </div>

          <div className="space-y-0.5 px-1">
            {filteredStates.length > 0 ? (
              filteredStates.map((st) => {
                const isSelected = st === value;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onChange(st);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-950 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <span className="truncate">{st}</span>
                    {isSelected && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />}
                  </button>
                );
              })
            ) : (
              <p className="text-[11px] text-slate-400 px-2 py-1 text-center">No state found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalWholesaleAmount, totalQuantityCount } = useCart();
  const { user, isAuthenticated, promptGoogleAuth } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Form details
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      promptGoogleAuth('/cart');
      return;
    }

    if (!phone || !deliveryAddress || !city || !state || !pincode) {
      addToast('Please fill in all required shipping address & contact details', 'error');
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
        companyName: companyName || user.name || 'Wholesale Buyer',
        phone,
        deliveryAddress,
        city,
        state,
        pincode,
        notes,
      };

      await api.submitOrder(orderPayload);
      clearCart();
      addToast('Wholesale enquiry submitted successfully!', 'success');
      navigate('/my-enquiry');
    } catch (err) {
      addToast(err.message || 'Failed to submit enquiry', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-4 font-neue">
        <EmptyState
          title="Your B2B Cart is Empty"
          description="Browse our wholesale catalogue to select apparel items, colours, sizes and minimum order quantities."
          actionText="Explore Wholesale Catalogue"
          onAction={() => navigate('/catalogue')}
          icon={ShoppingBag}
        />
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-neue">
      <div className="mb-8 pb-4 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
            B2B WHOLESALE PURCHASING
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
            Review Cart Order ({totalQuantityCount} PCS)
          </h1>
        </div>
        <Link
          to="/my-enquiry"
          className="text-xs font-bold text-[#B97832] hover:underline flex items-center gap-1.5 font-mono"
        >
          <Send className="w-3.5 h-3.5" />
          <span>View Submitted Enquiries →</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold font-mono text-slate-500 uppercase">
              <span>Product & Batch</span>
              <span>Quantity Controls</span>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Product Metadata */}
                  <div className="flex items-start gap-3.5">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-16 h-20 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-[#B97832] font-bold uppercase block">
                        BATCH: {item.batchNumber}
                      </span>
                      <h4 className="font-serif font-bold text-base text-slate-950">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700">
                          Colour: {item.colour}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700 font-mono">
                          Size: {item.size}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 mt-1.5 block font-mono">
                        {formatCurrency(item.wholesalePrice)} / PC
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls & Delete */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, Math.max(item.minOrderQuantity, item.quantity - item.quantityStep))}
                        disabled={item.quantity <= item.minOrderQuantity}
                        className="w-7 h-7 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xs transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))}
                        className="py-1 px-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        {Array.from({ length: 12 }).map((_, idx) => {
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
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, Math.min(item.stockQuantity, item.quantity + item.quantityStep))}
                        disabled={item.quantity + item.quantityStep > item.stockQuantity}
                        className="w-7 h-7 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xs transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Subtotal</span>
                      <span className="font-mono font-bold text-base text-slate-950">
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
              MOQ & Step Increments Verified
            </span>
          </div>
        </div>

        {/* Right Column: Checkout / Enquiry Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-xl text-slate-950 pb-3 border-b border-slate-100">
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
              <div className="flex justify-between text-base font-bold pt-3 border-t border-slate-200 text-slate-950">
                <span>Est. Wholesale Total:</span>
                <span className="font-mono text-2xl text-[#B97832]">
                  {formatCurrency(totalWholesaleAmount)}
                </span>
              </div>
            </div>

            {/* Order Checkout Form */}
            <form onSubmit={handleSubmitEnquiry} className="space-y-4 pt-2">
              {isAuthenticated ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authenticated: {user.name} ({user.email})</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#B97832] shrink-0" />
                  <span>Google Sign-In will be prompted to submit enquiry</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Company / Business / Your Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company / Business Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
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
                  placeholder="Your Phone Number"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
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
                  placeholder="Your Shipping Address..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
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
                    placeholder="City"
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">State *</label>
                  <CustomStateSelect value={state} onChange={setState} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pallet packing required, call prior to dispatch"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                variant="gold"
                size="lg"
                className="w-full font-bold shadow-xl py-3 rounded-xl"
              >
                {isAuthenticated ? "Submit Wholesale Enquiry" : "Sign in to Submit Enquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
