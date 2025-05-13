import React, { useState } from 'react';

interface Link {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

interface NavLinksProps {
  links: Link[];
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, className = '' }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {links.map((link) => (
        <div
          key={link.label}
          className="relative group"
          onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <a
            href={link.href || '#'}
            className={`text-white hover:text-green-400 transition font-medium ${className}`}
          >
            {link.label}
          </a>
          {link.dropdown && openDropdown === link.label && (
            <div
              className="absolute top-full left-0 bg-[#1A1A1A] text-white shadow-lg rounded-lg mt-2 py-2 z-[100] border border-gray-700 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out"
            >
              {link.dropdown.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-6 py-3 hover:bg-green-500 hover:text-white transition rounded-lg whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;