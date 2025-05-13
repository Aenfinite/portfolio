import React, { useState } from 'react';
import ThreeSixty from 'react-360-view';

const ProductPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<{ x: number; y: number } | null>(null);
  const [rotationIndex, setRotationIndex] = useState(1);
  const [logoSize, setLogoSize] = useState(50); // New state for logo size
  const [logoRotation, setLogoRotation] = useState(0); // New state for logo rotation
  const [isDragging, setIsDragging] = useState(false); // State to track dragging

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleLogoPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setLogoPosition({ x, y });
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotationIndex(Number(event.target.value));
  };

  const handleSaveProduct = () => {
    if (uploadedImage && logoPosition) {
      alert('Product saved with your customization!');
    } else {
      alert('Please upload an image and set its position.');
    }
  };

  const handleLogoSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoSize(Number(event.target.value));
  };

  const handleRotateLogo = () => {
    setLogoRotation((prevRotation) => prevRotation + 15); // Rotate by 15 degrees
  };

  const handleDeleteLogo = () => {
    setUploadedImage(null);
    setLogoPosition(null);
  };

  const startDragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (uploadedImage) {
      setIsDragging(true);
    }
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div
              className="w-full h-96 bg-gray-100 flex items-center justify-center cursor-pointer rounded-lg shadow-lg overflow-hidden"
              onMouseMove={handleLogoPosition}
              onMouseDown={startDragging}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
            >
              <ThreeSixty
                amount={36}
                imagePath="/360-images/"
                fileName={`img${rotationIndex}.avif`}
                spinReverse
                autoplay={false}
                drag
              />
              {uploadedImage && logoPosition && (
                <img
                  src={uploadedImage}
                  alt="Uploaded Logo"
                  className="absolute"
                  style={{
                    top: logoPosition.y,
                    left: logoPosition.x,
                    transform: `translate(-50%, -50%) rotate(${logoRotation}deg)`,
                    width: `${logoSize}px`,
                    height: `${logoSize}px`,
                    cursor: 'grab',
                  }}
                />
              )}
              <input
                type="range"
                min="1"
                max="36"
                value={rotationIndex}
                onChange={handleSliderChange}
                className="absolute bottom-4 w-3/4 appearance-none bg-gray-700 rounded-full h-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-extrabold mb-4 text-green-400">Jordan 1 Retro High OG</h1>
            <p className="text-lg text-gray-400 mb-6 italic">UNC Reimagined</p>
            <p className="text-3xl font-bold mb-6 text-green-500">$187</p>

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
                <div className="flex items-center space-x-4">
                  <label className="block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
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
                </div>
              </div>
            )}

            <button
              onClick={handleSaveProduct}
              className="w-full py-3 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg"
            >
              Save and Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;