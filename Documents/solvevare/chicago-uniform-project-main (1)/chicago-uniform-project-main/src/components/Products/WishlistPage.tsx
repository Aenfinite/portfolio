import React from 'react';
import ProductCard, { Product } from './ProductCard';

const WishlistPage: React.FC = () => {
  const wishlistItems: Product[] = [
    {
      id: '1',
      name: 'Aura Dream Silk Night Suits For Women - Black',
      image: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 1499,
      lastSalePrice: 2999,
    },
    {
      id: '2',
      name: 'Nike SB Dunk Low CSEF',
      image: 'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 150,
    },
    {
      id: '3',
      name: 'adidas Yeezy Boost 700 Sun',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 315,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">WISHLIST</h1>
        <div className="text-sm text-gray-400 mb-6">
          <span className="hover:underline cursor-pointer">Home</span> / <span className="text-white font-semibold">Wishlist</span>
        </div>
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Your wishlist is empty. Start adding your favorite items!</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;