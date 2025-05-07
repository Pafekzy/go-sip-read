
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { AdminReturnButton } from "@/components/admin/AdminReturnButton";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isUpgradePage = location.pathname === "/upgrade";
  const isAdminPage = location.pathname === "/admin";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      {!isUpgradePage && <Footer />}
      {!isAdminPage && localStorage.getItem('adminType') && <AdminReturnButton />}
    </div>
  );
}
