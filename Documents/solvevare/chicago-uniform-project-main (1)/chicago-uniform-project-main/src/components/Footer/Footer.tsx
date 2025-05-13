import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
                try {
                  const response = await fetch(`http://localhost:3000/api/styles/titles`);
                  const data = await response.json();
                  setCategories(data.titles.slice(0, 15) || []);
                } catch (error) {
                  console.error('Error fetching categories:', error);
                }
              };
 fetchCategories();
  }, [])
  return (
    <footer className="bg-[#121212] text-gray-400 text-sm py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div>
          {categories.map((category) => (
            <div key={category}>
              <ul className="space-y-2">
                <li>
                  <Link to={`/category/${category.replace(/\s+/g, '%20').toLowerCase()}`}>
                    {category}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
          <div>
            <h3 className="text-white font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Product Suggestions</li>
              <li>Size Guide</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <p>&copy; 2025 Southloop Print. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Your Privacy Choices</a>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;