import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <header className="bg-[#121212] text-white py-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Current Culture Marketplace</h1>
          <p className="text-lg md:text-xl">
            Our mission is to provide access to the world’s most coveted items in the simplest way possible. Buy and sell the hottest sneakers, apparel, electronics, collectibles, trading cards, and accessories.
          </p>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Shop With Confidence</h2>
            <p className="text-gray-600">
              Every item sold goes through our proprietary, multi-step verification process, or comes directly from a trusted partner.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-gray-600">
              Our real-time marketplace works just like the stock market, allowing you to buy and sell at true market prices.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Global Access</h2>
            <p className="text-gray-600">
              Whether it’s pre-releases, regionally exclusive items, or hard-to-find products, we make them accessible to everyone.
            </p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Buy</h3>
              <p className="text-gray-600">Browse and purchase items with confidence.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Sell</h3>
              <p className="text-gray-600">List your items and reach a global audience.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">The Power's In Your Hands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Buying On StockX</h3>
              <p className="text-gray-600">We don’t determine the price, you do. As a live marketplace, StockX empowers you to bid and buy at real-time prices that reflect the current demand.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Selling On StockX</h3>
              <p className="text-gray-600">Whether you’re looking to make quick cash or start a reselling business, we have the tools to help you succeed.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">What People Have to Say About StockX</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-gray-600">Don’t remember being this Happy @stockx thanks Folded hands Stock #GotItOnStockX</p>
              <p className="text-sm text-gray-500">- @JohnDoe</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">So dope. Copped under retail and got them in 3 days! #GotItOnStockX</p>
              <p className="text-sm text-gray-500">- @TheEndGuy</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">The link to this photo or video may be broken, or the post may have been removed. Visit Instagram.</p>
              <p className="text-sm text-gray-500">- Instagram</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Shop Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-gray-200 p-4 rounded">Sneakers</div>
            <div className="bg-gray-200 p-4 rounded">Apparel</div>
            <div className="bg-gray-200 p-4 rounded">Electronics</div>
            <div className="bg-gray-200 p-4 rounded">Collectibles</div>
            <div className="bg-gray-200 p-4 rounded">Accessories</div>
            <div className="bg-gray-200 p-4 rounded">Trading Cards</div>
          </div>
        </section>
      </main>

      <footer className="bg-[#121212] text-white py-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-center">©2025 StockX. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;