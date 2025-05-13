import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductGrid from './components/Products/ProductGrid';
import Footer from './components/Footer/Footer';
import { recommendedProducts, trendingProducts } from './data/products';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import HowItWorks from './components/HowItWorks/HowItWorks';
import ProductPage from './components/Products/ProductPage';
import Brands from './pages/Categories/Brands';
import WishlistPage from './components/Products/WishlistPage';
import EmbroideryPage from './pages/EmbroideryPage';
import CustomAccessories from './pages/Categories/CustomAccessories';
import CustomBags from './pages/Categories/CustomBags';
import CustomHeadwear from './pages/Categories/CustomHeadwear';
import CustomOutwear from './pages/Categories/CustomOutwear';
import CustomShirts from './pages/Categories/CustomShirts';
import PantsAndShorts from './pages/Categories/PantsAndShorts'; 
import CustomEmbroideredShirts from './pages/Categories/CustomEmbroideredShirts';
import CustomEmbroideredOutwear from './pages/Categories/CustomEmbroideredOutwear';
import DynamicCategoryPage from './pages/DynamicCategoryPage';
import DynamicProductPage from './pages/DynamicProductPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductGrid 
                  title="Recommended For You" 
                  products={recommendedProducts}
                  infoIcon={true}
                />
                <ProductGrid 
                  title="Trending Products" 
                  products={trendingProducts}
                />
              </>
            } />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/products/" element={<ProductPage />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/customaccessories" element={<CustomAccessories />} />
            <Route path="/custombags" element={<CustomBags />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/customheadwear" element={<CustomHeadwear />} />
            <Route path="/customoutwear" element={<CustomOutwear />} />
            <Route path="/embsroidery" element={<EmbroideryPage />} />
            <Route path="/customembroideredshirts" element={<CustomEmbroideredShirts />} />
            <Route path="/customembroideredoutwear" element={<CustomEmbroideredOutwear />} />
            <Route path="/customshirts" element={<CustomShirts />} />
            <Route path="/pantsandshorts" element={<PantsAndShorts />} />
            <Route path="/category/:category" element={<DynamicCategoryPage />} />
            <Route path="/product/:sku" element={<DynamicProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;