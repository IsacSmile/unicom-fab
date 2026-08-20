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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: 4 Image Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right Column: Wholesale Specifications & Order Options */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
                {product.category}
              </span>
              <span className="text-slate-300 font-mono">•</span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                BATCH: {product.batchNumber}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${stockBadge.color}`}>
                {stockBadge.label}
              </span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-950 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-slate-200">
              <span className="text-xs text-slate-400 font-semibold uppercase">Wholesale Price:</span>
              <span className="font-display font-bold text-3xl text-brand-950">
                {formatCurrency(product.wholesalePrice)}
                <span className="text-sm font-normal text-slate-500"> / PC</span>
              </span>
              {product.suggestedMsrp && (
                <span className="text-xs text-slate-400 line-through">
                  MSRP: {formatCurrency(product.suggestedMsrp)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 font-mono">Garment & Batch Specs</h4>
            <p>{product.description}</p>
          </div>

          {/* Variants Selectors */}
          <div className="space-y-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
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
          <div className="p-4 bg-brand-950 text-white rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-mono">Line Estimated Total ({quantity} PCS)</span>
              <span className="font-display font-bold text-2xl text-luxury-gold">
                {formatCurrency(product.wholesalePrice * quantity)}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">Excl. Freight Tax</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="primary"
              icon={ShoppingBag}
              disabled={product.stockQuantity <= 0}
              className="w-full sm:flex-1 font-bold text-sm"
            >
              Add to Wholesale Order
            </Button>
            <Button
              onClick={() => setEnquiryOpen(true)}
              size="lg"
              variant="outline"
              icon={Send}
              className="w-full sm:w-auto text-xs"
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
