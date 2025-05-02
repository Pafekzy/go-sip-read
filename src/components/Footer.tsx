
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="gosip-gradient-section rounded-none">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>
          <div className="text-sm bright-text">
            © {new Date().getFullYear()} GoSipRead. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
