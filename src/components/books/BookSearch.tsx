
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BookSearchProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function BookSearch({ 
  onSearch, 
  className, 
  placeholder = "Search by title, author, description or tags..." 
}: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 h-10 md:h-12 rounded-full focus-visible:ring-gosip-purple/50"
      />
    </form>
  );
}
