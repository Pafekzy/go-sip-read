
import React, { useState } from 'react';

const brands = [
  {
    name: 'Opay',
    url: 'https://opay.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Opay_Digital_Services_Limited.png/250px-Opay_Digital_Services_Limited.png',
  },
  {
    name: 'Alison',
    url: 'https://alison.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mask_Group_121227_222.png/250px-Mask_Group_121227_222.png',
  },
  {
    name: 'Coursera',
    url: 'https://coursera.org',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Coursera_logo.PNG',
  },
  {
    name: 'X',
    url: 'https://x.com',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg',
  },
  {
    name: 'Udemy',
    url: 'https://udemy.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
  },
  {
    name: 'Pluralsight',
    url: 'https://pluralsight.com',
    logo: '/lovable-uploads/580d35a0-ac53-4f29-bc45-13fb2b2b708e.png',
  },
  {
    name: 'Eduonix',
    url: 'https://eduonix.com',
    logo: '/lovable-uploads/55409a7e-8ada-4882-9e55-bba8650e6510.png',
  },
  {
    name: 'Skillshare',
    url: 'https://skillshare.com',
    logo: '/lovable-uploads/d06345cb-edb3-44af-ae17-e2533ae51e0d.png',
  },
];

export function SupportedBrands() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (brandName: string) => {
    console.error(`Failed to load image for ${brandName}`);
    setImageErrors(prev => ({ ...prev, [brandName]: true }));
  };

  const handleImageLoad = (brandName: string) => {
    console.log(`Successfully loaded image for ${brandName}`);
  };

  return (
    <section id="supported-brands" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Supported By</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex items-center justify-center w-full"
            >
              {imageErrors[brand.name] ? (
                <div className="h-16 w-full flex items-center justify-center bg-gray-100 rounded">
                  {brand.name}
                </div>
              ) : (
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-16 w-auto object-contain max-w-full"
                  onError={() => handleImageError(brand.name)}
                  onLoad={() => handleImageLoad(brand.name)}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
