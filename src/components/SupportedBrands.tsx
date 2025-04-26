
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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Pluralsight_logo.png',
  },
  {
    name: 'Eduonix',
    url: 'https://eduonix.com',
    logo: 'https://www.eduonix.com/assets/images/edu-logo.svg',
  },
  {
    name: 'Skillshare',
    url: 'https://skillshare.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Skillshare_Logo_2020.png',
  },
];

export function SupportedBrands() {
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

