import React from 'react';
import { useMenu } from '../context/MenuContext';
import { MENU_ITEMS } from '../data/menuData';
import MenuCard from './MenuCard';

export default function MenuGrid() {
    const { activeCategory, searchQuery, filters, updateFilters } = useMenu();
    // Helper to get category name
    const getCategoryName = (id) => {
        if (id === 'all') return 'All Dishes';
        // Need to import CATEGORIES or just rely on ID for now, but importing is cleaner.
        // Assuming CATEGORIES is available or we just use title case for ID as fallback.
        return id.charAt(0).toUpperCase() + id.slice(1);
    };

    // Import CATEGORIES here if needed, or pass from Context. 
    // Since I can't easily import it without changing imports, I'll assume simple mapping or "All Dishes" fallback.

    const filteredItems = MENU_ITEMS.filter((item) => {
        // 1. Search Filter (Global)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!item.name.toLowerCase().includes(query) && !item.description.toLowerCase().includes(query)) {
                return false;
            }
        }
        // 2. Category Filter (Apply even if search is present? Usually standard is search overrides category or searches WITHIN category.
        // Current logic: search overrides category.
        // Requested logic: "All Dishes" should show all.
        // If search is empty:
        else {
            if (activeCategory !== 'all' && item.category !== activeCategory) {
                return false;
            }
        }

        // 3. Attribute Filters
        if (filters.isVeg && !item.isVeg) return false;
        if (filters.isGF && !item.isGF) return false;

        return true;
    });

    return (
        <div className="px-4 md:px-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-4">
                <h2 className="text-2xl font-serif font-bold text-text mb-4 md:mb-0">
                    {searchQuery ? `Search Results for "${searchQuery}"` :
                        activeCategory === 'all' ? 'All Dishes' :
                            // Manual mapping for now to be safe without extra import
                            activeCategory === 'starters' ? 'Starters & Chaat' :
                                activeCategory === 'mains' ? 'Mains & Curries' :
                                    activeCategory === 'desserts' ? 'Desserts' :
                                        activeCategory === 'beverages' ? 'Beverages' : 'Menu'
                    }
                </h2>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.isVeg ? 'bg-green-600 border-green-600' : 'border-gray-500 group-hover:border-green-500'}`}>
                            {filters.isVeg && <span className="text-white text-xs">✔</span>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={filters.isVeg}
                            onChange={(e) => updateFilters('isVeg', e.target.checked)}
                        />
                        <span className={`text-sm font-medium ${filters.isVeg ? 'text-green-500' : 'text-gray-400 group-hover:text-green-400'}`}>Vegetarian</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.isGF ? 'bg-primary border-primary' : 'border-gray-500 group-hover:border-primary'}`}>
                            {filters.isGF && <span className="text-[#1a1a1a] text-xs font-bold">✔</span>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={filters.isGF}
                            onChange={(e) => updateFilters('isGF', e.target.checked)}
                        />
                        <span className={`text-sm font-medium ${filters.isGF ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>Gluten Free</span>
                    </label>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No dishes found matching your criteria.</p>
                    <button
                        onClick={() => { updateFilters('isVeg', false); updateFilters('isGF', false); }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
