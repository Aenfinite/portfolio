import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const categories = [
  { name: 'Collectibles', subcategories: ['Figures', 'Toys', 'Comic Books', 'Homeware', 'Skate Decks', 'Games'] },
];

const products = [
  {
    name: 'Pop Mart Labubu The Monsters Big into Energy',
    price: '$129',
    sold: '125 sold',
    image: '/public/img01.avif',
    rating: 4.5,
  },
  {
    name: 'Barbie Signature LeBarbie Lebron James Doll',
    price: '$85',
    sold: '89 sold',
    image: '/public/360-images/img02.avif',
    rating: 4.2,
  },
  {
    name: 'Supreme Transformers G1 Optimus Prime Figure Red',
    price: '$149',
    sold: '103 sold',
    image: '/public/360-images/img03.avif',
    rating: 4.8,
  },
  {
    name: 'Pop Mart Labubu The Monsters Tasty Macarons',
    price: '$95',
    sold: '92 sold',
    image: '/public/360-images/img04.avif',
    rating: 4.6,
  },
  {
    name: 'Supreme Transformers G1 Optimus Prime Figure Red',
    price: '$149',
    sold: '103 sold',
    image: '/public/360-images/img03.avif',
    rating: 4.8,
  },
  {
    name: 'Pop Mart Labubu The Monsters Tasty Macarons',
    price: '$95',
    sold: '92 sold',
    image: '/public/360-images/img04.avif',
    rating: 4.6,
  },
  {
    name: 'Supreme Transformers G1 Optimus Prime Figure Red',
    price: '$149',
    sold: '103 sold',
    image: '/public/360-images/img03.avif',
    rating: 4.8,
  },
  {
    name: 'Pop Mart Labubu The Monsters Tasty Macarons',
    price: '$95',
    sold: '92 sold',
    image: '/public/360-images/img04.avif',
    rating: 4.6,
  },
];

const CustomOutwear: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleTab = (tabName: string) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-gray-400 text-sm mb-6">
          <span className="hover:underline cursor-pointer">Home</span> / <span className="text-white font-semibold">Collectibles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Section */}
          <div className="col-span-1 bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-gray-700">
            {[
              { label: 'CATEGORY', items: categories[0].subcategories },
              { label: 'BRANDS', items: ['Nike', 'Adidas', 'Puma'] },
              { label: 'COLOR', items: ['Red', 'Blue', 'Black'] },
            ].map(({ label, items }) => (
              <div key={label} className="mb-6 border-b border-gray-700 pb-4">
                <h2
                  className="text-xl font-semibold flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTab(label)}
                >
                  {label}
                  <FaChevronDown className={`transition-transform ${activeTab === label ? 'rotate-180' : ''}`} />
                </h2>
                {activeTab === label && (
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    {items.map((item) => (
                      <li key={item} className="flex items-center space-x-2">
                        <input type="checkbox" className="accent-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Price Range */}
            <div className="pb-2">
              <h2
                className="text-xl font-semibold flex justify-between items-center cursor-pointer"
                onClick={() => toggleTab('PRICE')}
              >
                PRICE
                <FaChevronDown className={`transition-transform ${activeTab === 'PRICE' ? 'rotate-180' : ''}`} />
              </h2>
              {activeTab === 'PRICE' && (
                <div className="mt-4">
                  <input type="range" min="50" max="500" className="w-full cursor-pointer" />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>$50</span>
                    <span>$500+</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Grid Section */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                <div className="flex items-center text-yellow-400 text-sm mb-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <AiFillStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'} />
                  ))}
                  <span className="ml-2 text-gray-400">{product.rating.toFixed(1)}</span>
                </div>
                <p className="text-green-400 font-semibold text-md">{product.price}</p>
                <p className="text-sm text-gray-500">{product.sold}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOutwear;
