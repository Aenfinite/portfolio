import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DynamicCategoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { category } = useParams(); // Get the category from the route parameters

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;

      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await fetch(`http://localhost:3000/api/products/by-title/${category}?limit=20`); // Add a limit for optimization
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-gray-400 text-sm mb-6">
          <span className="hover:underline cursor-pointer">Home</span> /Category/
          <span className="text-white font-semibold">{category}</span>
        </div>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-400">Loading products...</p>}

        {/* Error State */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Grid Section */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <Link
                  to={`/product/${product.sku}`} // Navigate to the product page using the SKU
                  key={index}
                  className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <img
                    src={`https://www.ssactivewear.com/${product.colorFrontImage}`}
                    alt={product.styleName}
                    className="h-48 w-full object-cover rounded-lg mb-4"
                  />

                  {/* Product Name */}
                  <h3 className="text-lg font-bold mb-1 truncate">
                    {product.brandName} {product.styleName}
                  </h3>

                  {/* Product Color */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: product.color1 }}
                    ></div>
                    <span className="text-sm text-gray-400">{product.colorName}</span>
                  </div>

                  {/* Product Price */}
                  <p className="text-green-400 font-semibold text-md">${product.salePrice.toFixed(2)}</p>

                  {/* Stock Quantity */}
                  <p className="text-sm text-gray-500">In Stock: {product.qty}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full">No products found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicCategoryPage;