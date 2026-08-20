import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { EnquiryDetailsModal } from '../../components/admin/EnquiryDetailsModal';
import { Badge } from '../../components/common/Badge';
import { TableSkeleton } from '../../components/common/SkeletonLoaders';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Eye, MessageSquare } from 'lucide-react';

export function AdminEnquiries() {
  const { addToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminEnquiries();
      setEnquiries(res.enquiries || []);
    } catch (err) {
      addToast(err.message || 'Failed to fetch enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const statusVariants = {
    New: 'statusPending',
    Contacted: 'statusProcessing',
    'In Progress': 'statusConfirmed',
    Resolved: 'statusCompleted',
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto w-full max-w-full h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
              LEAD GENERATION & SUPPORT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mt-1">
              Guest Wholesale Enquiries
            </h1>
          </div>

          <span className="text-xs font-mono text-slate-500 font-semibold">
            {enquiries.length} Enquiries Logged
          </span>
        </div>

        {/* Enquiries Table */}
        {/* Enquiries Table & Mobile Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-6">
              <TableSkeleton rows={8} />
            </div>
          ) : (
            <>
              {/* Mobile Responsive Enquiry Cards (md:hidden) */}
              <div className="md:hidden divide-y divide-slate-200">
                {enquiries.map((e) => (
                  <div key={e.id} className="p-4 space-y-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-950">{e.id}</span>
                      <Badge variant={statusVariants[e.status] || 'default'}>{e.status}</Badge>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">{e.name} ({e.companyName})</h4>
                      <p className="text-[11px] text-slate-500 font-mono">{e.email} • {e.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Product Spec</span>
                        <span className="font-bold text-slate-900 truncate block">{e.productName || 'General Enquiry'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Target Qty</span>
                        <span className="font-bold text-slate-700">{e.requiredQuantity ? `${e.requiredQuantity} PCS` : 'Flexible'}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => setSelectedEnquiry(e)}
                        className="w-full py-2 px-4 bg-brand-950 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-4 h-4 text-amber-400" /> View Enquiry Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-mono font-bold text-slate-500 uppercase">
                      <th className="p-3">ID</th>
                      <th className="p-3">Contact Name</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Email / Phone</th>
                      <th className="p-3">Product Specs</th>
                      <th className="p-3 text-right">Target Quantity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-brand-950">{e.id}</td>
                        <td className="p-3 font-serif font-bold text-slate-800">{e.name}</td>
                        <td className="p-3 font-semibold text-slate-600">{e.companyName}</td>
                        <td className="p-3 text-slate-500">
                          {e.email} <br /> <span className="font-mono">{e.phone}</span>
                        </td>
                        <td className="p-3 text-slate-700 max-w-xs truncate">
                          {e.productName || 'General Enquiry'}
                        </td>
                        <td className="p-3 text-right font-mono font-bold">
                          {e.requiredQuantity ? `${e.requiredQuantity} PCS` : 'Flex'}
                        </td>
                        <td className="p-3">
                          <Badge variant={statusVariants[e.status] || 'default'}>{e.status}</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedEnquiry(e)}
                            className="p-1.5 text-brand-900 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1 font-bold"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <EnquiryDetailsModal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          enquiry={selectedEnquiry}
          onStatusUpdated={() => {
            fetchEnquiries();
            setSelectedEnquiry(null);
          }}
        />
      </main>
    </div>
  );
}
