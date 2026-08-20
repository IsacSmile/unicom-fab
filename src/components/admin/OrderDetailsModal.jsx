import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../lib/utils';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { ShoppingBag, Building2, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export function OrderDetailsModal({ isOpen, onClose, order, onStatusUpdated }) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await api.updateOrderStatus(order.id, newStatus);
      addToast(`Order status updated to ${newStatus}`, 'success');
      onStatusUpdated();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    } finally {
      setLoading(false);
    }
  };

  const statusVariants = {
    Pending: 'statusPending',
    Confirmed: 'statusConfirmed',
    Processing: 'statusProcessing',
    Completed: 'statusCompleted',
    Cancelled: 'statusCancelled',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Specs: ${order.id}`} maxWidth="max-w-3xl">
      <div className="space-y-6 text-xs text-slate-800">
        {/* Status bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">CURRENT STATUS</span>
            <Badge variant={statusVariants[order.status] || 'default'}>{order.status}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">Update Status:</span>
            <select
              value={order.status}
              disabled={loading}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="py-1 px-3 border border-slate-300 rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Customer & Company Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-slate-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">BUYER ACCOUNT</span>
            <p className="font-bold text-sm text-brand-950">{order.companyName}</p>
            <p className="text-slate-600 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {order.userEmail}</p>
            <p className="text-slate-600 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {order.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">SHIPPING WAREHOUSE</span>
            <p className="text-slate-700 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{order.deliveryAddress}, {order.city}, {order.state} - {order.pincode}</span>
            </p>
            {order.notes && <p className="text-amber-800 italic pt-1">Notes: {order.notes}</p>}
          </div>
        </div>

        {/* Variant Items Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-700 uppercase font-mono text-[11px]">
            Ordered Variants ({order.totalQuantity} PCS Total)
          </h4>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-500 uppercase">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Batch Code</th>
                  <th className="py-2.5 px-3">Colour / Size</th>
                  <th className="py-2.5 px-3 text-right">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Rate</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {order.items && order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-serif font-bold text-brand-950 font-sans">{item.product_name}</td>
                    <td className="py-2.5 px-3 text-amber-700 font-bold">{item.batch_number}</td>
                    <td className="py-2.5 px-3">{item.colour} / {item.size}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">{item.quantity} PCS</td>
                    <td className="py-2.5 px-3 text-right">{formatCurrency(item.price_per_unit)}</td>
                    <td className="py-2.5 px-3 text-right font-bold">{formatCurrency(item.price_per_unit * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-brand-950 text-white rounded-xl">
          <span className="font-mono text-xs">ORDER TOTAL</span>
          <span className="font-display font-bold text-xl text-luxury-gold">{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>
    </Modal>
  );
}
