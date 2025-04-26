
import { useTheme } from "@/components/ThemeProvider";

const partners = [
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
    name: "OpenAI",
    url: "https://openai.com",
    logo: "https://openai.com/content/images/2025/02/openai-new-logo.png"
  },
  {
    name: "X",
    url: "https://x.com",
    logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.svg"
  },
  {
    name: "Google",
    url: "https://google.com",
    logo: "https://design.google/static/images/logo/googlelogo_color_272x92dp.png"
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
  },
  {
    name: "Semicolon Africa",
    url: "https://semicolon.africa",
    logo: "https://semicolon.africa/assets/images/semicolon-logo.png"
  },
  {
    name: "Namecheap",
    url: "https://namecheap.com",
    logo: "https://1000logos.net/wp-content/uploads/2025/01/NameCheap-Logo.png"
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
