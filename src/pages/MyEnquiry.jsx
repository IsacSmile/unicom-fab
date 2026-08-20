import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../lib/utils';
import { Send, ShoppingBag, Clock, CheckCircle2, Truck, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export function MyEnquiry() {
  const { user, isAuthenticated, promptGoogleAuth } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserEnquiries() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.getMyOrders();
        setEnquiries(res.orders || []);
      } catch (err) {
        console.error('Failed to load user enquiries:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserEnquiries();
  }, [isAuthenticated]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Stock Allocated
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Dispatched
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
            ✓ Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center font-neue">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-5">
          <div className="w-16 h-16 bg-amber-50 text-[#B97832] rounded-2xl border border-amber-200 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
              Sign In to View Your Enquiries
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto">
              Authenticate with Google to track your submitted B2B wholesale enquiries, tax invoices, and stock allocation status.
            </p>
          </div>
          <Button
            onClick={() => promptGoogleAuth('/my-enquiry')}
            variant="gold"
            size="lg"
            className="w-full font-bold py-3 rounded-xl shadow-md"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-neue space-y-8">
      {/* Header Banner */}
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
            WHOLESALE TRACKING
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
            My Submitted Enquiries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track enquiry statuses, batch line items, commercial quotes and shipping dispatches.
          </p>
        </div>
        <Link to="/cart">
          <Button variant="outline" size="sm" icon={ShoppingBag} className="rounded-xl border-slate-300">
            Go to Cart
          </Button>
        </Link>
      </div>

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-6 w-1/3 bg-slate-100 rounded" />
              <div className="h-20 w-full bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <EmptyState
          title="No Submitted Wholesale Enquiries"
          description="You haven't placed any wholesale enquiries or orders yet. Explore our catalogue to add items to your cart."
          actionText="Browse Catalogue"
          onAction={() => navigate('/catalogue')}
          icon={Send}
        />
      ) : (
        /* List of Submitted Enquiries */
        <div className="space-y-6">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-slate-300"
            >
              {/* Enquiry Card Header */}
              <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[#B97832] font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-950">{enquiry.id}</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        ({new Date(enquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Company: <strong className="text-slate-800">{enquiry.companyName}</strong> • Phone: <span className="font-mono text-slate-700">{enquiry.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(enquiry.status)}
                </div>
              </div>

              {/* Enquiry Items Table */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-neue">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-mono text-slate-400 uppercase">
                        <th className="pb-2 font-bold">Product Line</th>
                        <th className="pb-2 font-bold">Variant</th>
                        <th className="pb-2 font-bold text-right">Wholesale Rate</th>
                        <th className="pb-2 font-bold text-center">Quantity</th>
                        <th className="pb-2 font-bold text-right">Est. Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiry.items && enquiry.items.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-900">
                            <div>
                              <p className="font-serif font-bold text-sm text-slate-950">{item.productName}</p>
                              <span className="text-[10px] font-mono text-[#B97832] font-bold">BATCH: {item.batchNumber}</span>
                            </div>
                          </td>
                          <td className="py-3 text-slate-600">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium mr-1.5">
                              {item.colour}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono font-medium">
                              {item.size}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(item.pricePerUnit)} / PC
                          </td>
                          <td className="py-3 text-center font-mono font-bold text-slate-900">
                            {item.quantity} PCS
                          </td>
                          <td className="py-3 text-right font-mono font-bold text-slate-950">
                            {formatCurrency(item.pricePerUnit * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Shipping & Commercial Total Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 p-3.5 rounded-xl border">
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p className="font-bold text-slate-900">Shipping Address:</p>
                    <p className="text-slate-500">
                      {enquiry.deliveryAddress}, {enquiry.city}, {enquiry.state} - {enquiry.pincode}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Total Quantity</span>
                      <span className="font-mono font-bold text-sm text-slate-900">{enquiry.totalQuantity} PCS</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Estimated Total</span>
                      <span className="font-mono font-bold text-lg text-[#B97832]">
                        {formatCurrency(enquiry.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
