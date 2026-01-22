import React from 'react';

const HeroSection = () => {
    const handleScroll = () => {
        const menuSection = document.getElementById('menu-section');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            >
                {/* Overlay - Dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6 drop-shadow-lg tracking-tight">
                    Golden Harvest
                </h1>
                <h2 className="text-xl md:text-3xl text-gray-100 mb-10 max-w-3xl font-light tracking-wide drop-shadow-md">
                    The Essence of Authentic Spice & Elegant Dining.
                </h2>

                <button
                    onClick={handleScroll}
                    className="px-8 py-4 bg-primary text-[#1a1a1a] text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(226,177,60,0.4)]"
                >
                    Explore Our Menu
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
