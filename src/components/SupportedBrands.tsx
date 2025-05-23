
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
    customSize: 'scale-50', // Add custom scaling for X
  },
  {
    name: 'NameCheap',
    url: 'https://namecheap.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Namecheap_Logo.svg/320px-Namecheap_Logo.svg.png',
  },
  {
    name: 'SemicolonAfrica',
    url: 'https://semicolon.africa',
    logo: 'https://logo.clearbit.com/semicolon.africa',
    customSize: 'scale-50', // Add custom scaling for Semicolon Africa
  },
  {
    name: 'Z-library',
    url: 'https://z-library.sk',
    logo: 'https://z-lib.id/img/logo.png',
  },
  {
    name: 'OpenAI',
    url: 'https://openai.com',
    logo: '/lovable-uploads/031989b3-2045-45e2-8f3e-6e309c223f61.png',
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
        <h2 className="text-2xl font-bold text-center mb-8">Check Brands Supporting Us</h2>
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
                <div className="h-6 w-full flex items-center justify-center">
                  <span className="font-bold italic text-gosip-purple text-sm">OpenAI</span>
                </div>
              ) : (
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={`h-[35%] w-auto object-contain max-w-[35%] ${brand.customSize || ''}`}
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
