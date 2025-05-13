import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg',
    title: 'Jumpman Jack',
    subtitle: 'Bright Cactus',
    buttonText: 'Shop Now',
    buttonLink: '/products/jumpman-jack',
    bgColor: 'bg-lime-300'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg',
    title: 'Air Max 95',
    subtitle: 'Honey Black',
    buttonText: 'View Details',
    buttonLink: '/products/air-max-95',
    bgColor: 'bg-amber-400'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    title: 'Jordan 1 Retro',
    subtitle: 'UNC Reimagined',
    buttonText: 'Buy Now',
    buttonLink: '/products/jordan-1-retro',
    bgColor: 'bg-sky-400'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl my-4 mx-4 md:mx-6 lg:mx-8 z-0">
      <div className="max-w-screen-2xl mx-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className={`${slide.bgColor} rounded-2xl overflow-hidden`}>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-0">
                <div className="md:w-3/5 lg:w-2/3">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="md:w-2/5 lg:w-1/3 p-4 md:p-8 flex flex-col items-center md:items-end text-center md:text-right">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
                    {slide.title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mt-2">
                    {slide.subtitle}
                  </h3>
                  <a
                    href={slide.buttonLink}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-opacity-80 transition"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Hero;