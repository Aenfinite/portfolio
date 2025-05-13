import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DynamicProductPage: React.FC = () => {
  const { sku } = useParams<{ sku: string }>(); // Get the SKU from the route parameters
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quantity for purchase
  const [logoData, setLogoData] = useState<Record<number, { image: string | null; x: number; y: number; size: number; rotation: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const mainSliderRef = useRef<Slider | null>(null);
 
 const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<{ x: number; y: number } | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoRotation, setLogoRotation] = useState(0);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/sku/${sku}`); // Fetch product by SKU
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data.product); // Access the "product" field in the JSON
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [sku]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  // Collect all available images
  const images = [
    product.colorFrontImage && `https://www.ssactivewear.com/${product.colorFrontImage}`,
    product.colorSideImage && `https://www.ssactivewear.com/${product.colorSideImage}`,
    product.colorBackImage && `https://www.ssactivewear.com/${product.colorBackImage}`,
    product.colorOnModelFrontImage && `https://www.ssactivewear.com/${product.colorOnModelFrontImage}`,
    product.colorOnModelSideImage && `https://www.ssactivewear.com/${product.colorOnModelSideImage}`,
    product.colorOnModelBackImage && `https://www.ssactivewear.com/${product.colorOnModelBackImage}`,
  ].filter(Boolean); // Filter out any undefined or empty values

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.caseQty) {
      setQuantity(newQuantity);
    }
  };

  const handleLogoPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setLogoData((prev) => ({
        ...prev,
        [currentImageIndex]: {
          ...prev[currentImageIndex],
          x,
          y,
        },
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoData((prev) => ({
          ...prev,
          [currentImageIndex]: {
            ...prev[currentImageIndex],
            image: reader.result as string,
            x: prev[currentImageIndex]?.x || 50,
            y: prev[currentImageIndex]?.y || 50,
            size: prev[currentImageIndex]?.size || 50,
            rotation: prev[currentImageIndex]?.rotation || 0,
          },
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleLogoSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(event.target.value);
    setLogoData((prev) => ({
      ...prev,
      [currentImageIndex]: {
        ...prev[currentImageIndex],
        size,
      },
    }));
  };

  const handleRotateLogo = () => {
    setLogoData((prev) => ({
      ...prev,
      [currentImageIndex]: {
        ...prev[currentImageIndex],
        rotation: (prev[currentImageIndex]?.rotation || 0) + 15,
      },
    }));
  };

  const handleDeleteLogo = () => {
    setLogoData((prev) => ({
      ...prev,
      [currentImageIndex]: {
        ...prev[currentImageIndex],
        image: null,
      },
    }));
  };
 const handlePurchase = () => {
    alert(`You have purchased ${quantity} units of ${product.styleName}.`);
  };
  const startDragging = () => {
    if (logoData[currentImageIndex]?.image) {
      setIsDragging(true);
    }
  };

  const stopDragging = () => setIsDragging(false);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    mainSliderRef.current?.slickGoTo(index); // Navigate to the selected image in the main slider
  };

  const handleSlideChange = (index: number) => {
    setCurrentImageIndex(index); // Update the current image index when the main slider changes
  };

  // Calculate subtotal price
  const subtotal = (quantity * product.salePrice).toFixed(2);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_, next) => handleSlideChange(next),
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative">
            {/* Main Slider */}
            <Slider {...sliderSettings} ref={mainSliderRef}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center"
                  onMouseMove={handleLogoPosition}
                  onMouseDown={startDragging}
                  onMouseUp={stopDragging}
                  onMouseLeave={stopDragging}
                >
                  {/* Product Image */}
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-auto h-auto max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                    style={{ display: 'block', margin: '0 auto' }}
                  />

                  {/* Uploaded Logo */}
                  {logoData[index]?.image && (
                    <img
                      src={logoData[index].image}
                      alt="Uploaded Logo"
                      className="absolute"
                      style={{
                        top: logoData[index].y || '50%',
                        left: logoData[index].x || '50%',
                        transform: `translate(-50%, -50%) rotate(${logoData[index].rotation || 0}deg)`,
                        width: `${logoData[index].size || 50}px`,
                        height: `${logoData[index].size || 50}px`,
                        cursor: 'grab',
                        mixBlendMode: 'multiply', // Blend mode for embossed effect
                        opacity: 0.8, // Slight transparency for editing mode
                      }}
                    />
                  )}
                </div>
              ))}
            </Slider>

            {/* Thumbnail Slider */}
            <div className="mt-4 flex justify-center space-x-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg ${
                    currentImageIndex === index ? 'border-green-500' : 'border-transparent'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-auto h-auto max-h-20 object-contain rounded-lg"
                    style={{ margin: '0 auto' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
         <div>
            <h1 className="text-5xl font-extrabold mb-4 text-green-400">
              {product.brandName} {product.styleName}
            </h1>
            <p className="text-lg text-gray-400 mb-6 italic">{product.colorName}</p>
            <p className="text-3xl font-bold mb-2 text-green-500">${product.salePrice.toFixed(2)}</p>
            <p className="text-lg font-medium mb-6 text-gray-300">
              Subtotal: <span className="text-green-400">${subtotal}</span>
            </p>

            <div className="mb-6">
              <p className="text-sm text-gray-400">SKU: {product.sku}</p>
              <p className="text-sm text-gray-400">GTIN: {product.gtin}</p>
              <p className="text-sm text-gray-400">Country of Origin: {product.countryOfOrigin}</p>
              <p className="text-sm text-gray-400">
                Available Quantity: <span className="font-bold">{product.qty}</span>
              </p>
              <p className="text-sm text-gray-400">Case Quantity (Max): {product.caseQty}</p>
              <p className="text-sm text-gray-400">Unit Weight: {product.unitWeight} lbs</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Select Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-16 text-center px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="1"
                  max={product.caseQty}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                  disabled={quantity >= product.caseQty}
                >
                  +
                </button>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(quantity / product.caseQty) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Selected: <span className="font-bold">{quantity}</span> / {product.caseQty}
                </p>
              </div>
              {quantity > product.caseQty && (
                <p className="text-sm text-red-500 mt-2">Quantity exceeds the maximum case quantity!</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload Your Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-400"
              />
            </div>

            {uploadedImage && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Logo Size</label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={logoSize}
                  onChange={handleLogoSizeChange}
                  className="w-full appearance-none bg-gray-700 rounded-full h-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {uploadedImage && (
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleRotateLogo}
                  className="py-1 px-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Rotate
                </button>
                <button
                  onClick={handleDeleteLogo}
                  className="py-1 px-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-400 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Delete
                </button>
              </div>)}

            <button
              onClick={handlePurchase}
              className="w-full py-3 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductPage;