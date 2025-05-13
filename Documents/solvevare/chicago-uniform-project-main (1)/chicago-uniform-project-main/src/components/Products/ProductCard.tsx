import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  subname?: string;
  image: string;
  price: number;
  lastSalePrice?: number;
  lowestAskPrice?: number;
  askText?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <a href={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            />
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">{product.name}</h3>
          {product.subname && (
            <p className="text-sm text-gray-500 mt-1">{product.subname}</p>
          )}
          <div className="mt-3">
            {product.lowestAskPrice && (
              <div className="text-xs text-gray-400">
                {product.askText || "Lowest Ask"}
              </div>
            )}
            <div className="font-bold text-xl text-green-600">{formatPrice(product.price)}</div>
            {product.lastSalePrice && (
              <div className="text-xs text-gray-400 mt-1">
                Last Sale: {formatPrice(product.lastSalePrice)}
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;