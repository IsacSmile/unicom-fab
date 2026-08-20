import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductGallery } from '../components/products/ProductGallery';
import { QuantitySelector } from '../components/products/QuantitySelector';
import { ColourSelector } from '../components/products/ColourSelector';
import { SizeSelector } from '../components/products/SizeSelector';
import { GuestEnquiryModal } from '../components/enquiry/GuestEnquiryModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, getStockBadge } from '../lib/utils';
import { ShoppingBag, Send, ShieldCheck, Truck, Layers, ArrowLeft } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColour, setSelectedColour] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(30);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await api.getProduct(id);
        setProduct(res.product);
        if (res.product.colours && res.product.colours.length > 0) {
          setSelectedColour(res.product.colours[0]);
        }
        if (res.product.sizes && res.product.sizes.length > 0) {
          setSelectedSize(res.product.sizes[0]);
        }
        setQuantity(res.product.minOrderQuantity || 30);
      } catch (err) {
        addToast('Product not found or unavailable', 'error');
        navigate('/catalogue');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full aspect-[4/5] bg-slate-200 rounded-2xl" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-slate-200 rounded" />
            <div className="h-6 w-1/4 bg-slate-200 rounded" />
            <div className="h-24 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const stockBadge = getStockBadge(product.stockQuantity, product.minOrderQuantity);

  const handleAddToCart = () => {
    if (!selectedColour) {
      addToast('Please select a colour variant before adding to order', 'error');
      return;
    }
    if (!selectedSize) {
      addToast('Please select a size batch before adding to order', 'error');
      return;
    }

    const success = addToCart(product, selectedColour, selectedSize, quantity);
    if (success) {
      navigate('/my-order');
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Back Link */}
      <div className="mb-6">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalogue
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 Image Gallery (Size reduced by 20% on mobile) */}
        <div className="lg:col-span-5 max-w-[80%] sm:max-w-md mx-auto w-full">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right Column: Wholesale Specifications & Order Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#B97832] uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                {product.category}
              </span>
              <span className="text-slate-300 font-mono">•</span>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                BATCH: {product.batchNumber}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${stockBadge.color}`}>
                {stockBadge.label}
              </span>
            </div>

            <h1 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-950 leading-snug">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-2.5 pb-3 border-b border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase font-mono tracking-wider">Wholesale Price:</span>
              <span className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
                {formatCurrency(product.wholesalePrice)}
                <span className="text-xs font-normal text-slate-500"> / PC</span>
              </span>
              {product.suggestedMsrp && (
                <span className="text-[11px] text-slate-400 line-through font-mono">
                  MSRP: {formatCurrency(product.suggestedMsrp)}
                </span>
              )}
            </div>
          </div>

          {/* Garment & Batch Specs */}
          <div className="bg-slate-50/80 p-3 sm:p-3.5 rounded-xl border-l-2 border-[#B97832] border-y border-r border-slate-200/80 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-1">
            <h4 className="text-[10px] font-bold uppercase text-amber-800 font-mono tracking-wider">Garment & Batch Specs</h4>
            <p className="text-slate-700 font-sans">{product.description}</p>
          </div>

          {/* Variants Selectors */}
          <div className="space-y-4 p-4 sm:p-5 bg-white sm:bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-xs sm:shadow-none">
            {/* Colour Selector */}
            <ColourSelector
              colours={product.colours}
              selectedColour={selectedColour}
              onSelect={setSelectedColour}
            />

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Step Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              minOrderQuantity={product.minOrderQuantity}
              quantityStep={product.quantityStep}
              stockQuantity={product.stockQuantity}
            />
          </div>

          {/* Total Line Pricing Summary */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-xl flex items-center justify-between shadow-md border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Line Estimated Total ({quantity} PCS)</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-amber-400">
                {formatCurrency(product.wholesalePrice * quantity)}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
              Excl. Freight Tax
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              icon={ShoppingBag}
              disabled={product.stockQuantity <= 0}
              className="w-full sm:flex-1 font-bold text-xs sm:text-sm py-3 bg-[#B97832] hover:bg-amber-800 active:scale-[0.99] text-white shadow-md rounded-xl"
            >
              Add to Wholesale Order
            </Button>
            <Button
              onClick={() => setEnquiryOpen(true)}
              variant="outline"
              icon={Send}
              className="w-full sm:w-auto text-xs py-3 rounded-xl hover:bg-slate-50"
            >
              Send Enquiry
            </Button>
          </div>

          {/* B2B Assurance Footer Badges */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-slate-600 text-xs font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Lab Inspected Tensile Fabric</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Pallet Freight Shipping Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Enquiry Modal */}
      <GuestEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialProduct={`${product.name} (Batch: ${product.batchNumber})`}
      />
    </div>
  );
}
