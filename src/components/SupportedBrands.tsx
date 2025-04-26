
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
    logo: '/lovable-uploads/52d584c5-9796-4f42-8bd7-58e06722548e.png',
  },
  {
    name: 'X',
    url: 'https://x.com',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    logo: '/lovable-uploads/ff2e6307-8330-4fed-8ede-23bd9c0e333a.png',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    logo: '/lovable-uploads/7a903683-349e-484c-9a9c-879c740bdfad.png',
  },
  {
    name: 'Semicolon',
    url: 'https://semicolon.africa',
    logo: '/lovable-uploads/d11dcf69-41bc-4e54-b7eb-b8edb3ef8684.png',
  },
  {
    name: 'Namecheap',
    url: 'https://namecheap.com',
    logo: '/lovable-uploads/6cbb3a15-26e4-497f-a38a-5c41077d931e.png',
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
