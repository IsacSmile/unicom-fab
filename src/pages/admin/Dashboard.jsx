import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { api } from '../../lib/api';
import { formatCurrency } from '../../lib/utils';
import { TableSkeleton } from '../../components/common/SkeletonLoaders';
import { Package, ShoppingCart, MessageSquare, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const res = await api.getAdminStats();
        if (isMounted) {
          setStats(res);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
        if (isMounted) {
          setError(err.message || 'Unable to load admin statistics');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
            EXECUTIVE METRICS OVERVIEW
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-950 mt-1">
            System Control & Wholesale Analytics
          </h1>
        </div>

        {loading ? (
          <TableSkeleton rows={6} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-red-700 space-y-2">
            <h3 className="font-bold text-lg">Failed to load admin statistics</h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <>
            {/* Metric KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Total Catalogue Items</span>
                  <div className="font-display font-bold text-3xl text-brand-950 mt-1">{stats?.totalProducts ?? 0}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-950 text-luxury-gold flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Total Wholesale Orders</span>
                  <div className="font-display font-bold text-3xl text-brand-950 mt-1">{stats?.totalOrders ?? 0}</div>
                  <span className="text-xs text-amber-700 font-bold">{stats?.pendingOrders ?? 0} Pending Action</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">B2B Enquiries</span>
                  <div className="font-display font-bold text-3xl text-brand-950 mt-1">{stats?.totalEnquiries ?? 0}</div>
                  <span className="text-xs text-emerald-700 font-bold">{stats?.newEnquiries ?? 0} New Leads</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Merchandising</span>
                  <div className="text-sm font-bold text-brand-950 mt-2 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800">
                      <TrendingUp className="w-4 h-4" /> {stats?.trendingProducts ?? 0} Trending Lines
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Sparkles className="w-4 h-4" /> {stats?.newArrivalProducts ?? 0} New Arrivals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Low Stock Warning Section */}
            {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
              <div className="bg-amber-50 border border-amber-300 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                  <span>Low Stock Alert ({stats.lowStockProducts.length} Items Below Threshold)</span>
                </div>

                <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-amber-100/60 border-b border-amber-200 font-mono font-bold text-amber-900 uppercase">
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Batch Code</th>
                        <th className="p-3">Stock Available</th>
                        <th className="p-3">MOQ</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {stats.lowStockProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50/50">
                          <td className="p-3 font-serif font-bold text-slate-900">{p.name}</td>
                          <td className="p-3 font-mono text-slate-600">{p.batchNumber}</td>
                          <td className="p-3 font-mono font-bold text-red-600">{p.stockQuantity} PCS</td>
                          <td className="p-3 font-mono text-slate-600">{p.minOrderQuantity} PCS</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
                              RE-STOCK REQUIRED
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recent Orders Overview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-brand-950">Recent Wholesale Orders</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-mono font-bold text-slate-500 uppercase">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Buyer Company</th>
                      <th className="p-3">Email</th>
                      <th className="p-3 text-right">Units</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                      stats.recentOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-brand-950">{o.id}</td>
                          <td className="p-3 font-serif font-bold text-slate-800">{o.companyName}</td>
                          <td className="p-3 text-slate-500">{o.userEmail}</td>
                          <td className="p-3 text-right font-mono font-bold">{o.totalQuantity} PCS</td>
                          <td className="p-3 text-right font-mono font-bold">{formatCurrency(o.totalAmount)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold uppercase text-[10px]">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-slate-400 font-mono">
                          No orders recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
