export const CATEGORIES = [
    { id: 'all', name: 'All Dishes' },
    { id: 'starters', name: 'Starters & Chaat' },
    { id: 'mains', name: 'Mains & Curries' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
];

export const MENU_ITEMS = [
    // Starters
    {
        id: 1,
        name: "Paneer Tikka Shashlik",
        price: 295,
        description: "Chunks of fresh cottage cheese marinated in yogurt and spices.",
        category: "starters",
        isVeg: true,
        isGF: true,
        image: "/images/paneer tikka.jpg"
    },
    {
        id: 2,
        name: "Samosa Chaat",
        price: 180,
        description: "Crushed savory samosas topped with tangy tamarind chutney.",
        category: "starters",
        isVeg: true,
        isGF: false,
        image: "/images/smalle samosa chat.jpg"
    },
    {
        id: 3,
        name: "Truffle Mushroom Bruschetta",
        price: 420, // Estimated price as user didn't specify
        description: "Grilled artisanal sourdough topped with creamy wild mushroom ragout, truffle oil.",
        category: "starters",
        isVeg: true,
        isGF: false,
        image: "/images/mashroom dish.jpg"
    },

    // Mains
    {
        id: 4,
        name: "Butter Chicken (Murgh Makhani)",
        price: 480,
        description: "Tender chicken pieces simmered in rich tomato butter gravy.",
        category: "mains",
        isVeg: false,
        isGF: true,
        image: "/images/shai paneer.jpg"
    },
    {
        id: 5,
        name: "Dal Makhani",
        price: 320,
        description: "Black lentils slow-cooked overnight with butter and cream.",
        category: "mains",
        isVeg: true,
        isGF: true,
        image: "/images/dal makhni.jpg"
    },
    {
        id: 6,
        name: "Hyderabadi Chicken Biryani",
        price: 550, // Estimated
        description: "Aromatic basmati rice layered with spiced chicken, saffron, and fried onions.",
        category: "mains",
        isVeg: false,
        isGF: true,
        image: "/images/biriyani.jpg"
    },
    {
        id: 7,
        name: "Classic Wagyu Burger",
        price: 650,
        description: "Juicy Wagyu beef patty, melted cheddar, caramelized onions, and house sauce.",
        category: "mains",
        isVeg: false,
        isGF: false,
        image: "/images/burger high.jpg"
    },

    // Desserts
    {
        id: 8,
        name: "Gulab Jamun",
        price: 120,
        description: "Soft milk-solid dumplings fried golden and soaked in rose-sugar syrup.",
        category: "desserts",
        isVeg: true,
        isGF: false,
        image: "/images/gulab jamun.jpg"
    },
    {
        id: 9,
        name: "Rasmalai",
        price: 160,
        description: "Soft paneer discs soaked in chilled, saffron-flavored milk.",
        category: "desserts",
        isVeg: true,
        isGF: true,
        image: "/images/rashmalai.jpg"
    },
    {
        id: 10,
        name: "Molten Lava Cake",
        price: 350,
        description: "Rich chocolate cake with a gooey molten center, served with vanilla ice cream.",
        category: "desserts",
        isVeg: true,
        isGF: false,
        image: "/images/choko lava cake.jpg"
    },

    // Beverages
    {
        id: 11,
        name: "Mango Lassi",
        price: 140,
        description: "Creamy yogurt drink blended with fresh sweet mangoes.",
        category: "beverages",
        isVeg: true,
        isGF: true,
        image: "/images/mango milk shake.jpg"
    },
    {
        id: 12,
        name: "Masala Chai",
        price: 80,
        description: "Spiced Indian tea brewed with cardamom, ginger, and cloves.",
        category: "beverages",
        isVeg: true,
        isGF: true,
        image: "/images/mashala tea.jpg"
    }
];
