import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { OrderDetailsModal } from '../../components/admin/OrderDetailsModal';
import { Badge } from '../../components/common/Badge';
import { TableSkeleton } from '../../components/common/SkeletonLoaders';
import { formatCurrency } from '../../lib/utils';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Eye, ShoppingCart, Search } from 'lucide-react';

export function AdminOrders() {
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminOrders();
      setOrders(res.orders || []);
    } catch (err) {
      addToast(err.message || 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  const statusVariants = {
    Pending: 'statusPending',
    Confirmed: 'statusConfirmed',
    Processing: 'statusProcessing',
    Completed: 'statusCompleted',
    Cancelled: 'statusCancelled',
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto w-full max-w-full h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
              ORDER FULFILMENT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mt-1">
              Wholesale Purchase Orders
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none"
            >
              <option value="">All Statuses ({orders.length})</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6">
              <TableSkeleton rows={8} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-mono font-bold text-slate-500 uppercase">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Buyer Company</th>
                    <th className="p-3">Google Account</th>
                    <th className="p-3 text-right">Total Units</th>
                    <th className="p-3 text-right">Wholesale Amount</th>
                    <th className="p-3">Order Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-brand-950">{o.id}</td>
                      <td className="p-3 font-serif font-bold text-slate-800">{o.companyName}</td>
                      <td className="p-3 text-slate-500">
                        {o.userName} ({o.userEmail})
                      </td>
                      <td className="p-3 text-right font-mono font-bold">{o.totalQuantity} PCS</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(o.totalAmount)}
                      </td>
                      <td className="p-3 font-mono text-slate-400">
                        {new Date(o.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-3">
                        <Badge variant={statusVariants[o.status] || 'default'}>{o.status}</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="p-1.5 text-brand-900 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1 font-bold"
                        >
                          <Eye className="w-4 h-4" /> Specs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onStatusUpdated={() => {
            fetchOrders();
            setSelectedOrder(null);
          }}
        />
      </main>
    </div>
  );
}
