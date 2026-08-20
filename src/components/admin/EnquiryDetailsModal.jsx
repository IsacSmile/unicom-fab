import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, Building2, MapPin, MessageSquare } from 'lucide-react';

export function EnquiryDetailsModal({ isOpen, onClose, enquiry, onStatusUpdated }) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!enquiry) return null;

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await api.updateEnquiryStatus(enquiry.id, newStatus);
      addToast(`Enquiry status updated to ${newStatus}`, 'success');
      onStatusUpdated();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    } finally {
      setLoading(false);
    }
  };

  const statusVariants = {
    New: 'statusPending',
    Contacted: 'statusProcessing',
    'In Progress': 'statusConfirmed',
    Resolved: 'statusCompleted',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Enquiry Reference: ${enquiry.id}`} maxWidth="max-w-xl">
      <div className="space-y-5 text-xs text-slate-800">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">ENQUIRY STATUS</span>
            <Badge variant={statusVariants[enquiry.status] || 'default'}>{enquiry.status}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">Update Status:</span>
            <select
              value={enquiry.status}
              disabled={loading}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="py-1 px-3 border border-slate-300 rounded-lg bg-white font-semibold text-slate-800"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
          <p className="font-bold text-sm text-brand-950">{enquiry.name} ({enquiry.companyName})</p>
          <div className="flex flex-wrap gap-4 text-slate-600">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {enquiry.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {enquiry.phone}</span>
          </div>
          <p className="text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location: {enquiry.city || 'N/A'}, {enquiry.country || 'India'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">TARGET PRODUCT</span>
            <span className="font-bold text-slate-900">{enquiry.productName || 'General Wholesale Enquiry'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">TARGET QUANTITY</span>
            <span className="font-bold text-slate-900 font-mono">{enquiry.requiredQuantity ? `${enquiry.requiredQuantity} PCS` : 'Flexible'}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
          <span className="text-[10px] font-mono text-amber-800 uppercase font-bold flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> BUYER MESSAGE
          </span>
          <p className="text-slate-800 leading-relaxed italic">{enquiry.message}</p>
        </div>
      </div>
    </Modal>
  );
}
