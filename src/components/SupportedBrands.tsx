
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
    logo: 'https://openai.com/content/images/2025/02/openai-new-logo.png',
  },
  {
    name: 'X',
    url: 'https://x.com',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    logo: 'https://design.google/static/images/logo/googlelogo_color_272x92dp.png',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png',
  },
  {
    name: 'Semicolon Africa',
    url: 'https://semicolon.africa',
    logo: 'https://semicolon.africa/assets/images/semicolon-logo.png',
  },
  {
    name: 'Namecheap',
    url: 'https://namecheap.com',
    logo: 'https://1000logos.net/wp-content/uploads/2025/01/NameCheap-Logo.png',
  },
];

export function SupportedBrands() {
  return (
    <section id="supported-brands" className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Supported By</h2>
        <div className="brand-logos">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:no-underline"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="brand-logo"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
