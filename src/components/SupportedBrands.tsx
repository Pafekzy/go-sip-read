
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
    name: 'Semicolon',
    url: 'https://semicolon.africa',
    logo: '/lovable-uploads/626868d5-f965-4710-afaf-df12711b74a8.png',
  },
  {
    name: 'OpenAI',
    url: 'https://openai.com',
    logo: '/lovable-uploads/9572bfba-e87a-4208-a23f-76a12d27e4e7.png',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    logo: '/lovable-uploads/ef5828ac-9400-4abb-95d9-0f882dc74682.png',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    logo: '/lovable-uploads/bd96ad03-378b-460c-8b61-1d614772c308.png',
  },
  {
    name: 'Namecheap',
    url: 'https://namecheap.com',
    logo: '/lovable-uploads/f6d7ab4d-2a98-4e74-84e9-ee90b93f229e.png',
  },
  {
    name: 'X',
    url: 'https://x.com',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg',
  },
];

export function SupportedBrands() {
  return (
    <section id="supported-brands" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Supported By</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex items-center justify-center w-full"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-10 w-auto object-contain max-w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
