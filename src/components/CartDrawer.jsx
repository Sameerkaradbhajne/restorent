import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ChefHat } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
    const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-[#1a1a1a] shadow-2xl border-l border-[#2d2d2d] flex flex-col h-full transform transition-transform animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#1a1a1a]">
                    <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <ChefHat className="text-primary w-6 h-6" /> Your Order
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#2d2d2d] rounded-full text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <ChefHat className="w-16 h-16 text-gray-600" />
                            <p className="text-lg">Your cart is empty</p>
                            <button onClick={onClose} className="text-primary hover:underline">
                                Browse Menu
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-[#2d2d2d]" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-medium text-white line-clamp-1">{item.name}</h4>
                                        <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3 block">₹{item.price} x {item.quantity}</p>

                                    <div className="flex items-center gap-3 bg-[#2d2d2d] w-fit rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-6 h-6 flex items-center justify-center hover:text-white text-gray-400 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-6 h-6 flex items-center justify-center hover:text-white text-gray-400 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-[#2d2d2d] bg-[#1a1a1a] space-y-4">
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-white">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (5%)</span>
                                <span className="text-white">₹{Math.round(cartTotal * 0.05)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-[#2d2d2d]">
                                <span>Total</span>
                                <span className="text-primary">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="w-full py-4 bg-primary text-[#1a1a1a] font-bold rounded-xl hover:bg-white transition-colors text-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
