
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateGroup: () => void;
};

export function SearchBar({ searchQuery, onSearchChange, onCreateGroup }: SearchBarProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for groups..." 
          className="pl-10 leading-relaxed"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        onClick={onCreateGroup}
        className="bg-gosip-purple hover:bg-gosip-purple-dark"
      >
        Create Group
      </Button>
    </div>
  );
}
