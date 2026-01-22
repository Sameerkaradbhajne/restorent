import React, { createContext, useContext, useState } from 'react';
import { CATEGORIES } from '../data/menuData';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        isVeg: false,
        isGF: false,
    });

    const updateFilters = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <MenuContext.Provider
            value={{
                activeCategory,
                setActiveCategory,
                searchQuery,
                setSearchQuery,
                filters,
                updateFilters,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
