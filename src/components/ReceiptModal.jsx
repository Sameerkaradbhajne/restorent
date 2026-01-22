import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Download, Printer } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, orderData }) {
    const { cartItems, cartTotal, clearCart } = useCart();
    // We need a snapshot of cart because usually we'd clear it. 
    // For this flow, we'll assume `cartItems` is passed or still valid 
    // until modal closes. 
    // Better approach: When order succeeds, parent passes the final order details INCLUDING items.
    // But to keep it simple with context, let's assume we didn't clear cart yet OR we pass a snapshot.

    // Actually, standard flow: Order Confirmed -> Receipt Shown -> Cart Cleared.
    // So likely we should clear cart AFTER receipt is closed or when Receipt mounts?
    // Let's rely on props `orderData` to contain items if possible, or just use context if we haven't cleared yet.
    // The Checkout flow is: Submit -> Spinner -> Show Receipt.
    // So inside `onConfirm` in parent, we should probably SNAPSHOT the cart items into state `receiptData`.

    if (!isOpen || !orderData) return null;

    const { items, subtotal, customer } = orderData;
    const taxes = Math.round(subtotal * 0.05);
    const packaging = 20;
    const grandTotal = subtotal + taxes + packaging;
    const orderId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleString();

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <div className="relative bg-white w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in-90 duration-300">

                {/* Success Header */}
                <div className="bg-green-50 p-6 flex flex-col items-center text-center border-b border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
                    <p className="text-gray-500 text-sm mt-1">Thank you for dining with us!</p>
                </div>

                {/* Receipt Content */}
                <div className="p-8 bg-white" style={{ backgroundImage: 'radial-gradient(#f3f4f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    <div className="text-center mb-6">
                        <h3 className="font-serif font-bold text-2xl text-gray-900">Golden Harvest</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Essence of Spice</p>
                        <p className="text-xs text-gray-400 mt-2">{date}</p>
                        <p className="text-xs text-gray-400">Order {orderId}</p>
                    </div>

                    <div className="border-t border-b border-dashed border-gray-300 py-4 space-y-3">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm text-gray-700">
                                <span>{item.quantity} x {item.name}</span>
                                <span className="font-medium">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>GST (5%)</span>
                            <span>₹{taxes}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Packaging</span>
                            <span>₹{packaging}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
                        <p className="mb-1">Mode: {customer.diningMode === 'dine_in' ? `Dine In (Table ${customer.tableNo})` : 'Delivery'}</p>
                        <p>Paid via {customer.paymentMethod.toUpperCase()}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 flex gap-3">
                    <button className="flex-1 py-3 text-gray-700 font-medium text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-[#1a1a1a] text-[#e2b13c] font-bold text-sm rounded-xl hover:bg-black shadow-lg hover:shadow-xl transition-all"
                    >
                        New Order
                    </button>
                </div>
            </div>
        </div>
    );
}
