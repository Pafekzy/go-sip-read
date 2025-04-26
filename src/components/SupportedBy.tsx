
import { useTheme } from "@/components/ThemeProvider";

const partners = [
  {
    name: "Semicolon Africa",
    url: "https://semicolon.africa",
    logo: "/lovable-uploads/9d6df6e5-87c3-4f50-9a0a-4c0d97fef2ff.png"
  },
  {
    name: "Opay",
    url: "https://opay.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Opay_Digital_Services_Limited.png/250px-Opay_Digital_Services_Limited.png"
  },
  {
    name: "Alison",
    url: "https://alison.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mask_Group_121227_222.png/250px-Mask_Group_121227_222.png"
  },
  {
    name: "Coursera",
    url: "https://coursera.org",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Coursera_logo.PNG"
  },
  {
    name: "X",
    url: "https://x.com",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg"
  },
  {
    name: "OpenAI",
    url: "https://openai.com",
    logo: "/lovable-uploads/e1f836d4-20af-4fe8-8ef9-628006351d44.png"
  },
  {
    name: "Google",
    url: "https://google.com",
    logo: "/lovable-uploads/347ef78d-9f8c-4e38-9a3e-e3927c5b7d92.png"
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    logo: "/lovable-uploads/9f0c8a76-abbd-45eb-80c1-319e3d98408a.png"
  },
  {
    name: "Namecheap",
    url: "https://namecheap.com",
    logo: "/lovable-uploads/b1dc74fe-152e-4b06-b8ef-63f84a9860c3.png"
  }
];

export function SupportedBy() {
  const { theme } = useTheme();
  
  return (
    <section id="supported-brands" className="py-8 border-t border-border mt-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8 overflow-visible">
          Supported By
        </h2>
        <div className="brand-logos flex flex-wrap justify-center gap-6 items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-x-[-1] transition-transform duration-400 ease-in-out"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`w-[80px] object-contain transition-[filter] duration-400 ease-in-out ${
                  theme === 'dark' 
                    ? 'hover:brightness-[1.3]' 
                    : 'hover:brightness-[1.1]'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
