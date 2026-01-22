import React from 'react';
import { CATEGORIES } from '../data/menuData';
import { useMenu } from '../context/MenuContext';
import { Utensils, Coffee, Pizza, IceCream, ChefHat } from 'lucide-react'; // Example icons 
// Note: lucide properties are dynamic. I'll use a map or switch if needed, but for now simple text is safer or generic icons.
// Screenshot shows specific icons: Fork/Knife for All, Cocktail for Bev, etc.

const CategoryIcon = ({ id }) => {
    switch (id) {
        case 'starters': return <Utensils className="w-4 h-4" />;
        case 'mains': return <ChefHat className="w-4 h-4" />;
        case 'desserts': return <IceCream className="w-4 h-4" />;
        case 'beverages': return <Coffee className="w-4 h-4" />;
        default: return <Utensils className="w-4 h-4" />;
    }
};

export default function CategoryTabs() {
    const { activeCategory, setActiveCategory } = useMenu();

    // CATEGORIES already includes "All Dishes" now
    const allCategories = CATEGORIES;

    return (
        <div className="flex overflow-x-auto gap-4 py-6 px-4 md:px-12 bg-background scrollbar-hide border-b border-white/10 sticky top-[72px] z-40 transition-colors duration-300">
            {allCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
              ${isActive
                                ? 'bg-primary text-[#1a1a1a] shadow-[0_0_15px_rgba(226,177,60,0.3)] scale-105'
                                : 'bg-transparent text-gray-500 border border-white/10 hover:border-primary/50 hover:text-text'
                            }
            `}
                    >
                        {cat.id === 'all' ? <Utensils className="w-4 h-4" /> : <CategoryIcon id={cat.id} />}
                        {cat.name}
                    </button>
                );
            })}
        </div>
    );
}
