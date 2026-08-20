import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { TableSkeleton } from '../../components/common/SkeletonLoaders';
import { formatCurrency } from '../../lib/utils';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Plus, Search, Edit2, Trash2, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export function AdminProducts() {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({ limit: 100, search: searchQuery });
      setProducts(res.products || []);
    } catch (err) {
      addToast(err.message || 'Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const handleToggleFlag = async (id, field) => {
    try {
      const res = await api.toggleProductFlag(id, field);
      addToast(res.message, 'success');
      fetchProducts();
    } catch (err) {
      addToast(err.message || 'Failed to toggle flag', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from wholesale catalogue?`)) return;

    try {
      await api.deleteProduct(id);
      addToast(`Deleted "${name}"`, 'info');
      fetchProducts();
    } catch (err) {
      addToast(err.message || 'Failed to delete product', 'error');
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto w-full max-w-full h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
              WHOLESALE CATALOGUE MANAGMENT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mt-1">
              Product Catalogue & Merchandising
            </h1>
          </div>

          <Button onClick={handleOpenCreate} variant="primary" icon={Plus} size="md" className="w-full sm:w-auto">
            Create Wholesale Product
          </Button>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Filter inventory by title or batch code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-950"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <span className="text-xs font-mono text-slate-500 font-semibold text-right">
            {products.length} Products Registered
          </span>
        </div>

        {/* Products Table & Mobile Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-6">
              <TableSkeleton rows={8} />
            </div>
          ) : (
            <>
              {/* Mobile Responsive Card List (md:hidden) */}
              <div className="md:hidden divide-y divide-slate-200">
                {products.map((p) => (
                  <div key={p.id} className="p-4 space-y-3 bg-white">
                    <div className="flex items-start gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200'}
                        alt={p.name}
                        className="w-14 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            {p.batchNumber}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-serif font-bold text-sm text-slate-900 leading-tight mt-1 truncate">
                          {p.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{p.category}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Wholesale</span>
                        <span className="font-bold text-slate-900">{formatCurrency(p.wholesalePrice)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Stock / MOQ</span>
                        <span className={p.stockQuantity <= p.minOrderQuantity ? 'text-red-600 font-bold' : 'text-slate-700'}>
                          {p.stockQuantity} PCS <span className="text-slate-400 font-normal">({p.minOrderQuantity} MOQ)</span>
                        </span>
                      </div>
                    </div>

                    {/* Merchandising Toggles */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-slate-400">Merchandising:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFlag(p.id, 'isTrending')}
                          className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                            p.isTrending
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          <TrendingUp className="w-3 h-3" /> Trending
                        </button>
                        <button
                          onClick={() => handleToggleFlag(p.id, 'isNewArrival')}
                          className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                            p.isNewArrival
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" /> New
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-mono font-bold text-slate-500 uppercase">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Batch Code</th>
                      <th className="p-3 text-right">Wholesale Rate</th>
                      <th className="p-3 text-right">Stock (PCS)</th>
                      <th className="p-3 text-right">MOQ</th>
                      <th className="p-3 text-center">Merchandising Flags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200'}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-serif font-bold text-sm text-brand-950">{p.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {p.colours?.slice(0, 2).join(', ')} • {p.sizes?.slice(0, 3).join(', ')}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-slate-600">{p.category}</td>
                        <td className="p-3 font-mono text-amber-700 font-bold">{p.batchNumber}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          {formatCurrency(p.wholesalePrice)}
                        </td>
                        <td className="p-3 text-right font-mono">
                          <span className={p.stockQuantity <= p.minOrderQuantity ? 'text-red-600 font-bold' : 'text-slate-700'}>
                            {p.stockQuantity} PCS
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-semibold">{p.minOrderQuantity} PCS</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleFlag(p.id, 'isTrending')}
                              className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                                p.isTrending
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                              }`}
                              title="Toggle Trending Flag"
                            >
                              <TrendingUp className="w-3 h-3" /> Trending
                            </button>

                            <button
                              onClick={() => handleToggleFlag(p.id, 'isNewArrival')}
                              className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                                p.isNewArrival
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                              }`}
                              title="Toggle New Arrival Flag"
                            >
                              <Sparkles className="w-3 h-3" /> New
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-slate-600 hover:text-brand-950 hover:bg-slate-200 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Product Create / Edit Modal */}
        <ProductFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productToEdit={editingProduct}
          onSaved={fetchProducts}
        />
      </main>
    </div>
  );
}
