
import React from 'react';

const brands = [
  {
    name: 'SemicolonAfrica',
    url: 'https://semicolon.africa',
    logo: '/lovable-uploads/34446218-6f0a-4678-af8b-c7a5da04f57e.png',
  },
  {
    name: 'OpenAI',
    url: 'https://openai.com',
    logo: '/lovable-uploads/b20f42ab-857c-4191-8764-9efd2584ed19.png',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    logo: '/lovable-uploads/1a7566c9-20cb-4386-a8b0-5057c122a553.png',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    logo: '/lovable-uploads/675b6e5c-20ac-4a5c-9b95-817912e5af90.png',
  },
  {
    name: 'Namecheap',
    url: 'https://namecheap.com',
    logo: '/lovable-uploads/f6d7ab4d-2a98-4e74-84e9-ee90b93f229e.png',
  },
];

export function SupportedBrands() {
  return (
    <section id="supported-brands" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Supported By</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
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
                className="h-12 w-auto object-contain max-w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
