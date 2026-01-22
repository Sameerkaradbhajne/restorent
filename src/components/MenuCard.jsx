import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

const VegBadge = () => (
    <div className="absolute top-4 left-4 bg-green-900/80 backdrop-blur-sm border border-green-500 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        VEG
    </div>
);

const NonVegBadge = () => (
    <div className="absolute top-4 left-4 bg-red-900/80 backdrop-blur-sm border border-red-500 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        NON-VEG
    </div>
);

export default function MenuCard({ item }) {
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const quantity = getItemQuantity(item.id);

    return (
        <div className="group bg-card rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.isVeg ? <VegBadge /> : <NonVegBadge />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-text leading-tight pr-2">{item.name}</h3>
                    <span className="text-primary font-bold text-lg">₹{item.price}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {item.description}
                </p>

                {quantity === 0 ? (
                    <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2.5 rounded-xl border border-white/10 bg-background/50 hover:bg-white hover:text-black hover:border-white text-text font-medium transition-all duration-300 flex items-center justify-center gap-2 group-active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                ) : (
                    <div className="flex items-center justify-between bg-background rounded-xl p-1 border border-white/10">
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-8 flex items-center justify-center text-text hover:text-primary transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-text text-sm">{quantity}</span>
                        <button
                            onClick={() => addToCart(item)}
                            className="w-10 h-8 flex items-center justify-center text-text hover:text-primary transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
