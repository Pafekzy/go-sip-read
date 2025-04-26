
import React from 'react';

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
    name: 'OpenAI',
    url: 'https://openai.com',
    logo: '/lovable-uploads/c9559961-5af8-475f-b17b-b3338a8ccd99.png',
  },
  {
    name: 'X',
    url: 'https://x.com',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    logo: '/lovable-uploads/d60f57a8-3754-4b51-a317-0f1c3dcbfa04.png',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    logo: '/lovable-uploads/fde6d0fe-f60e-43c7-a384-f58c38285997.png',
  },
  {
    name: 'Semicolon',
    url: 'https://semicolon.africa',
    logo: '/lovable-uploads/5d4b2937-8f61-4f77-a15d-0445052659da.png',
  },
  {
    name: 'Namecheap',
    url: 'https://namecheap.com',
    logo: '/lovable-uploads/34bf1ce6-8df6-4b73-885d-8f397c13ad45.png',
  },
];

export function SupportedBrands() {
  return (
    <section id="supported-brands" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Supported By</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:no-underline flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain max-w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
