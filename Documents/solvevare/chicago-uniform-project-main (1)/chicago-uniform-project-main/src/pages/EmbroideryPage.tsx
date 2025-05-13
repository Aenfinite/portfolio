import React from 'react';

const EmbroideryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Embroidery</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to the Embroidery page! Here you can explore a variety of embroidery designs and services tailored to your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example items */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/public/img01.avif" alt="Embroidery Design 1" className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Design 1</h2>
            <p className="text-gray-600">High-quality embroidery design for your projects.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/public/img02.avif" alt="Embroidery Design 2" className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Design 2</h2>
            <p className="text-gray-600">Customizable embroidery patterns available.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/public/img03.avif" alt="Embroidery Design 3" className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Design 3</h2>
            <p className="text-gray-600">Perfect for personal and professional use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbroideryPage;