
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { AdminReturnButton } from "@/components/admin/AdminReturnButton";
import { NotificationBar } from "@/components/notification/NotificationBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isUpgradePage = location.pathname === "/upgrade";
  const isAdminPage = location.pathname === "/admin";
  
  // Apply gradient styles to purple buttons
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .bg-gosip-purple {
        background: linear-gradient(to right, var(--gosip-purple), var(--gosip-purple-dark)) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      {/* NotificationBar moved here, just above the Footer */}
      <NotificationBar />
      {!isUpgradePage && <Footer />}
      {!isAdminPage && localStorage.getItem('adminType') && <AdminReturnButton />}
    </div>
  );
}
