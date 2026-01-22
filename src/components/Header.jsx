import React from 'react';
import { Search, ShoppingBag, UtensilsCrossed, Sun, Moon } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onCartClick }) {
    const { searchQuery, setSearchQuery } = useMenu();
    const { cartCount } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between shadow-lg transition-colors duration-300">
            <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-xl md:text-2xl font-bold font-serif text-text tracking-wide">
                        Golden Harvest
                    </h1>
                    <p className="text-xs text-primary/80 uppercase tracking-wider hidden sm:block">
                        Essence of Spice
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 flex-1 justify-end max-w-xl">
                <div className="relative w-full max-w-sm hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card text-text pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-card rounded-full transition-colors text-text"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>

                    <button
                        onClick={onCartClick}
                        className="relative p-2 hover:bg-card rounded-full transition-colors group"
                    >
                        <ShoppingBag className="w-6 h-6 text-text group-hover:text-primary transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-0 bg-primary text-[#1a1a1a] text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
