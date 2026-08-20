import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, Image as ImageIcon, Sparkles, TrendingUp } from 'lucide-react';

export function ProductFormModal({ isOpen, onClose, productToEdit, onSaved }) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Heavyweight Tees',
    wholesalePrice: '',
    suggestedMsrp: '',
    batchNumber: `BATCH-${new Date().toISOString().slice(0, 7)}-01`,
    stockQuantity: 500,
    minOrderQuantity: 30,
    quantityStep: 5,
    isTrending: false,
    isNewArrival: true,
    images: ['', '', '', ''],
    colours: 'Midnight Black, Ivory White, Slate Grey',
    sizes: 'S, M, L, XL, XXL',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        category: productToEdit.category || 'Heavyweight Tees',
        wholesalePrice: productToEdit.wholesalePrice || '',
        suggestedMsrp: productToEdit.suggestedMsrp || '',
        batchNumber: productToEdit.batchNumber || '',
        stockQuantity: productToEdit.stockQuantity || 0,
        minOrderQuantity: productToEdit.minOrderQuantity || 30,
        quantityStep: productToEdit.quantityStep || 5,
        isTrending: Boolean(productToEdit.isTrending),
        isNewArrival: Boolean(productToEdit.isNewArrival),
        images: [
          productToEdit.images?.[0] || '',
          productToEdit.images?.[1] || '',
          productToEdit.images?.[2] || '',
          productToEdit.images?.[3] || '',
        ],
        colours: productToEdit.colours ? productToEdit.colours.join(', ') : '',
        sizes: productToEdit.sizes ? productToEdit.sizes.join(', ') : '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Heavyweight Tees',
        wholesalePrice: '',
        suggestedMsrp: '',
        batchNumber: `BATCH-${new Date().toISOString().slice(0, 7)}-01`,
        stockQuantity: 500,
        minOrderQuantity: 30,
        quantityStep: 5,
        isTrending: false,
        isNewArrival: true,
        images: ['', '', '', ''],
        colours: 'Midnight Black, Ivory White, Slate Grey',
        sizes: 'S, M, L, XL, XXL',
      });
    }
  }, [productToEdit, isOpen]);

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast('Product name is required', 'error');
      return;
    }

    if (parseInt(formData.stockQuantity) < 0) {
      addToast('Stock quantity cannot be negative', 'error');
      return;
    }

    if (parseInt(formData.minOrderQuantity) <= 0) {
      addToast('Minimum order quantity must be greater than 0', 'error');
      return;
    }

    if (parseInt(formData.quantityStep) <= 0) {
      addToast('Quantity step must be greater than 0', 'error');
      return;
    }

    const filteredImages = formData.images.filter((img) => img && img.trim() !== '');
    if (filteredImages.length > 4) {
      addToast('Maximum 4 images allowed per product', 'error');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      wholesalePrice: parseFloat(formData.wholesalePrice) || 0,
      suggestedMsrp: parseFloat(formData.suggestedMsrp) || 0,
      batchNumber: formData.batchNumber.trim(),
      stockQuantity: parseInt(formData.stockQuantity) || 0,
      minOrderQuantity: parseInt(formData.minOrderQuantity) || 30,
      quantityStep: parseInt(formData.quantityStep) || 5,
      isTrending: formData.isTrending,
      isNewArrival: formData.isNewArrival,
      images: filteredImages,
      colours: formData.colours.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    };

    setLoading(true);
    try {
      if (productToEdit) {
        await api.updateProduct(productToEdit.id, payload);
        addToast('Product updated successfully', 'success');
      } else {
        await api.createProduct(payload);
        addToast('Product created successfully', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Failed to save product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? 'Edit Wholesale Product' : 'Create New Wholesale Product'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Product Title / Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Monolith Oversized Heavyweight Tee"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs"
            >
              <option value="Heavyweight Tees">Heavyweight Tees</option>
              <option value="Outerwear & Hoodies">Outerwear & Hoodies</option>
              <option value="Resort Shirts">Resort Shirts</option>
              <option value="Formal Shirts">Formal Shirts</option>
              <option value="Jackets & Denim">Jackets & Denim</option>
              <option value="Polos & Knits">Polos & Knits</option>
              <option value="Trousers & Bottoms">Trousers & Bottoms</option>
              <option value="Activewear & Loungewear">Activewear & Loungewear</option>
              <option value="Accessories & Headwear">Accessories & Headwear</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Batch Number Code *</label>
            <input
              type="text"
              required
              value={formData.batchNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, batchNumber: e.target.value }))}
              placeholder="BATCH-2026-08-TEE1"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Garment Description & Specs</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Fabric GSM, weave structure, yarn origin..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Wholesale Rate (₹ / PC) *</label>
            <input
              type="number"
              required
              step="any"
              value={formData.wholesalePrice}
              onChange={(e) => setFormData((prev) => ({ ...prev, wholesalePrice: e.target.value }))}
              placeholder="450"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Suggested Retail MSRP (₹)</label>
            <input
              type="number"
              step="any"
              value={formData.suggestedMsrp}
              onChange={(e) => setFormData((prev) => ({ ...prev, suggestedMsrp: e.target.value }))}
              placeholder="1499"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950 text-xs font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Stock (PCS)</label>
            <input
              type="number"
              required
              value={formData.stockQuantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, stockQuantity: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Min Order Quantity (MOQ)</label>
            <input
              type="number"
              required
              value={formData.minOrderQuantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, minOrderQuantity: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Quantity Step (+PCS)</label>
            <input
              type="number"
              required
              value={formData.quantityStep}
              onChange={(e) => setFormData((prev) => ({ ...prev, quantityStep: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Available Colours (comma separated)</label>
            <input
              type="text"
              value={formData.colours}
              onChange={(e) => setFormData((prev) => ({ ...prev, colours: e.target.value }))}
              placeholder="Black, White, Navy"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Available Sizes (comma separated)</label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData((prev) => ({ ...prev, sizes: e.target.value }))}
              placeholder="S, M, L, XL, XXL"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            />
          </div>
        </div>

        {/* 4 Image URLs Maximum */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="block font-bold text-slate-700">
            Product Images (Strict Maximum 4 Image URLs)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx}>
                <span className="text-[10px] text-slate-400 font-mono block mb-0.5">Image {idx + 1} URL</span>
                <input
                  type="url"
                  value={formData.images[idx]}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  placeholder={`https://images.unsplash.com/...`}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-[11px] font-mono"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Merchandising Toggles */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-slate-200">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData((prev) => ({ ...prev, isTrending: e.target.checked }))}
              className="w-4 h-4 rounded text-brand-900"
            />
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Mark as Trending
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={formData.isNewArrival}
              onChange={(e) => setFormData((prev) => ({ ...prev, isNewArrival: e.target.checked }))}
              className="w-4 h-4 rounded text-brand-900"
            />
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Mark as New Arrival
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <Button type="button" onClick={onClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button type="submit" loading={loading} variant="primary" size="sm">
            {productToEdit ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
