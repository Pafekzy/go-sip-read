
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function AdminReturnButton() {
  const navigate = useNavigate();
  const [adminType, setAdminType] = useState<string | null>(null);
  
  useEffect(() => {
    const storedAdminType = localStorage.getItem('adminType');
    setAdminType(storedAdminType);
  }, []);

  if (!adminType) return null;
  
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button 
        onClick={() => navigate('/admin')}
        className="rounded-full shadow-lg bg-gosip-purple hover:bg-gosip-purple-dark"
      >
        <ShieldAlert className="mr-2 h-4 w-4" />
        Return to Admin Panel
      </Button>
    </motion.div>
  );
}
