import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose, onConfirm }) {
    const { cartTotal } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        diningMode: 'dine_in', // dine_in | delivery
        tableNo: '1',
        address: '',
        paymentMethod: 'upi', // upi | card | cash
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onConfirm(formData);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-[#1a1a1a] w-full max-w-lg rounded-2xl border border-[#2d2d2d] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#252525]">
                    <h2 className="text-xl font-bold font-serif text-white">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* User Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Phone</label>
                            <input
                                required
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Dining Mode */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-400">Dining Mode</label>
                        <div className="flex gap-4 p-1 bg-[#2d2d2d] rounded-lg">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, diningMode: 'dine_in' })}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.diningMode === 'dine_in' ? 'bg-[#1a1a1a] shadow-sm text-primary' : 'text-gray-400 hover:text-white'}`}
                            >
                                Dine In
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, diningMode: 'delivery' })}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.diningMode === 'delivery' ? 'bg-[#1a1a1a] shadow-sm text-primary' : 'text-gray-400 hover:text-white'}`}
                            >
                                Delivery
                            </button>
                        </div>

                        {formData.diningMode === 'dine_in' ? (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-medium text-gray-400 block mb-2">Table Number</label>
                                <select
                                    className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 appearance-none"
                                    value={formData.tableNo}
                                    onChange={e => setFormData({ ...formData, tableNo: e.target.value })}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Table {n}</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-medium text-gray-400 block mb-2">Delivery Address</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
                                    placeholder="Enter full address..."
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                ></textarea>
                            </div>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-400">Payment Method</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'upi', label: 'UPI / QR', icon: <QrCode className="w-5 h-5 mb-1" /> },
                                { id: 'card', label: 'Card', icon: <CreditCard className="w-5 h-5 mb-1" /> },
                                { id: 'cash', label: 'Cash', icon: <Banknote className="w-5 h-5 mb-1" /> },
                            ].map(method => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.paymentMethod === method.id ? 'border-primary bg-primary/10 text-primary' : 'border-[#333] bg-[#222] text-gray-400 hover:border-gray-600'}`}
                                >
                                    {method.icon}
                                    <span className="text-xs font-medium">{method.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-[#2d2d2d] bg-[#252525]">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-[#cda034] text-[#1a1a1a] font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm & Pay'}
                        {!loading && `• ₹${cartTotal + Math.round(cartTotal * 0.05)}`}
                        {/* Note: In checkout we show grand total so user knows final amount. 
                 But wait, instructions say "Receipt Generation upon success" which implies we show details there. 
                 Here I'm showing a quick ref.*/}
                    </button>
                </div>
            </div>
        </div>
    );
}
