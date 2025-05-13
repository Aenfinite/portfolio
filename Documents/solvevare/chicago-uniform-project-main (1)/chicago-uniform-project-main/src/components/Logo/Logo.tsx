import React from 'react';
import logoImage from '../../../public/IMG_6018 (1).jpeg'; // Assuming the logo is stored in the public folder

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage} alt="South Loop Prints Logo" className="h-16 w-16 object-contain" />
    
    </div>
  );
};

export default Logo;