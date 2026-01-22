import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryTabs from './components/CategoryTabs';
import MenuGrid from './components/MenuGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import { useCart } from './context/CartContext';

function AppContent() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    const { cartItems, cartTotal, clearCart } = useCart();

    const handleCheckoutStart = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleCheckoutConfirm = (customerData) => {
        // 1. Prepare Snapshot
        const orderSnapshot = {
            items: [...cartItems],
            subtotal: cartTotal,
            customer: customerData
        };

        // 2. Show Receipt
        setReceiptData(orderSnapshot);
        setIsCheckoutOpen(false);

        // 3. Clear Cart (behind the scenes or after modal close, but typically "Order Placed" implies cart is empty now)
        clearCart();
    };

    const handleReceiptClose = () => {
        setReceiptData(null);
    };

    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30 transition-colors duration-300">
            <Header onCartClick={() => setIsCartOpen(true)} />

            <HeroSection />

            <main id="menu-section" className="max-w-7xl mx-auto py-8">
                <CategoryTabs />
                <MenuGrid />
            </main>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckoutStart}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={handleCheckoutConfirm}
            />

            <ReceiptModal
                isOpen={!!receiptData}
                orderData={receiptData}
                onClose={handleReceiptClose}
            />
        </div>
    );
}

export default AppContent;
